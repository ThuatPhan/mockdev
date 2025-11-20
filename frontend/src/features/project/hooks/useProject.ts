import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "@/lib/tanstack";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "@/api/projectApi";

export const useCreateProject = () => {
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = () => {
  return useMutation({
    mutationFn: updateProject,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", id] });
    },
  });
};

export const useDeleteProject = () => {
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", id] });
    },
  });
};

export const useProject = (id?: string) => {
  const query = useQuery({
    queryFn: () => getProject(id!),
    queryKey: ["project", id],
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  return { ...query, project: query.data?.data };
};

export const useProjects = (params: { page: number; size: number }) => {
  const query = useQuery({
    queryKey: ["projects", params],
    queryFn: () => getProjects(params),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    projects: query.data?.items || [],
    totalItems: query.data?.metaData?.total || 0,
    totalPages: query.data?.metaData?.totalPages || 1,
  };
};
