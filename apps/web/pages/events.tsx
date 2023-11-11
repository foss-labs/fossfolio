import { NextPageWithLayout } from 'next';
import { HomeLayout } from '@app/layout';
import { EventCard, PreLoader } from '@app/components/events';
import { useAllEvents } from '@app/hooks/api/Events';

const DUMMEY_DATA = {
    name: 'girls hack',
    location: 'iit bombay',
    id: 10,
    website: 'https://facebook.com/',
};

const Events: NextPageWithLayout = () => {
    const { isLoading } = useAllEvents();

    if (isLoading) {
        return <PreLoader />;
    }

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-center text-5xl">Find Events</h1>
            <div className="flex flex-wrap flex-col  justify-center items-center p-4  gap-10 lg:flex-row lg:items-center lg:justify-normal lg:w-[90%]">
                <EventCard
                    name={DUMMEY_DATA.name}
                    id={DUMMEY_DATA.id.toString()}
                    location={DUMMEY_DATA.location}
                    website={DUMMEY_DATA.website}
                />
            </div>
        </div>
    );
};

Events.Layout = HomeLayout;
Events.RequireAuth = false;
export default Events;
