import { BsCalendarEvent } from 'react-icons/bs';
import { NewEventDialog } from '@app/views/dashboard';
import { PreLoader, EventCard } from '@app/components/events';
import { useToggle } from '@app/hooks';
import { useOrgEvents } from '@app/hooks/api/org';

export const Events = () => {
    // api call to get all events of a org
    const { isLoading, data } = useOrgEvents();
    const [isOpen, toggleOpen] = useToggle();

    if (isLoading) {
        return <PreLoader />;
    }
    return (
        <div className="flex flex-wrap flex-col gap-[25px] justify-center items-center p-4  md:justify-start lg:flex-row lg:items-center lg:justify-normal lg:w-[90%]">
            <div
                className="w-80 h-[150px] border-2 flex justify-center items-center border-dotted flex-col hover:cursor-pointer"
                onClick={toggleOpen.on}
            >
                <BsCalendarEvent className="text-3xl p-1" />
                Create New Event
            </div>
            <NewEventDialog isOpen={isOpen} onClose={toggleOpen.off} />
        </div>
    );
};
