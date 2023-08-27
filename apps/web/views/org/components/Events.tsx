import { PreLoader, EventCard } from '@app/components/events';

export const Events = () => {
    // api call to get all events of a org
    const isLoading = true


    if (isLoading) {
        return (
            <PreLoader />
        );
    }
    return (
        <div className="flex flex-wrap flex-col gap-[25px] justify-center items-center p-4  md:justify-start lg:flex-row lg:items-center lg:justify-center">
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
        </div>
    )
}
