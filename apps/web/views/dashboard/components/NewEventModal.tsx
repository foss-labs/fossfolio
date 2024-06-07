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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select";
import { useEffect, useState } from "react";
import { useToggle } from "@app/hooks";
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

type Description = "true" | "false";

const Schema = yup.object().shape({
  name: yup.string().required().min(3),
  website: yup.string().url().required(),
  lastDate: yup.date().required(),
  file: yup.mixed(),
  eventDate: yup.date().required(),
  maxTicketCount: yup
    .number()
    .required("Ticket count is a required field")
    .min(1),
  location: yup.string().required(),
  isPaidEvent: yup.string().required(),
  ticketPrice: yup
    .number()
    .min(0)
    .when("isPaidEvent", {
      is: (val: Description) => val === "true",
      then: (schema) => schema.required("Ticket price is a required field"),
      otherwise: (schema) => schema.notRequired(),
    }),
  team: yup.string().required().default("false"),
  minTeamSize: yup.number().when("team", {
    is: (val: Description) => val === "true",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),
  maxTeamSize: yup.number().when("team", {
    is: (val: Description) => val === "true",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),
});

type ISchema = yup.InferType<typeof Schema>;

export const NewEventDialog = ({ isOpen, onClose, refetch }: IModal) => {
  const router = useRouter();

  const [isUpdating, setUpdating] = useToggle(false);

  const form = useForm<ISchema>({
    mode: "onSubmit",
    resolver: yupResolver(Schema),
    defaultValues: {
      website: "",
      name: "",
      location: "",
      isPaidEvent: "false",
      ticketPrice: 0,
      maxTicketCount: 50,
      team: "false",
    },
  });

  const [cover, selectCover] = useState<string | undefined>("");

  const convert2base64 = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => [selectCover(reader.result?.toString())];

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const image = form.watch("file") as File;
    if (typeof image === "object") {
      convert2base64(image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("file")]);

  /* 
    generate a new event , doing this here to create unique slug to route into
    only after publishing the event public can access the event 
    */
  const onUserSubMit: SubmitHandler<ISchema> = async (val) => {
    // when user randomly enters some ticket price and go back to not a  money event
    //  we need to make sure that ticker price will stay 0
    try {
      setUpdating.on();
      if (val.isPaidEvent === "false") {
        val.ticketPrice = 0;
      }
      const isEventDateWrong = isBefore(val.eventDate, val.lastDate);

      if (isEventDateWrong) {
        toast.message("Date mismatch", {
          description: "Registration end date should not be after event date",
        });
        return;
      } else if (
        isBefore(val.eventDate, new Date()) ||
        isBefore(val.lastDate, new Date())
      ) {
        toast.message("Date mismatch", {
          description:
            "Registration end date or event date should be after todays date",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", val.file);

      const { id } = router.query;
      const payload = {
        ...val,
        maxTicketCount: Number(val.maxTicketCount),
        maxTeamSize: Number(val.maxTeamSize),
        minTeamSize: Number(val.minTeamSize),
        organizationId: id,
      };
      // create new event
      const res = await apiHandler.post("/events/create", payload);
      await apiHandler.patch(
        `/events/edit/cover?org=${id}&event=${res.data?.data?.slug}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onClose();
    } catch {
      toast.error(`Couldn't create event. Please try again later`);
    } finally {
      setUpdating.off();
      refetch();
    }
  };

  const isPaidEvent = form.watch("isPaidEvent") === "true";

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
                    name="file"
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
                    name="maxTicketCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Ticket Count</FormLabel>
                        <FormControl>
                          <Input placeholder="100" {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eventDate"
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
                  <FormField
                    control={form.control}
                    name="lastDate"
                    render={({ field }) => (
                      <FormItem className="items-start flex flex-col">
                        <FormLabel>Registration end date</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="isPaidEvent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Is this a paid event?</FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Paid Event" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {isPaidEvent && (
                    <FormField
                      control={form.control}
                      name="ticketPrice"
                      render={({ field }) => (
                        <FormItem className="items-center ">
                          <FormLabel>Ticket price (INR)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="100"
                              {...field}
                              type="number"
                              min={0}
                            />
                          </FormControl>
                          <FormMessage className="capitalize" />
                        </FormItem>
                      )}
                    />
                  )}
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
