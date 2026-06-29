const express = require("express");
const multer = require("multer");
const { GoogleGenAI } = require("@google/genai");
const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("receipt"), async (req, res) => {
  try {
    // res.json({ amount: "...", description: "...", category: "...", ... });
    const imageBase64 = req.file.buffer.toString("base64");

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: req.file.mimetype,
            data: imageBase64,
          },
        },
        {
          text: `Analyze this receipt.
Return JSON:
{
type: "(expense or income)",
"amount": 0,
"description": "",
"category": "choose only one category
'food', 'transport', 'shopping', 'bills', 'entertainment', 'health', 'education', 'salary'",
"date":""
}`
        },
      ],
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    const receiptData = JSON.parse(text.replace(/```json|```/g, "").trim());
    res.json(receiptData);

  } catch (error) {
    console.error("Receipt scan error:", error.message);  // add this
    res.status(500).json({ message: "Failed to scan receipt" });
  }

});

module.exports = router;
