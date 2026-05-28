const getEnvVar = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const apiConfig = {
  baseURL: getEnvVar("NEXT_PUBLIC_API_URL"),
  timeout: 15_000,
} as const;
