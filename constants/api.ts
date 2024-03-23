export const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.API_HOST
    : process.env.LOCAL_API_HOST;

export const browserAccessibleBaseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_HOST
    : process.env.NEXT_PUBLIC_LOCAL_API_HOST;
