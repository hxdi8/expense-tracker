import { create } from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

const API_PORT = 5000;

const getDevHost = () => {
  const debuggerHost =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri ||
    Constants.manifest?.debuggerHost;

  return debuggerHost?.split(":")[0];
};

const getApiBaseUrl = () => {

  // 1️⃣ Check for explicitly configured API URL (e.g. hosted backend)
  if (process.env.EXPO_PUBLIC_API_URL) {
    console.log("[API] Using EXPO_PUBLIC_API_URL:", process.env.EXPO_PUBLIC_API_URL);
    return process.env.EXPO_PUBLIC_API_URL;
  }

  const devHost = getDevHost();

  // 2️⃣ Android emulator → special loopback IP
  if (Platform.OS === "android" && !devHost) {
    const url = `http://10.0.2.2:${API_PORT}`;
    console.log("[API] Android emulator fallback:", url);
    return url;
  }

  // 3️⃣ iOS simulator → localhost works
  if (Platform.OS === "ios" && !devHost) {
    const url = `http://localhost:${API_PORT}`;
    console.log("[API] iOS simulator fallback:", url);
    return url;
  }

  // 4️⃣ Expo dev server / tunnel → use the debugger host
  if (devHost) {
    const url = `http://${devHost}:${API_PORT}`;
    console.log("[API] Using dev host:", url);
    return url;
  }

  // 5️⃣ Final fallback
  const url = `http://localhost:${API_PORT}`;
  console.log("[API] Final fallback:", url);
  return url;
};

// Create the default instance with a conservative timeout
const api = create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
});

/**
 * Get an axios instance with a longer timeout, suitable for
 * receipt scanning which involves image upload + AI processing.
 */
export const getScanApi = () => {
  return create({
    baseURL: getApiBaseUrl(),
    timeout: 60000, // 60 seconds for AI processing
  });
};

export default api;
