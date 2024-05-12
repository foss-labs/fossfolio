import { useRouter } from 'next/router';
import { useEvent } from '@app/hooks/api/Events';
import { ROUTES } from './constants';
import { Tabs, TabsList, TabsTrigger } from '@app/ui/components/tabs';
import { FiArrowLeft } from 'react-icons/fi';
import { apiHandler } from '@app/config';
import { toast } from 'sonner';
import { useRoles, useToggle } from '@app/hooks';
import { Button } from '@app/components/ui/Button';

export const DashNav = () => {
    const router = useRouter();

    const { canEditEvent } = useRoles();

    const { id, pk } = router.query;

    const { data, isLoading: isEventLoading, refetch } = useEvent('event');

    const [isLoading, toggleLoading] = useToggle(false);

    const publishEvent = async () => {
        try {
            toggleLoading.on();
            await apiHandler.patch(`/events/edit`, {
                organizationId: id,
                eventSlug: pk,
                isPublished: true,
            });
        } catch (error) {
            toast.error('Error publishing event');
        } finally {
            toggleLoading.off();
        }
    };

    const unPublishEvent = async () => {
        try {
            toggleLoading.on();
            await apiHandler.patch(`/events/edit`, {
                organizationId: id,
                eventSlug: pk,
                isPublished: false,
            });
        } catch (error) {
            toast.error('Error unpublishing event');
        } finally {
            toggleLoading.off();
        }
    };

    const toggleEventPublish = async () => {
        if (data?.data.isPublished) {
            await unPublishEvent();
        } else {
            await publishEvent();
        }
        refetch();
    };

    const isPaidEvent = data && data?.data.ticketPrice > 0 ? true : false;
    return (
        <div className="flex fixed w-full p-3 justify-between bg-brand-pink-100 ">
            <div className="flex">
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
                            if ((name === 'Revenue' && !isPaidEvent) || name === 'Tasks') return;
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
            {canEditEvent && (
                <Button
                    disabled={isEventLoading || isLoading}
                    isLoading={isLoading}
                    onClick={toggleEventPublish}
                >
                    {data?.data.isPublished ? (
                        <span className="text-white">UnPublish Event</span>
                    ) : (
                        <span className="text-white">Publish Event</span>
                    )}
                </Button>
            )}
        </div>
    );
};
