import { useRouter } from 'next/router';
import { useEvent } from '@app/hooks/api/Events';
import { ROUTES } from './constants';
import { Tabs, TabsList, TabsTrigger } from '@app/ui/components/tabs';
import { FiArrowLeft } from 'react-icons/fi';

export const DashNav = () => {
    const router = useRouter();

    const { id, pk } = router.query;

    const { data } = useEvent('event');

    const isPaidEvent = data && data?.data.ticketPrice > 0 ? true : false;
    return (
        <div className="flex fixed w-full p-3 bg-brand-pink-100 ">
            <div
                className="font-medium flex text-lg pr-3 hover:cursor-pointer  justify-center items-center gap-3"
                onClick={() => router.push(`/org/${id}`)}
            >
                <FiArrowLeft className="mr-2.1" />
                Go Back
            </div>
            <Tabs defaultValue="Event" className="w-[400px]">
                <TabsList>
                    {ROUTES.map(({ name, icon }) => {
                        if (name === 'Revenue' && !isPaidEvent) return;
                        return (
                            <TabsTrigger
                                onClick={() => {
                                    router.push(`/org/${id}/${pk}/${name.toLowerCase()}`);
                                }}
                                value={name}
                            >
                                {' '}
                                {name}{' '}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
            </Tabs>
        </div>
    );
};
