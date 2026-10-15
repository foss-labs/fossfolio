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
import { Editor } from "@app/components/editor";
import type { JSONContent } from "@tiptap/react";
import { useCallback, useEffect, useRef, useState } from "react";
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

const defaultEditorContent: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export const TaskPane = ({ open, onClose, boardId }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] =
    useState<JSONContent>(defaultEditorContent);
  const router = useRouter();
  const { eventid } = router.query;
  const { refetch } = useKanban();

  const reset = useCallback(() => {
    setDescription(defaultEditorContent);
    if (titleRef.current) titleRef.current.value = "";
  }, []);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSave = async () => {
    try {
      await apiHandler.post(`/events/kanban/${eventid}/${boardId}`, {
        title: titleRef.current?.value,
        data: JSON.stringify(description),
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
            value={description}
            onChange={setDescription}
          />
        </article>
        <Button className="mt-3" onClick={handleSave} isLoading={isLoading}>
          Save
        </Button>
      </div>
    </Drawer>
  );
};
