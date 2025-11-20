import { Project, useDeleteProject } from "@/features/project";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
}

const DeleteProjectDialog: React.FC<DeleteProjectDialogProps> = ({
  open,
  onOpenChange,
  project,
}) => {
  const { mutateAsync: deleteProject, isPending } = useDeleteProject();

  const handleDelete = async () => {
    try {
      await deleteProject(project.id);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-red-600">Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete project
            <span className="font-bold text-black"> {project.name} </span>?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="button"
            className="bg-red-400 hover:bg-red-500 text-white cursor-pointer"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectDialog;
