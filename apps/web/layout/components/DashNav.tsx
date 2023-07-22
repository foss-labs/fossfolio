import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiHome, FiUser } from 'react-icons/fi';

export const DashNav = () => (
    <div className="flex flex-col items-center bg-[#f9f5ff] w-[220px] p-9 pt-[64px] h-screen">
        <Image src="/logo.svg" alt="LOGO" width="150" height="150" />

        <div className="flex flex-col items-center mt-[20px] gap-[26px] h-[200px]">
            <Link href="/dashboard">
                <h3 className="font-500 flex text-md text-[#6941C6] hover:cursor-pointer hover:text-[#42307D]">
                    <FiHome className="mr-[9px] text-md" />
                    Dashboard
                </h3>
            </Link>

            <Link href="/dashboard/profile">
                <h3 className="font-500 flex text-md text-[#6941C6] hover:cursor-pointer hover:text-[#42307D]">
                    <FiHome className="mr-[9px] text-md" />
                    My Profile
                </h3>
            </Link>

            <Link href="/dashboard/tickets">
                <h3 className="font-500 flex text-md text-[#6941C6] hover:cursor-pointer hover:text-[#42307D]">
                    <FiUser className="mr-[9px] text-md" />
                    My Tickets
                </h3>
            </Link>
        </div>
        <Link href="/events">
            <h3 className="font-500 flex text-md text-[#6941C6] hover:cursor-pointer hover:text-[#42307D]">
                <FiArrowLeft className="mr-[9px] text-md" />
                back
            </h3>
        </Link>
    </div>
);
