import { Button } from "@app/components/ui/Button";
import { Comments } from "@app/types";
import { Editor } from "@app/components/editor";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: Comments[];
  storageKey: string;
};

export const TaskPreviewPane = ({
  open,
  onClose,
  title,
  description,
  storageKey,
}: Props) => {
  const handleClose = () => {
    onClose();
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
        <h1 className="text-2xl font-bold">{title}</h1>

        <article className="border-2 rounded-sm mt-3 p-2">
          {description.map((desc) => (
            <Editor
              key={desc.id}
              className="w-full"
              value={desc.data}
              editable={false}
            />
          ))}
        </article>
        <article className="border-2 rounded-sm mt-3 p-2">
          <Editor
            key={storageKey}
            className="w-full"
            storageKey={`kanban-comment-draft:${storageKey}`}
            defaultValue=""
          />
        </article>
        <Button className="mt-3">Save</Button>
      </div>
    </Drawer>
  );
};
