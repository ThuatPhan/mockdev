import ProjectActions from "@/features/project/components/ProjectActions";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Project } from "@/features/project";
import { useNavigate } from "react-router";

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/projects/${project.id}`)}
      key={project.id}
      className="flex flex-row justify-between items-center p-4 rounded-xl cursor-pointer 
               transition-all active:scale-95 hover:shadow-md
               animate-in fade-in slide-in-from-bottom-10 duration-500 fill-mode-backwards"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-1 text-white font-semibold bg-blue-400 border-2 border-blue-300 rounded-lg">
          {project.name.charAt(0).toUpperCase()}
        </span>
        <span>{project.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <ProjectActions project={project} />
        <ChevronRight size={20} strokeWidth={3} className="text-blue-400" />
      </div>
    </Card>
  );
};

export default ProjectCard;
