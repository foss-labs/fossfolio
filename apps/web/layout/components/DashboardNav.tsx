import { useRouter } from 'next/router';
import { FiArrowLeft, FiHome, FiUser } from 'react-icons/fi';

export const DashNav = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center pt-31 h-[100vh] p-9 justify-between bg-brand-pink-100">
            <div className="flex flex-col items-start justify-between mt-5 gap-1.5 h-[40vh]">
                <div className="font-medium flex justify-center items-center gap-3 text-lg hover:cursor-pointer">
                    <FiHome className="mr-2.1" />
                    Event name
                </div>
                <div className="font-medium flex text-lg hover:cursor-pointer  justify-center items-center gap-3">
                    <FiUser className="9px text-md" />
                    Teams
                </div>
                <div className="font-medium flex text-lg hover:cursor-pointer  justify-center items-center gap-3">
                    <FiHome className="mr-2.1" />
                    Event name
                </div>
                <div className="font-medium flex text-lg hover:cursor-pointer  justify-center items-center gap-3">
                    <FiUser className="9px text-md" />
                    Teams
                </div>
                <div className="font-medium flex text-lg hover:cursor-pointer  justify-center items-center gap-3">
                    <FiHome className="mr-2.1" />
                    Event name
                </div>
                <div className="font-medium flex text-lg hover:cursor-pointer  justify-center items-center gap-3">
                    <FiUser className="9px text-md" />
                    Teams
                </div>
            </div>
            <div className="font-medium flex text-lg hover:cursor-pointer  justify-center items-center gap-3" onClick={() => router.back()}>
                <FiArrowLeft className="mr-2 text-md" />
                All Events
            </div>
        </div>
    );
}