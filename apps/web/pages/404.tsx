import { NextPageWithLayout } from "next";
import { HomeLayout } from "@app/layout";
import { Error as ErrorPage } from "@app/components/Error";
const Error: NextPageWithLayout = () => <ErrorPage />;

Error.Layout = HomeLayout;
Error.RequireAuth = false;
export default Error;
