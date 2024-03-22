import errorHandlerAxiosInstance from "@/utilis/api/client/ErrorHandlerAxios";

export const getUser = async () => {
  const { data, status } = await errorHandlerAxiosInstance.get("api/user");
  return data;
};
