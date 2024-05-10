import { NextPageWithLayout } from 'next';
import { HomeLayout } from '@app/layout';
import { EventCard, PreLoader, NoData } from '@app/components/events';
import { useAllEvents } from '@app/hooks/api/Events';
import { Error } from '@app/components/Error';

const Events: NextPageWithLayout = () => {
    const { isLoading, data, error } = useAllEvents();

    if (error) {
        return <Error />;
    }

    if (data?.length === 0) {
        return (
            <div className="p-6 flex flex-col items-center">
                <h1 className="text-center text-5xl">Find Events</h1>
                <div className="flex justify-center items-center h-[70vh]">
                    <NoData />
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-center text-5xl">Find Events</h1>
            {isLoading ? (
                <PreLoader count={10} />
            ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%]">
                    {data?.map((el) => (
                        <EventCard
                            name={el.name}
                            id={el.id}
                            key={el.id}
                            location={el.location}
                            website={el.website}
                            lastDate={el.lastDate}
                            eventDate={el.eventDate}
                            coverImage={el.coverImage}
                            slug={el.slug}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

Events.Layout = HomeLayout;
Events.RequireAuth = false;
export default Events;
