import { DashboardLayout } from "@app/layout";
import { Teams } from "@app/views/dashboard"

const teams = () => {
    return (
        <div className=" p-6">
        <h1 className="text-xs">FOSSHACK 3.0</h1>
        <div className="flex justify-between items-center ">
          <h1 className="text-[38px] font-bold">Registrations</h1>
          
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
        
  <input
    type="search"
    className="block w-sm text-[16px] py-2 px-3 rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-brand-pink-100  focus:border-brand-blue-400 mt-4"
    placeholder="Find team or person"
  />
    <div className="flex flex-wrap flex-col gap-y-[25px] gap-x-[75px] justify-center items-center p-4  md:justify-start lg:flex-row lg:items-center mr-6 ml-6 ">
        <Teams />
        <Teams />
        <Teams />
        <Teams />
        <Teams />
        <Teams />
              </div>
            </div>
          
    )
}

teams.Layout = DashboardLayout;
teams.RequireAuth = true;
export default teams