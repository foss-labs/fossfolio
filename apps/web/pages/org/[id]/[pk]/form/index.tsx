import { DashboardLayout } from "@app/layout";
import { NextPageWithLayout } from "next";
import { Button } from "@app/components/ui/Button";
import { Card, CardContent } from "@app/ui/components/card";
import { FaPlus } from "react-icons/fa6";
import { LuClipboard } from "react-icons/lu";
import Link from "next/link";

const AllForms: NextPageWithLayout = () => {
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
        <Card className="p-2">
          <CardContent className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-semibold">Newsletter Signup</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Allow users to subscribe to your newsletter.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <LuClipboard className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  342 submissions
                </span>
              </div>
              <Button variant="outline">Edit</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="p-2">
          <CardContent className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-semibold">Feedback Form</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Collect feedback from your users.
              </p>
              <div className="mr-2 mt-2 border border-red-600 inline px-2 rounded-md text-white bg-red-600 text-xs">
                default
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <LuClipboard className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  89 submissions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  prefetch={false}
                >
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

AllForms.Layout = DashboardLayout;
AllForms.RequireAuth = true;
export default AllForms;
