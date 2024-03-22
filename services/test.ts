import errorHandlerAxiosInstance from "@/utilis/api/client/ErrorHandlerAxios";

export const returnError = async () => {
  const { data } = await errorHandlerAxiosInstance.get("test");
  return data;
};
