import { DashboardLayout } from "@app/layout";
import { NextPageWithLayout } from "next";
import { Button } from "@app/components/ui/Button";
import { Card, CardContent } from "@app/ui/components/card";
import { FaPlus } from "react-icons/fa6";
import { LuClipboard } from "react-icons/lu";
import { useAllForms } from "@app/hooks/api/form";
import { FormsLoader } from "@app/views/form";
import { useRouter } from "next/router";
import { pluralize } from "@app/utils";

const AllForms: NextPageWithLayout = () => {
  const router = useRouter();

  const { id, pk } = router.query;

  const { data, isLoading } = useAllForms();

  const handleEdit = (formId: string) => {
    router.push(`/org/${id}/${pk}/form/${formId}/builder`);
  };

  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Forms</h1>
        <Button variant="outline">
          <div className="flex items-center">
            <FaPlus className="mr-2 h-4 w-4" />
            <span>Create Form</span>
          </div>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <FormsLoader count={12} />
        ) : (
          data?.map((el) => (
            <Card className="p-2" key={el.id}>
              <CardContent className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-semibold">{el.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {el.description}
                  </p>
                  {el.is_default_form && (
                    <div className="mr-2 mt-2 border border-red-600 inline px-2 rounded-md text-white bg-red-600 text-xs">
                      default
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <LuClipboard className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400">
                      {pluralize("submission", el.total_submissions, true)}
                    </span>
                  </div>
                  <Button variant="outline" onClick={() => handleEdit(el.id)}>
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
};

AllForms.Layout = DashboardLayout;
AllForms.RequireAuth = true;
export default AllForms;
