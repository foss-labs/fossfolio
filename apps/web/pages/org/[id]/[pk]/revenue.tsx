import { DashboardLayout } from '@app/layout';
import { useEvent, useEventStats } from '@app/hooks/api/Events';
import { RiLoaderFill } from 'react-icons/ri';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const Revenue = () => {
    const { isLoading: isStatsLoading, data: statsData } = useEventStats();
    const { data: eventInfo } = useEvent('event');
    return (
        <div className="bg-gray-100 min-h-screen items-center justify-center">
            <div className="flex flex-wrap  p-6 sm:gap-4 justify-start">
                <div className="rounded-md h-32 w-56  bg-gradient-to-b from-purple-300 via-purple-100 to-white flex flex-col justify-center items-center shadow-md">
                    <h1 className=" text-2xl text-center font-bold mb-2">
                        {statsData?.data.totalRevenue} rs
                    </h1>
                    <p className="  text-brand-purple-700 font-bold   text-center">Total Revenue</p>
                </div>

                <div className="rounded-md h-32 w-56 bg-gradient-to-b from-purple-300 via-purple-100 to-white  bg-blue-100 flex flex-col justify-center items-center shadow-md">
                    <h1 className="text-2xl text-center font-bold mb-2">
                        {statsData?.data.totalTickets}
                    </h1>
                    <p className="text-brand-purple-700 font-bold  text-center ">
                        Tickets Generated
                    </p>
                </div>
            </div>
            <div className="flex justify-between gap-10 p-6  h-[calc(100vh-260px)] sm:flex-col lg:flex-row">
                <div className="bg-white shadow-md w-full">
                    <div className="flex flex-wrap justify-between p-6">
                        <h1 className="font-bold">Revenue</h1>
                        <p>Total revenue : {statsData?.data.totalRevenue}</p>
                    </div>
                    {isStatsLoading ? (
                        <div className="flex w-full h-full justify-center items-center">
                            <RiLoaderFill className="animate-spin h-8 w-8" />
                        </div>
                    ) : (
                        eventInfo?.data.form &&
                        eventInfo.data.form.length > 0 && (
                            <ResponsiveContainer width="100%" height="100%" className="bg-white">
                                <LineChart width={300} height={100} data={data}>
                                    <Line
                                        type="monotone"
                                        dataKey="pv"
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                    />
                                    <XAxis />
                                    <YAxis />
                                </LineChart>
                            </ResponsiveContainer>
                        )
                    )}
                    {!eventInfo?.data.form.length && (
                        <div className="flex w-full h-full justify-center items-center px-40">
                            <article className="w-full bg-red-600 p-8 rounded-md">
                                <h1 className="font-bold text-xl text-center text-white">
                                    Analytics is not supported for event without forms
                                </h1>
                            </article>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Revenue.Layout = DashboardLayout;
Revenue.RequireAuth = true;
export default Revenue;

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
