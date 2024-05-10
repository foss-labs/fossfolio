import { EventsLoader } from '@app/components/preloaders';

type Prop = {
    count: number;
};

export const PreLoader = ({ count = 16 }: Prop) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {new Array(count).fill(0).map((_, index) => (
                <EventsLoader key={index} />
            ))}
        </div>
    );
};
