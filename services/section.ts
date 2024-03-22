import errorHandlerAxiosInstance from "@/utilis/api/client/ErrorHandlerAxios";

export const deleteSection = async (sectionId: string, projectId: string) => {
  const { data, status } = await errorHandlerAxiosInstance.delete(
    "/api/section/" + projectId + "/" + sectionId,
  );

  return data;
};
