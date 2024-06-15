import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { DashboardLayout } from "@app/layout";
import { apiHandler, ENV } from "@app/config";
import { useEvent } from "@app/hooks/api/Events";
import { Loader } from "@app/components/preloaders";
import { useMediaQuery, useRoles } from "@app/hooks";
import { Input } from "@app/ui/components/input";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/ui/components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Truncate } from "@app/components/ui/Truncate";

const Schema = yup.object({
  name: yup.string().required("Event name is required"),
  slug: yup.string().required("Event slug is required"),
  tagLine: yup.string().required("Tagline is required"),
});

type EventSchema = yup.InferType<typeof Schema>;

const Event = () => {
  const { data, isLoading } = useEvent("event");
  const router = useRouter();
  const isPhoneScreen = useMediaQuery("(max-width: 767px)");
  const { id, pk } = router.query;

  const form = useForm<EventSchema>({
    mode: "onChange",
    resolver: yupResolver(Schema),
    defaultValues: {
      slug: data?.slug,
      name: data?.name,
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("name", data?.name);
      form.setValue("slug", data?.slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const { canEditEvent } = useRoles();

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
    <div className="max-w-md p-10 h-screen">
      <Form {...form}>
        <form className="px-1 h-full" onSubmit={() => {}}>
          <div className="flex flex-col gap-3 h-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TagLine</FormLabel>
                  <FormControl>
                    <Input placeholder="TagLine" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Truncate
              className="text-xs font-normal text-start"
              text={`${ENV.web_base_url}/events/${form.watch("slug")}`}
              size={isPhoneScreen ? 30 : 50}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

Event.Layout = DashboardLayout;
Event.RequireAuth = true;
export default Event;
