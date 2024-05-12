import { NextPageWithLayout } from 'next';
import { HomeLayout } from '@app/layout';
import { EventCard, PreLoader, NoData } from '@app/components/events';
import { useAllEvents } from '@app/hooks/api/Events';
import { Error } from '@app/components/Error';
import { da } from 'date-fns/locale';

const Events: NextPageWithLayout = () => {
    const { isLoading, data, error } = useAllEvents();

    if (error) {
        return <Error />;
    }

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-center text-5xl">Find Events</h1>
            {isLoading ? (
                <PreLoader count={10} />
            ) : (
                <>
                    {data && data.length > 0 && (
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

                    {data?.length === 0 && (
                        <h1 className="text-center min-h-[600px] text-2xl flex items-center">
                            No events found. <br /> Please check back later.
                        </h1>
                    )}
                </>
            )}
        </div>
    );
};

Events.Layout = HomeLayout;
Events.RequireAuth = false;
export default Events;
