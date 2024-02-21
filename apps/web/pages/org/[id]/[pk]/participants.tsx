import { NextPageWithLayout } from 'next';
import { DashboardLayout } from '@app/layout';
import { Participants } from '@app/views/dashboard';
import { useEventParticipants, useEventParticipantsFormSubmissions } from '@app/hooks/api/org';
import { RiLoaderFill } from 'react-icons/ri';
import { useEvent } from '@app/hooks/api/Events';

const Dashboard: NextPageWithLayout = () => {
    const { isLoading, data } = useEventParticipants();
    const { data: fromData } = useEventParticipantsFormSubmissions();
    const { data: eventData } = useEvent('event');
    if (isLoading) {
        return (
            <div className="h-[100vh] flex items-center justify-center p-4">
                <RiLoaderFill className="animate-spin h-8 w-8" />
            </div>
        );
    }

    if (data) {
        return (
            <div>
                <h2 className="mb-3 mt-3 font-semibold text-2xl p-4">All Registred Particpants</h2>
                <Participants
                    data={data?.data}
                    doesEventHaveForm={eventData?.data.isPublished ? true : false}
                />
            </div>
        );
    }
};

Dashboard.Layout = DashboardLayout;
Dashboard.RequireAuth = true;
export default Dashboard;
