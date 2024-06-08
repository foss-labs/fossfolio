import { DashboardLayout } from '@app/layout';
import { useEventStats } from '@app/hooks/api/Events';
import { RiLoaderFill } from 'react-icons/ri';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

const Revenue = () => {
    const { isLoading: isStatsLoading, data: statsData } = useEventStats();

    const stats = useMemo(() => {
        const records = statsData?.data.insights;
        if (!records) return [];

        return Object.entries(records).map((info) => ({
            name: 'Insights',
            date: info[0],
            sales: info[1],
        }));
    }, [statsData]);

    return (
        <div className="bg-gray-100 min-h-screen items-center justify-center">
            <div className="flex flex-wrap  p-6 sm:gap-4 justify-start">
                <div className="rounded-md h-32 bg-white w-56 p-3 justify-center border flex flex-col shadow-sm">
                    <h1 className="text-4xl font-bold mb-2">
                        ₹ {statsData?.data.totalRevenue || 0}
                    </h1>
                    <p className="text-brand-purple-700 mt-2 font-medium text-xl">Total Revenue</p>
                </div>

                <div className="rounded-md h-32 bg-white w-56 p-3 justify-center border flex flex-col shadow-sm">
                    <h1 className="text-4xl font-bold mb-2">{statsData?.data.totalTickets || 0}</h1>
                    <p className="text-brand-purple-700 mt-2 font-medium text-xl">
                        Tickets Generated
                    </p>
                </div>
            </div>
            <div className="flex justify-between gap-10 p-6  h-[calc(100vh-260px)] sm:flex-col lg:flex-row">
                <div className="bg-white shadow-sm rounded-md w-full">
                    <div className="flex flex-wrap justify-between p-6">
                        <h1 className="font-bold">Revenue</h1>
                        <p>Total revenue : {statsData?.data.totalRevenue || 0}</p>
                    </div>
                    {isStatsLoading ? (
                        <div className="flex w-full h-full justify-center items-center">
                            <RiLoaderFill className="animate-spin h-8 w-8" />
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%" className="bg-white">
                            <LineChart width={300} height={100} data={stats}>
                                <Line
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                />
                                <XAxis dataKey="date" />
                                <YAxis />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
};

Revenue.Layout = DashboardLayout;
Revenue.RequireAuth = true;
export default Revenue;
