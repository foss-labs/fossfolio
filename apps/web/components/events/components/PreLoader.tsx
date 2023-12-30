import { EventsLoader } from '@app/components/preloaders';

type Prop = {
    count: number;
};

export const PreLoader = ({ count = 10 }: Prop) => {
    return (
        <div className="flex flex-wrap flex-col gap-[25px] items-center justify-center p-4  md:justify-start lg:flex-row lg:items-center lg:justify-center">
            {new Array(count).fill(0).map(() => (
                <EventsLoader />
            ))}
        </div>
    );
};
