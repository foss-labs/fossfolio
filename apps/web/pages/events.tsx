import { NextPageWithLayout } from 'next';
import { HomeLayout } from '@app/layout';
import { EventCard, PreLoader } from '@app/components/events';
import { useAllEvents } from '@app/hooks/api/Events';

const Events: NextPageWithLayout = () => {
  const { isLoading } = useAllEvents();

  if (isLoading) {
    return (
      <PreLoader />
    );
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-center text-[48px]">Find Events</h1>
      <div className="flex flex-wrap flex-col gap-[25px] justify-center items-center p-4  md:justify-start lg:flex-row lg:items-center lg:justify-center">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

Events.Layout = HomeLayout;
Events.RequireAuth = false;
export default Events

