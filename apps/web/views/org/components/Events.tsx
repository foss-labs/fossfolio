import { BsCalendarEvent } from 'react-icons/bs';
import { NewEventDialog } from '@app/views/dashboard';
import { PreLoader, EventCard } from '@app/components/events';
import { useToggle } from '@app/hooks';
import { useOrgEvents } from '@app/hooks/api/org';
import { useRouter } from 'next/router';

export const Events = () => {
    const { isLoading, data } = useOrgEvents();
    const [isOpen, toggleOpen] = useToggle();
    const router = useRouter();
    const { id } = router.query;
    const moveToDashBoard = (pk: string) => {
        router.push(`/org/${id}/${pk}/event`);
    };

    if (isLoading) {
        return <PreLoader />;
    }
    return (
        <div className="flex flex-wrap flex-col gap-[25px] justify-center items-center p-4  md:justify-start lg:flex-row lg:items-center lg:justify-normal lg:w-[90%] ">
            <div
                className="h-[260px] border-2 flex justify-center items-center border-dotted flex-col  w-[360px] md:w-[400px] mt-6 hover:cursor-pointer hover:outline-double hover:outline-primary"
                onClick={toggleOpen.on}
            >
                <BsCalendarEvent className="text-3xl p-1" />
                Create New Event
            </div>
            {data?.map((el) => (
                <div onClick={() => moveToDashBoard(id as string)}>
                    <EventCard
                        name={el.name}
                        id={el.id}
                        location={el.location}
                        website={el.website}
                    />
                </div>
            ))}

            <NewEventDialog isOpen={isOpen} onClose={toggleOpen.off} />
        </div>
    );
};
