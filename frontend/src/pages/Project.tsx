import { Navigate, useParams } from "react-router";
import {
  ProjectActions,
  ProjectBreadcrumb,
  useProject,
} from "@/features/project";

const Project = () => {
  const { id } = useParams();
  const { project, isPending: loadingProject } = useProject(id);

  if (loadingProject) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <Navigate to="/projects" />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <ProjectBreadcrumb>
          <span className="px-2.5 py-1 text-white font-semibold bg-blue-400 border-2 border-blue-300 rounded-lg">
            {project.name.charAt(0).toUpperCase()}
          </span>
          <span>{project.name}</span>
          <ProjectActions project={project} />
        </ProjectBreadcrumb>
      </div>
    </div>
  );
};

export default Project;
