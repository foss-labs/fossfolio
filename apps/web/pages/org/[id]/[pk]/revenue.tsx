import { DashboardLayout } from '@app/layout';

const Revenue = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Revenue</h1>

            <div className="flex flex-wrap gap-10 justify-center mt-5">
                <div className="rounded-md h-48 w-80 mx-2 bg-brand-green-100 flex flex-col justify-center items-center">
                    <h1 className="text-8 text-center font-bold">$546</h1>
                    <p className="text-4 font-bold text-center">Total Revenue</p>
                </div>

                <div className="rounded-md h-48 w-80 mx-2 bg-brand-yellow-100 flex flex-col justify-center items-center">
                    <h1 className="text-8 text-center font-bold">$546</h1>
                    <p className="text-4 font-bold text-center">Max Revenue Per Day</p>
                </div>

                <div className="rounded-md h-48 w-80 mx-2 bg-brand-blue-100 flex flex-col justify-center items-center">
                    <h1 className="text-8 text-center font-bold">$546</h1>
                    <p className="text-4 font-bold text-center">Average Ticket Price</p>
                </div>
            </div>

            <div className="rounded-md mt-10 h-80 mx-2 bg-brand-pink-100">
                <div className="flex justify-center items-center h-full"></div>
            </div>
        </div>
    );
};

Revenue.Layout = DashboardLayout;
Revenue.RequireAuth = true;
export default Revenue;
