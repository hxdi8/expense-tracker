# Expense Tracker

A full-stack expense tracking app with a Node.js/Express API, MongoDB persistence, and an Expo React Native mobile client.

## Features

- User signup and login
- Add income and expense transactions
- Categorize transactions by type such as food, transport, bills, shopping, salary, and more
- Pick a transaction date with a native date picker
- View total balance, total income, and total expenses
- View transaction history
- Delete transactions

## Tech Stack

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

### Mobile

- Expo
- React Native
- Expo Router
- Axios
- React Native DateTimePicker
- React Native Element Dropdown

## Project Structure

```text
expense-tracker/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Expense.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── expense.js
│   ├── server.js
│   └── package.json
└── mobile/
    ├── app/
    │   ├── addExpense.jsx
    │   ├── api.js
    │   ├── expense.jsx
    │   ├── index.jsx
    │   └── signup.jsx
    ├── app.json
    └── package.json
```

## Prerequisites

- Node.js
- npm
- MongoDB database connection string
- Expo Go app, Android emulator, iOS simulator, or a development build

## Getting Started

Clone the repository and install dependencies for both the backend and mobile app.

```bash
cd backend
npm install

cd ../mobile
npm install
```

## Backend Setup

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend server:

```bash
cd backend
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

The root route should return:

```text
Expense Tracker API is running...
```

## Mobile Setup

Start the Expo app:

```bash
cd mobile
npx expo start
```

Then open the app using Expo Go, an Android emulator, an iOS simulator, or the web option from the Expo CLI.

The mobile client automatically tries to detect the local development host and connect to the backend on port `5000`.

You can override the API URL with:

```bash
EXPO_PUBLIC_API_URL=http://your-api-host:5000 npm start
```

Examples:

```bash
EXPO_PUBLIC_API_URL=http://localhost:5000 npm start
EXPO_PUBLIC_API_URL=http://192.168.1.10:5000 npm start
```



