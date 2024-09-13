import { PageLoader } from "@app/components/preloaders";
import { HomeLayout } from "@app/layout";

export const Index = () => {
  return <PageLoader />;
};
export async function getServerSideProps(ctx: any) {
  const accesToken = ctx.req.cookies["access_token"];
  const url = ctx.req.url as string;
  const length = url.split("/").length;
  const eventid = url.split("/")[length - 1];
  const orgId = url.split("/")[length - 2];
  if (!accesToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: `/org/${orgId}/${eventid}/event`,
      permanent: false,
    },
  };
}

Index.Layout = HomeLayout;
Index.RequireAuth = true;

export default Index;
