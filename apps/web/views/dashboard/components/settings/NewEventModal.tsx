import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@app/ui/components/dialog";
import { Button } from "@app/components/ui/Button";
import { Input } from "@app/ui/components/input";
import { apiHandler } from "@app/config";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format, isBefore } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/ui/components/form";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Calendar } from "@app/ui/components/calendar";
import { cn } from "@app/ui/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";

// TODO - DEFINE THE TYPE OF REFETCH
type IModal = {
  isOpen: boolean;
  onClose: () => void;
  refetch: any;
};

const Schema = yup.object().shape({
  name: yup.string().required().min(3),
  website: yup.string().url().required(),
  cover_image: yup.mixed().required(),
  event_date: yup.date().required(),
  location: yup.string().required(),
  description: yup.string(),
});

type ISchema = yup.InferType<typeof Schema>;

export const NewEventDialog = ({ isOpen, onClose, refetch }: IModal) => {
  const router = useRouter();

  const form = useForm<ISchema>({
    mode: "onSubmit",
    resolver: yupResolver(Schema),
    defaultValues: {
      website: "",
      name: "",
      location: "",
      description: "",
    },
  });

  useEffect(() => {
    const image = form.watch("cover_image") as File;
    if (typeof image === "object") {
      const formData = new FormData();
      formData.append("file", image);

      const uploadPromise = async () => {
        const { data } = await apiHandler.post(`/cloud/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        form.setValue("cover_image", data.file);
        return data;
      };

      toast.promise(uploadPromise(), {
        loading: "Uploading image...",
        success: (data) => `Image uploaded successfully`,
        error: "Failed to upload image",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("cover_image")]);

  /* 
    generate a new event , doing this here to create unique slug to route into
    only after publishing the event public can access the event 
    */
  const onUserSubMit: SubmitHandler<ISchema> = async (val) => {
    try {
      if (isBefore(val.event_date, new Date())) {
        toast.message("Date mismatch", {
          description: "Event date should be after todays date",
        });
        return;
      }

      const { id } = router.query;
      const payload = {
        ...val,
        description: "",
      };
      // create new event
      await apiHandler.post(`/events/${id}/create`, payload);

      onClose();
    } catch {
      toast.error(`Couldn't create event. Please try again later`);
    } finally {
      refetch();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[400px] md:w-md-auto">
        <DialogHeader>
          <DialogTitle className="mb-4 flex items-center">
            Create new Event
          </DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                className="max-h-[90svh] px-1 overflow-y-auto"
                onSubmit={form.handleSubmit(onUserSubMit)}
              >
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="DevHack" {...field} />
                        </FormControl>
                        <FormMessage className="capitalize" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage className="capitalize" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cover_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Image</FormLabel>
                        <FormControl>
                          <Input
                            accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                            type="file"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              field.onChange(
                                e.target.files ? e.target.files[0] : null
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Kochi, India" {...field} />
                        </FormControl>
                        <FormMessage className="capitalize" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="event_date"
                    render={({ field }) => (
                      <FormItem className="items-start flex flex-col">
                        <FormLabel>Event Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full  text-start font-normal text-black",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-white shadow-md">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <Button type="submit" isLoading={form.formState.isSubmitting}>
                    Create Event
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
