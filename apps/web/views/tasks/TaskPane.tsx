import { Button } from "@app/components/ui/Button";
import { apiHandler } from "@app/config";
import { useKanban } from "@app/hooks/api/kanban";
import { Input } from "@app/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Editor } from "novel";
import { useRef } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  boardId: string;
};

const InputOption = [
  {
    label: "sreehari",
    value: "1234",
  },
  {
    label: "gopan",
    value: "erre",
  },
];

const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Add Your Description Here" }],
    },
  ],
};

export const TaskPane = ({ open, onClose, boardId }: Props) => {
  const titleRef = useRef<any>();
  const router = useRouter();
  const { pk } = router.query;
  const { refetch } = useKanban();

  const handleClose = () => {
    localStorage.removeItem("kanban-editor");
    onClose();
  };

  const onSave = async () => {
    try {
      await apiHandler.post(`/events/kanban/${pk}/${boardId}`, {
        title: titleRef.current.value,
        data: localStorage.getItem("kanban-editor"),
      });
      handleClose();
    } catch {
      toast.error("Error creating task");
    }
  };

  const { mutate, isLoading } = useMutation(onSave, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleSave = () => {
    mutate();
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      direction="right"
      size={650}
      className="p-5 bg-red-300 overflow-y-scroll"
    >
      <div className="flex flex-col">
        <Input placeholder="title" ref={titleRef} />
        <article className="mt-3">
          <Select>
            <SelectTrigger id="type">
              <SelectValue placeholder="Assign users" />
            </SelectTrigger>

            <SelectContent position="popper">
              {InputOption.map((el) => (
                <SelectItem key={el.value as string} value={el.value as string}>
                  {el.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </article>
        <article className="border-2 rounded-sm mt-3 min-h-[700px]">
          <Editor
            className="w-full"
            completionApi={`/api/generate`}
            storageKey="kanban-editor"
            defaultValue={defaultEditorContent}
          />
        </article>
        <Button className="mt-3" onClick={handleSave} isLoading={isLoading}>
          Save
        </Button>
      </div>
    </Drawer>
  );
};
