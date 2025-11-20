import axiosInstance from "@/lib/axios";
import { ApiResponse, PagedResponse } from "@/types";
import { ProjectInput } from "@/features/project/schema";
import { Project } from "@/features/project";

export const createProject = async (data: ProjectInput) => {
  const response = await axiosInstance.post<ApiResponse<Project>>(
    "/projects",
    data
  );
  return response.data;
};

export const updateProject = async (data: ProjectInput & { id: string }) => {
  const response = await axiosInstance.put<ApiResponse<Project>>(
    `/projects/${data.id}`,
    data
  );
  return response.data;
};

export const deleteProject = async (id: string) => {
  await axiosInstance.delete(`/projects/${id}`);
};

export const getProject = async (id: string) => {
  const response = await axiosInstance.get<ApiResponse<Project>>(
    `/projects/${id}`
  );

  return response.data;
};
export const getProjects = async (params: { page: number; size: number }) => {
  const response = await axiosInstance.get<ApiResponse<PagedResponse<Project>>>(
    "/projects",
    {
      params,
    }
  );

  return response.data.data;
};
