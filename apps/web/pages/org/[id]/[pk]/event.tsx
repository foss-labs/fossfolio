import { Editor } from 'novel';
import { DashboardLayout } from '@app/layout';
import { ENV, apiHandler } from '@app/config';
import { Button } from '@app/components/ui/Button';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { useToggle } from '@app/hooks';
import { PublishModal } from '@app/views/dashboard';
import { useEffect } from 'react';
import { useEvent } from '@app/hooks/api/Events';
import { RiLoaderFill } from 'react-icons/ri';

const defaultEditorContent = {
    type: 'doc',
    content: [
        {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Add Your Event Info Here' }],
        },
    ],
};

const Event = () => {
    const [isPublishing, setPublishing] = useToggle(false);
    const [isOpen, triggerModal] = useToggle(false);
    const { data, isLoading } = useEvent('org');
    const router = useRouter();
    const { id, pk } = router.query;

    const publishEvent = async () => {
        try {
            setPublishing.on();
            const { status } = await apiHandler.get(`/events/publish/${id}/${pk}`);
            if (status === 200) {
                toast.success('Event was published successfully');
            } else {
                throw new Error();
            }
        } catch (e: any) {
            if (e.response.status === 422) {
                // open the more info of event modal
                triggerModal.on();
            } else if (e.response.status === 404) {
                toast.error(e.response.data.message);
            } else {
                toast.error('something went wrong');
            }
        } finally {
            setPublishing.off();
        }
    };

    useEffect(() => {
        // remove description when ever component unmounts
        () => localStorage.removeItem('novel__content');
    }, []);

    const handleUpdate = async () => {
        try {
            const input = localStorage.getItem('novel__content');
            // if event date is before end date
            const { data } = await apiHandler.patch(`/events/edit`, {
                description: input,
                organizationId: id,
                eventId: pk,
            });
        } catch {
            console.warn('error updating event description');
        }
    };

    if (isLoading) {
        return (
            <div className="h-[90vh]  flex items-center justify-center">
                <RiLoaderFill className="animate-spin h-8 w-8" />
            </div>
        );
    }

    return (
        <div>
            <PublishModal isOpen={isOpen} onClose={triggerModal.off} />
            <div className="flex justify-end">
                {!data?.data.isPublished ? (
                    <Button size="sm" onClick={publishEvent} isLoading={isPublishing}>
                        Publish Event
                    </Button>
                ) : (
                    <Button size="sm" onClick={publishEvent} isLoading={isPublishing}>
                        UnPublish Event
                    </Button>
                )}
            </div>
            <Editor
                className="w-full"
                defaultValue={JSON.parse(data?.data.description as string) || defaultEditorContent}
                completionApi={`${ENV.api_base}/ai/generate`}
                onDebouncedUpdate={handleUpdate}
            />
        </div>
    );
};

Event.Layout = DashboardLayout;
Event.RequireAuth = true;
export default Event;
