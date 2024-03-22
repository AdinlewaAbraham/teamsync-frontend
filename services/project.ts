import errorHandlerAxiosInstance from "@/utilis/api/client/ErrorHandlerAxios";

export const getProject = async (id: string) => {
  const { data, status } = await errorHandlerAxiosInstance.get("project/" + id);

  return data;
};

type CreateProjectReqBody = {
  projectName: string;
  workspaceId: string;
  creatorId: string;
};
export const createProject = async (reqBody: CreateProjectReqBody) => {
  const { data, status } = await errorHandlerAxiosInstance.post(
    "project/",
    reqBody,
  );
  return { data, status };
};
