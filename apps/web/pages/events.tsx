/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { HomeLayout } from '@app/layout';
import { EventCard } from '@app/components/events';
import { NextPageWithLayout } from 'next';
import { useAllEvents } from '@app/hooks/api/Events';
import { EventsLoader } from '@app/components/preloaders';

 const Events: NextPageWithLayout = () => {
    const { isLoading } = useAllEvents();

    if (isLoading) {
        return (
          <div className="p-6 flex flex-col items-center ">
            <h1 className="text-center text-[48px]">Find Events</h1>
            <div className="flex flex-wrap flex-col gap-[25px] justify-center p-4  md:justify-start lg:flex-row">
              <EventsLoader/>
              <EventsLoader />
              <EventsLoader />
              <EventsLoader/>
              <EventsLoader />
              <EventsLoader />
            </div>
          </div>
        );
    }

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-center text-[48px]">Find Events</h1>
            <div className="flex flex-wrap flex-col gap-[25px] justify-center p-4  md:justify-start lg:flex-row">
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

