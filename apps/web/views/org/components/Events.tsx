import { BsCalendarEvent } from 'react-icons/bs';
import { NewEventDialog } from '@app/views/dashboard';
import { PreLoader, EventCard } from '@app/components/events';
import { useRoles, useToggle } from '@app/hooks';
import { useOrgEvents } from '@app/hooks/api/org';
import { useRouter } from 'next/router';

export const Events = () => {
    const { isLoading, data, refetch } = useOrgEvents();
    const [isOpen, toggleOpen] = useToggle();

    const { canCreateEvent } = useRoles();

    const router = useRouter();
    const { id } = router.query;
    const moveToDashBoard = (pk: string) => {
        router.push(`/org/${id}/${pk}/event`);
    };

    if (isLoading) {
        return <PreLoader count={5} />;
    }
    return (
        <div className="flex flex-wrap gap-4 lg:w-[90%] ">
            {canCreateEvent && (
                <div
                    className="w-[300px] h-[150px] mt-6 border-2 group p-3 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition flex justify-center items-center border-dotted rounded-md flex-col hover:cursor-pointer"
                    onClick={toggleOpen.on}
                >
                    <BsCalendarEvent className="text-3xl p-1" />
                    Create New Event
                </div>
            )}
            {data?.event.map((el) => (
                <div onClick={() => moveToDashBoard(el.slug as string)} key={el.id}>
                    <EventCard
                        key={el.id}
                        name={el.name}
                        id={el.id}
                        slug={el.slug}
                        location={el.location}
                        website={el.website}
                        lastDate={el.lastDate}
                        eventDate={el.eventDate}
                        coverImage={el.coverImage}
                        isOrg
                    />
                </div>
            ))}

            <NewEventDialog isOpen={isOpen} onClose={toggleOpen.off} refetch={refetch} />
        </div>
    );
};
