import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import { useEvent } from '@app/hooks/api/Events';
import { DashBoardRoute } from './DashBoardRoute';
import { ROUTES } from './constants';

export const DashNav = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data } = useEvent('event');

    const isPaidEvent = data && data?.data.ticketPrice > 0 ? true : false;
    return (
        <div className="flex flex-col items-center pt-31 h-[100vh] p-9 justify-between bg-brand-pink-100 w-[240px] fixed top-0 left-0 bottom-0 overflow-auto">
            <div className="flex flex-col items-start justify-between mt-5 gap-1.5 h-[40vh]">
                {ROUTES.map(({ name, icon }) => {
                    if (name === 'Revenue' && !isPaidEvent) return;
                    return <DashBoardRoute name={name} Icon={icon} />;
                })}
            </div>
            <div
                className="font-medium flex text-lg hover:cursor-pointer  justify-center items-center gap-3"
                onClick={() => router.push(`/org/${id}`)}
            >
                <FiArrowLeft className="mr-2.1" />
                Go Back
            </div>
        </div>
    );
};
