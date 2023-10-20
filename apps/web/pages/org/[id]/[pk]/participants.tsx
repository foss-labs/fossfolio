import { NextPageWithLayout } from 'next';
import { DashboardLayout } from '@app/layout';
import { Participants } from "@app/views/dashboard"



const Dashboard: NextPageWithLayout = () => {
    return (
        <Participants />
    );
};

Dashboard.Layout = DashboardLayout;
Dashboard.RequireAuth = true;
export default Dashboard;
