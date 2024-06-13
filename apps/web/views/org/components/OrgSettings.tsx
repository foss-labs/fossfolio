import { useEffect } from "react";
import { useOrgInfo } from "@app/hooks/api/org";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@app/ui/components/form";
import { Input } from "@app/ui/components/input";
import { Button } from "@app/components/ui/Button";
import { apiHandler } from "@app/config";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Loader } from "@app/components/preloaders";
import { Tabs } from "@app/types";
import { useRoles } from "@app/hooks";
import * as yup from "yup";
import { DeleteOrg, LeaveOrg } from "@app/views/org";

interface Props {
  activeTab: Tabs;
}

const orgValidator = yup.object().shape({
  orgName: yup.string().required(),
  slug: yup.string().required(),
});

type IOrgVal = yup.InferType<typeof orgValidator>;

export const OrgSettings = ({ activeTab }: Props) => {
  const { data, isLoading } = useOrgInfo(activeTab === "settings");
  const { canDeleteOrg, canEditOrg } = useRoles();
  const router = useRouter();
  const { id } = router.query;

  const form = useForm<IOrgVal>({
    defaultValues: {
      orgName: data?.name,
      slug: data?.slug,
    },
    resolver: yupResolver(orgValidator),
  });

  useEffect(() => {
    if (data) {
      form.setValue("orgName", data?.name as string);
      form.setValue("slug", data?.slug as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleOrgUpdate: SubmitHandler<IOrgVal> = async (changes) => {
    // handle update with api call
    try {
      await apiHandler.patch("/org/update", {
        organizationId: id,
        name: changes.orgName,
        slug: changes.slug,
      });
      toast.success("Org was updated successfully");
    } catch {
      toast.error("Couldnt update org");
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex gap-4 py-4 w-full flex-col">
      <Form {...form}>
        <form
          className="border-red-400 w-full flex flex-col items-center"
          onSubmit={form.handleSubmit(handleOrgUpdate)}
        >
          <FormField
            control={form.control}
            name="orgName"
            render={({ field }) => (
              <FormItem className="border border-gray-200 p-5 rounded-md w-full max-w-2xl">
                <FormLabel className="mb-1">Organization Name</FormLabel>
                <FormDescription>
                  Please enter a Organization name you are comfortable with
                  being public
                </FormDescription>

                <FormControl>
                  <Input
                    disabled={!canEditOrg}
                    placeholder={data?.name}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <div className="flex w-full max-w-2xl justify-end">
                  <Button
                    disabled={!canEditOrg}
                    className="p-3 mt-3"
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="mt-5 border  border-gray-200 p-5 rounded-md w-full max-w-2xl">
                <FormLabel className="mb-1">Organization Slug</FormLabel>
                <FormDescription>
                  Please enter a valid Slug. The slug can be used to visit your
                  organization page
                </FormDescription>
                <FormControl>
                  <Input
                    disabled={!canEditOrg}
                    placeholder={data?.slug}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
                <div className="flex w-full max-w-2xl justify-end">
                  <Button
                    disabled={!canEditOrg}
                    className="p-3 mt-3"
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex justify-center items-center flex-col gap-4">
        <LeaveOrg />
        {canDeleteOrg && <DeleteOrg />}
      </div>
    </div>
  );
};
