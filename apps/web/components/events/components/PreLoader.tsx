import { EventsLoader } from '@app/components/preloaders';

type Prop = {
    count: number;
};

export const PreLoader = ({ count = 16 }: Prop) => {
    return (
        <div className="flex flex-wrap flex-col justify-center items-center p-4  gap-2 lg:flex-row lg:items-center lg:justify-start">
            {new Array(count).fill(0).map((_, index) => (
                <EventsLoader key={index} />
            ))}
        </div>
    );
};
