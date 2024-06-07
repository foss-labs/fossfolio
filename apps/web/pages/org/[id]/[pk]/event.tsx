import { useEffect } from "react";
import { useRouter } from "next/router";
import { Editor } from "novel";
import { toast } from "sonner";
import { DashboardLayout } from "@app/layout";
import { apiHandler } from "@app/config";
import { useEvent } from "@app/hooks/api/Events";
import { Loader } from "@app/components/preloaders";
import { useRoles } from "@app/hooks";

const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Add Your Event Info Here" }],
    },
  ],
};

const Event = () => {
  const { data, isLoading } = useEvent("event");
  const router = useRouter();
  const { id, pk } = router.query;

  const { canEditEvent } = useRoles();

  useEffect(() => {
    // remove description when ever component unmounts
    return () => localStorage.removeItem("novel__content");
  }, []);

  const handleSaveShortcut = async (event: KeyboardEvent) => {
    if (!canEditEvent) {
      return;
    }
    // Check if the key combination is Ctrl + S (for Windows/Linux) or Command + S (for macOS)
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
      event.preventDefault();
      try {
        await handleUpdate();
        toast.success("Description was saved successfully");
      } catch {
        toast.error("Error updating description");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSaveShortcut);

    return () => {
      window.removeEventListener("keydown", handleSaveShortcut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async () => {
    try {
      if (!canEditEvent) {
        return;
      }
      const input = localStorage.getItem("novel__content");
      // if event date is before end date
      await apiHandler.patch(`/events/edit`, {
        description: input,
        organizationId: id,
        eventSlug: pk,
      });
    } catch {
      console.warn("error updating event description");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <Editor
        className="w-full"
        defaultValue={
          JSON.parse(data?.data.description as string) ||
          defaultEditorContent ||
          ""
        }
        editorProps={{
          editable: () => canEditEvent,
        }}
        completionApi={`/api/generate`}
        onDebouncedUpdate={handleUpdate}
      />
    </div>
  );
};

Event.Layout = DashboardLayout;
Event.RequireAuth = true;
export default Event;
