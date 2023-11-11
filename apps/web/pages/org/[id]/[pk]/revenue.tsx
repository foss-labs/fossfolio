import { DashboardLayout } from '@app/layout';

const revenue = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-2xl">COMING SOON</h1>
        </div>
    );
};

revenue.Layout = DashboardLayout;
revenue.RequireAuth = true;
export default revenue;
