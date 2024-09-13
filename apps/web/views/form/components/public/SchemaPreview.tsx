import { Button } from "@app/components/ui/Button";
import { MdDeleteOutline } from "react-icons/md";
import { apiHandler } from "@app/config";
import { useUserRegistrationStatus } from "@app/hooks/api/Events";
import { Iform } from "@app/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@app/ui/components/card";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useFormSchema } from "@app/hooks/api/form";
import { RenderField } from "../builder/RenderField";

type Prop = {
  data: Array<Iform>;
  isPublic: boolean;
  closeModal?: () => void;
  eventId: string;
  isAIgenerated?: boolean;
};

export const SchemaPreview = ({
  data,
  closeModal,
  isPublic = false,
  eventId,
  isAIgenerated = false,
}: Prop) => {
  const { refetch: refetchStatus } = useUserRegistrationStatus();
  const { refetch } = useFormSchema();
  const router = useRouter();
  const { eventid, id } = router.query;

  const bulkDeleteFormPreview = async () => {
    try {
      await apiHandler.delete(`events/form/bulk-delete/${eventid}`, {
        data: {
          organizationId: id,
        },
      });
      toast.success("form deleted successfully");
    } catch {
      toast.error("error deleting form");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!isPublic) return;
    e.preventDefault();

    // key of the form will be the each fields primary key
    // this is done so that we can make the field editable from admin side form builder
    const formData: { [name: string]: string } = {};
    for (let i = 0; i < e.currentTarget.elements.length; i++) {
      const element = e.currentTarget.elements[i] as HTMLInputElement;
      if (element.name) {
        formData[element.name] = element.value;
      }
    }
    try {
      const { data } = await apiHandler.post(
        `/events/form/${eventId}`,
        formData
      );
      if (data.url) {
        // should use stripe js library to pass session id
        window.location.href = data.url;
      }
      toast.success("Form submitted successfully");
      refetchStatus();
      if (closeModal) {
        closeModal();
      }
    } catch {
      toast.error("Error submitting form");
    }
  };

  const { mutate } = useMutation(bulkDeleteFormPreview, {
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <Card className="mt-10 w-[300px] group">
      <CardHeader>
        <CardTitle className="flex">
          Please fill The form
          {!isPublic && !isAIgenerated && (
            <MdDeleteOutline
              className="ml-2 w-4 hover:text-red-500 hover:cursor-pointer hidden group-hover:block"
              onClick={() => mutate()}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[calc(70svh)] pt-4 pb-8 overflow-auto">
        <form onSubmit={handleSubmit}>
          {(data ?? []).map((el) => (
            <div key={el.id}>
              <RenderField fieldProperty={{ ...el }} />
            </div>
          ))}
          <Button type="submit" className="mt-5 w-full">
            submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
