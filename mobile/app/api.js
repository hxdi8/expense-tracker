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

  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  if (Platform.OS === "android" && !getDevHost()) {
    return `http://10.0.2.2:${API_PORT}`;
  }

  if (Platform.OS === "ios" && !getDevHost()) {
    return `http://localhost:${API_PORT}`;
  }

  const devHost = getDevHost();

  if (devHost) {
    return `http://${devHost}:${API_PORT}`;
  }

  return `http://localhost:${API_PORT}`;
};

const api = create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
});

export default api;
