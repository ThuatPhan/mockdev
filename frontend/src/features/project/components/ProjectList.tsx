import { Project, ProjectCard } from "@/features/project";

const ProjectList = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {projects.length === 0 ? (
        <div className="flex justify-center items-center mt-4">
          <span>No projects yet...</span>
        </div>
      ) : (
        projects.map((project, index) => (
          <ProjectCard key={project.id} index={index} project={project} />
        ))
      )}
    </div>
  );
};

export default ProjectList;
