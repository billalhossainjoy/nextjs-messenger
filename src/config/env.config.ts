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
    FACEBOOK_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID
} = {
  NEXT_AUTH_SECRET: getEnv("NEXT_AUTH_SECRET"),
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
  GITHUB_CLIENT_ID: getEnv("GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: getEnv("GITHUB_CLIENT_SECRET"),
  FACEBOOK_CLIENT_ID: getEnv("FACEBOOK_CLIENT_ID"),
  FACEBOOK_CLIENT_SECRET: getEnv("FACEBOOK_CLIENT_SECRET"),
};


// Cloudinary
export const {
  NEXT_PUBLIC_CLOUDINARY_API,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  NEXT_PUBLIC_CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = {
  NEXT_PUBLIC_CLOUDINARY_API: getEnv("NEXT_PUBLIC_CLOUDINARY_API"),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: getEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
  NEXT_PUBLIC_CLOUDINARY_API_KEY: getEnv("NEXT_PUBLIC_CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: getEnv("CLOUDINARY_API_SECRET")
};
