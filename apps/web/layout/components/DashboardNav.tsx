import { useRouter } from 'next/router';
import { FiArrowLeft, FiHome, FiUser, FiSettings, FiBarChart } from 'react-icons/fi';
import { BsPeople } from "react-icons/bs"

export const DashNav = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center pt-31 h-[100vh] p-9 justify-between bg-brand-pink-100 w-[240px] fixed top-0 left-0 bottom-0 overflow-auto">
            <div className="flex flex-col items-start justify-between mt-5 gap-1.5 h-[40vh]">
                <div className="font-medium flex justify-center items-center gap-3 text-lg hover:cursor-pointer" onClick={() => router.push(`/org/${router.query?.id}/event`)}>
                    <FiHome className="mr-2.1" />
                    Event
                </div>
                <div className="font-medium flex text-lg hover:cursor-pointer  justify-center items-center gap-3" onClick={() => router.push(`/org/${router.query?.id}/participants`)}>
                    <FiUser className="9px text-md" />
                    Participants
                </div>
                <div className="font-medium flex text-lg hover:cursor-pointer  justify-center items-center gap-3" onClick={() => router.push(`/org/${router.query?.id}/teams`)}>
                    <BsPeople className="mr-2.1" />
                    Teams
                </div>
                <div className="font-medium flex text-lg hover:cursor-pointer  justify-center items-center gap-3" onClick={() => router.push(`/org/${router.query?.id}/revenue`)}>
                    <FiBarChart className="9px text-md" />
                    Revenue
                </div>
                <div className="font-medium flex text-lg hover:cursor-pointer  justify-center items-center gap-3" onClick={() => router.push(`/org/${router.query?.id}/settings`)}>
                    <FiSettings className="mr-2.1" />
                    Settings
                </div>
            </div>
            <div className="font-medium flex text-lg hover:cursor-pointer  justify-center items-center gap-3" onClick={() => router.back()}>
                <FiArrowLeft className="mr-2.1" />
                Go Back
            </div>
        </div>
    )
}