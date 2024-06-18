import { NextPageWithLayout } from "next";
import { DashboardLayout } from "@app/layout";
import { Participants } from "@app/views/dashboard";
import { useEventParticipants } from "@app/hooks/api/org";
import { useEvent } from "@app/hooks/api/Events";
import { Loader } from "@app/components/preloaders";
import { TicketLottie } from "@app/views/dashboard";

const Dashboard: NextPageWithLayout = () => {
  const { isLoading, data, refetch, error } = useEventParticipants();
  const { data: eventData } = useEvent("event");

  if (error) {
    return <TicketLottie />;
  }
  if (isLoading) {
    return <Loader />;
  }

  if (data) {
    return (
      <div className="p-4 ">
        <h2 className="font-semibold text-2xl p-4">
          All Registred Particpants
        </h2>
        <Participants
          data={data?.data}
          doesEventHaveForm={eventData?.data.isFormPublished ? true : false}
          refetch={refetch}
          id={eventData?.data.id as string}
        />
      </div>
    );
  }
};

Dashboard.Layout = DashboardLayout;
Dashboard.RequireAuth = true;
export default Dashboard;
