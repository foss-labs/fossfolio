import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { DashboardLayout } from "@app/layout";
import { apiHandler, ENV } from "@app/config";
import { useEvent } from "@app/hooks/api/Events";
import { Loader } from "@app/components/preloaders";
import { useMediaQuery, useRoles, useToggle } from "@app/hooks";
import { Input } from "@app/ui/components/input";
import { Editor } from "@app/components/editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/ui/components/form";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Truncate } from "@app/components/ui/Truncate";
import * as yup from "yup";
import { Button } from "@app/components/ui/Button";
import { FaPlus } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@app/ui/components/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@app/ui/components/popover";
import { Textarea } from "@app/ui/components/textarea";
import { MdDeleteOutline } from "react-icons/md";

const faqSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const Schema = yup.object({
  name: yup.string().required("Event name is required"),
  slug: yup.string().required("Event slug is required"),
  tagLine: yup.string().required("Tagline is required"),
  faq: yup.array(faqSchema.optional()),
});

type EventSchema = yup.InferType<typeof Schema>;
type FaqSchema = yup.InferType<typeof faqSchema>;

const Event = () => {
  const { data, isLoading } = useEvent("event");
  const router = useRouter();
  const isPhoneScreen = useMediaQuery("(max-width: 767px)");
  const { id, eventid } = router.query;

  const form = useForm<EventSchema>({
    mode: "onChange",
    resolver: yupResolver(Schema),
    defaultValues: {
      slug: data?.slug,
      name: data?.name,
    },
  });

  const faqForm = useForm<FaqSchema>({
    mode: "onChange",
    resolver: yupResolver(faqSchema),
  });

  const { fields, append, remove } = useFieldArray<EventSchema>({
    control: form.control,
    name: "faq",
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
        eventSlug: eventid,
      });
    } catch {
      console.warn("error updating event description");
    }
  };

  const handleFaqAdd: SubmitHandler<FaqSchema> = (data) => {
    if (fields.length === 10) {
      toast.error("Maximum only 10 faqs are supported");
      return;
    }
    append(data);
    faqForm.reset();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" p-10 h-screen mb-20 grid grid-cols-1 md:grid-cols-2 w-full gap-4">
      <Form {...form}>
        <form className="px-1 h-full " onSubmit={() => {}}>
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
            <FormLabel>Description</FormLabel>
            <Editor />
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
      <div className="w-full flex flex-col">
        <h3 className="font-semibold">Event Faqs</h3>
        {fields.map((faq, index) => (
          <section key={faq.id}>
            <Accordion type="single" collapsible className="w-full group">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  {faq.title}
                  <span
                    role="button"
                    className="px-2 py-2 rounded-md border border-red-600 text-red-600 text-lg group-hover:block hidden delay-75 hover:bg-red-600 hover:border-white hover:text-white"
                    onClick={() => remove(index)}
                  >
                    <MdDeleteOutline />
                  </span>
                </AccordionTrigger>
                <AccordionContent>{faq.description}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              rightIcon={<FaPlus />}
              className="w-sm gap-2 self-end mt-2"
              size="sm"
              variant="outline"
            >
              Add Faq
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4 flex gap-3 flex-col mr-5">
            <Form {...faqForm}>
              <form
                className="flex flex-col gap-2"
                onSubmit={faqForm.handleSubmit(handleFaqAdd)}
              >
                <FormField
                  control={faqForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Print Ticket ?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={faqForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="dont need to print the ticket"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  Add Faq
                </Button>
              </form>
            </Form>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

Event.Layout = DashboardLayout;
Event.RequireAuth = true;
export default Event;
