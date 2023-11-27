import { DashboardLayout } from '@app/layout';
import { ComingSoon } from '@app/views/dashboard';

const revenue = () => {
    return (
        <div className="flex justify-center items-center h-screen ">
            <ComingSoon />
        </div>
    );
};

revenue.Layout = DashboardLayout;
revenue.RequireAuth = true;
export default revenue;
