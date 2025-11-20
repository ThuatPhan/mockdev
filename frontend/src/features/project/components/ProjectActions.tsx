import { useState } from "react";
import { Copy, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Project,
  ProjectDialog,
  DeleteProjectDialog,
} from "@/features/project";

const ProjectActions = ({ project }: { project: Project }) => {
  const [activeDialog, setActiveDialog] = useState<"edit" | "delete" | null>(
    null
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <EllipsisVertical
              size={20}
              strokeWidth={3}
              className="text-gray-400"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-1.5 rounded-lg" align="start">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => setActiveDialog("edit")}
              className="cursor-pointer focus:rounded-lg focus:bg-blue-400 focus:text-white flex items-center"
            >
              <Pencil size={20} strokeWidth={3} className="text-green-400" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer focus:rounded-lg focus:bg-blue-400 focus:text-white">
              <Copy size={20} strokeWidth={3} className="text-yellow-400" />
              Clone
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => setActiveDialog("delete")}
              className="cursor-pointer focus:rounded-lg focus:bg-blue-400 focus:text-white flex items-center"
            >
              <Trash2 size={20} strokeWidth={3} className="text-red-400" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {activeDialog === "edit" && (
        <ProjectDialog
          project={project}
          open={true}
          onOpenChange={(open) => !open && setActiveDialog(null)}
        />
      )}
      {activeDialog === "delete" && (
        <DeleteProjectDialog
          project={project}
          open={true}
          onOpenChange={(open) => !open && setActiveDialog(null)}
        />
      )}
    </>
  );
};

export default ProjectActions;
