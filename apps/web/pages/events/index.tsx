import { NextPageWithLayout } from 'next';
import { HomeLayout } from '@app/layout';
import { EventCard, PreLoader, NoData } from '@app/components/events';
import { useAllEvents } from '@app/hooks/api/Events';
import { Error } from '@app/components/Error';
import { Input } from '@app/ui/components/input';
import { useEffect, useState } from 'react';
import { debounce } from '@app/utils';

const Events: NextPageWithLayout = () => {
    const [query, setQuery] = useState<string>('');

    const debouncedSearch = debounce((search: string) => setQuery(search));

    const { isLoading, data, error, refetch } = useAllEvents(query);

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    if (error) {
        return <Error />;
    }

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-center text-5xl">Find Events</h1>
            <Input
                className="my-8"
                placeholder="Search for events"
                onChange={(val: React.ChangeEvent<HTMLInputElement>) => {
                    debouncedSearch(val.target.value);
                }}
            />
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
