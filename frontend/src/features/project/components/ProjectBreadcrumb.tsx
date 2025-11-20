import { Link } from "react-router";

interface ProjectBreadcrumbProps {
  children?: React.ReactNode;
}

const ProjectBreadcrumb = ({ children }: ProjectBreadcrumbProps) => {
  return (
    <div className="flex items-center gap-2">
      <Link
        to="/projects"
        className="font-medium hover:text-blue-500 transition-colors"
      >
        Projects
      </Link>

      <span className="text-gray-400">/</span>

      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
};

export default ProjectBreadcrumb;
