export const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.API_HOST
    : process.env.LOCAL_API_HOST;
