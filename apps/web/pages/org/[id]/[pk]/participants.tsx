import { NextPageWithLayout } from 'next';
import { DashboardLayout } from '@app/layout';
import { Participants } from '@app/views/dashboard';

const Dashboard: NextPageWithLayout = () => {
    return (
        <div>
            <h2 className="mb-3 mt-3 font-semibold text-2xl">All Registred Particpants</h2>
            <Participants />
        </div>
    );
};

Dashboard.Layout = DashboardLayout;
Dashboard.RequireAuth = true;
export default Dashboard;
