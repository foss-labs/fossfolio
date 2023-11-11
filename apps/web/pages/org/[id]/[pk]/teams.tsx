import { DashboardLayout } from '@app/layout';
import { Input } from '@app/ui/components/input';
import { Teams } from '@app/views/dashboard';

const teams = () => {
    return (
        <div className=" p-6">
            <div className="flex justify-between items-center ">
                <div>
                    <h1 className="text-xs">FOSSHACK 3.0</h1>
                    <h1 className="text-[38px] font-bold">Registrations</h1>
                </div>
                <div className="flex">
                    <div className="items-center w-[auto] h-[auto] bg-brand-pink-100 rounded-lg p-2 mr-4">
                        <h1 className="text-[30px] text-center font-bold">124</h1>
                        <p className="text-[12px] font-bold text-center">TEAMS</p>
                    </div>
                    <div className="items-center w-[auto] h-[auto] bg-brand-pink-100 rounded-lg p-2 mr-4">
                        <h1 className="text-[30px] text-center font-bold">250</h1>
                        <p className="text-[12px] font-bold text-center">PARTICIPANTS</p>
                    </div>
                    <div className="items-center w-[auto] h-[auto] bg-brand-pink-100 rounded-lg p-2 mr-4">
                        <h1 className="text-[30px] text-center font-bold">55</h1>
                        <p className="text-[12px] font-bold text-center">STUDENTS</p>
                    </div>
                    <div className="items-center w-[auto] h-[auto] bg-brand-pink-100 rounded-lg p-2 mr-4">
                        <h1 className="text-[30px] text-center font-bold">23</h1>
                        <p className="text-[12px] font-bold text-center">PROS</p>
                    </div>
                </div>
            </div>

            <div className=" w-[250px] mt-6 mb-2">
                <Input type="search" placeholder="Find team or person" />
            </div>
            <div className="flex flex-wrap gap-10  justify-center mt-5">
                <Teams />
                <Teams />
                <Teams />
                <Teams />
                <Teams />
                <Teams />
            </div>
        </div>
    );
};

teams.Layout = DashboardLayout;
teams.RequireAuth = true;
export default teams;
