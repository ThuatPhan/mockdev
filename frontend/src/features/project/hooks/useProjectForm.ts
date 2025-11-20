import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Project,
  ProjectInput,
  projectSchema,
  useCreateProject,
  useUpdateProject,
} from "@/features/project";

interface UseProjectFormProps {
  project?: Project;
  onSuccess: () => void;
}

export const useProjectForm = ({ project, onSuccess }: UseProjectFormProps) => {
  const isEditMode = !!project;

  const { mutateAsync: createProject, isPending: isCreating } =
    useCreateProject();
  const { mutateAsync: updateProject, isPending: isUpdating } =
    useUpdateProject();
  const isPending = isCreating || isUpdating;

  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      prefix: "",
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name,
        prefix: project.prefix || "",
      });
    } else {
      form.reset({ name: "", prefix: "" });
    }
  }, [project, form]);

  const handleSubmit = async (values: ProjectInput) => {
    const sanitizedValues: ProjectInput = {
      ...values,
      prefix: values.prefix === "" ? undefined : values.prefix,
    };

    try {
      if (isEditMode && project) {
        await updateProject({ ...project, ...sanitizedValues });
      } else {
        await createProject(sanitizedValues);
      }
      onSuccess();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(handleSubmit),
    isPending,
    isEditMode,
  };
};
