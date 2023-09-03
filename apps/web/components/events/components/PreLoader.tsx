import { EventsLoader } from "@app/components/preloaders"
export const PreLoader = () => {
    return (
        <div className="flex flex-wrap flex-col gap-[25px] items-center justify-center p-4  md:justify-start lg:flex-row lg:items-center lg:justify-center">
            <EventsLoader />
            <EventsLoader />
            <EventsLoader />
            <EventsLoader />
            <EventsLoader />
            <EventsLoader />
            <EventsLoader />
            <EventsLoader />
            <EventsLoader />
            <EventsLoader />
            <EventsLoader />
            <EventsLoader />
        </div>
    )
}
