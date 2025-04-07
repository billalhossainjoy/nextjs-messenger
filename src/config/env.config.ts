function getEnv(key: string): string {
  if (!key) {
    throw new Error(
      `Expected environment variable ${key}. Expected environment variable`
    );
  }
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Expected environment variable ${key}. Expected environment variable`
    );
  }
  return value;
}

// Next auth
export const {
  NEXT_AUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} = {
  NEXT_AUTH_SECRET: getEnv("NEXT_AUTH_SECRET"),
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
  GITHUB_CLIENT_ID: getEnv("GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: getEnv("GITHUB_CLIENT_SECRET"),
};
