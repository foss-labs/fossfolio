import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@app/ui/components/dialog";
import { Button } from "@app/components/ui/Button";
import { Input } from "@app/ui/components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea } from "@app/ui/components/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/ui/components/form";
import * as yup from "yup";
import { useAddForm } from "@app/hooks/api/form";

type IModal = {
  isOpen: boolean;
  onClose: () => void;
};

const Schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required().max(25),
});

type ISchema = yup.InferType<typeof Schema>;

export const NewFormDialog = ({ isOpen, onClose }: IModal) => {
  const { isLoading, mutate: addNewForm } = useAddForm();

  const form = useForm<ISchema>({
    mode: "onSubmit",
    resolver: yupResolver(Schema),
    defaultValues: {
      description: "",
      title: "",
    },
  });

  const onUserSubMit: SubmitHandler<ISchema> = async (val) => {
    await addNewForm(val);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-md md:w-sm-auto">
        <DialogHeader>
          <DialogTitle className="mb-4">Create New Form</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onUserSubMit)}>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Form Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Survey form" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3 mt-3">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Form Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Participants feedback from"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="mt-3 w-full"
                isLoading={isLoading}
                type="submit"
              >
                Add Form
              </Button>
            </form>
          </FormProvider>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
