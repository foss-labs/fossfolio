import { NextPageWithLayout } from 'next';
import { DashboardLayout } from '@app/layout';
import { Participants } from '@app/views/dashboard';
import { useEventParticipants } from '@app/hooks/api/org';
import { RiLoaderFill } from 'react-icons/ri';

const Dashboard: NextPageWithLayout = () => {
    const { isLoading, data } = useEventParticipants();
    if (isLoading) {
        return (
            <div className="h-[100vh] flex items-center justify-center">
                <RiLoaderFill className="animate-spin h-8 w-8" />
            </div>
        );
    }

    if (data) {
        return (
            <div>
                <h2 className="mb-3 mt-3 font-semibold text-2xl">All Registred Particpants</h2>
                <Participants data={data?.data} />
            </div>
        );
    }
};

Dashboard.Layout = DashboardLayout;
Dashboard.RequireAuth = true;
export default Dashboard;
