import axios, { type AxiosInstance } from "axios";

import { apiConfig } from "@/lib/config";

const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: apiConfig.baseURL,
    timeout: apiConfig.timeout,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Request interceptors (auth tokens, request ids, etc.) go here.
  // instance.interceptors.request.use((config) => config);

  // Response interceptors (error normalization, refresh flow, etc.) go here.
  // instance.interceptors.response.use((response) => response);

  return instance;
};

export const apiClient = createApiClient();
