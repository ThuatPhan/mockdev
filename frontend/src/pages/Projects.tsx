import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ProjectDialog,
  ProjectList,
  useProjects,
  ProjectBreadcrumb,
} from "@/features/project";
import AppPagination from "@/components/AppPagination";

const Projects = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const { projects, totalPages } = useProjects({
    page,
    size,
  });

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        <ProjectBreadcrumb>
          <Button
            onClick={() => setOpenDialog(true)}
            className="bg-blue-400 hover:bg-blue-500 active:scale-90 cursor-pointer rounded-lg"
          >
            <Plus size={20} strokeWidth={3} className="text-white" />
          </Button>
        </ProjectBreadcrumb>
        <ProjectList projects={projects} />
        <AppPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
      {openDialog && (
        <ProjectDialog open={openDialog} onOpenChange={setOpenDialog} />
      )}
    </>
  );
};

export default Projects;
