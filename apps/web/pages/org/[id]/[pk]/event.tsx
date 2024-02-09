import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Editor } from 'novel';
import { toast } from 'sonner';
import { RiLoaderFill } from 'react-icons/ri';
import { useMutation } from '@tanstack/react-query';
import { useToggle } from '@app/hooks';
import { DashboardLayout } from '@app/layout';
import { ENV, apiHandler } from '@app/config';
import { PublishModal } from '@app/views/dashboard';
import { useEvent } from '@app/hooks/api/Events';
import { Button } from '@app/components/ui/Button';
import axios from 'axios';

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
    const [isOpen, triggerModal] = useToggle(false);
    const { data, isLoading, refetch } = useEvent('org');
    const router = useRouter();
    const { id, pk } = router.query;
    const [generatedCompletion, setGeneratedCompletion] = useState('');

    const publishEvent = async () => {
        try {
            const { status, data } = await apiHandler.get(`/events/publish/${id}/${pk}`);
            if (status === 200) {
                toast.success('Event was published successfully');
                return data;
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
            await apiHandler.patch(`/events/edit`, {
                description: input,
                organizationId: id,
                eventId: pk,
            });
        } catch {
            console.warn('error updating event description');
        }
    };

    const unPublishEvent = async () => {
        try {
            const response = await apiHandler.patch(`/events/edit`, {
                isPublished: false,
                organizationId: id,
                eventId: pk,
            });

            return response.data || null;
        } catch (error) {
            console.error('Error unpublishing event');
            throw error;
        }
    };

    const { mutate: unPublish, isLoading: isUnPublishing } = useMutation(unPublishEvent, {
        onSuccess: () => {
            refetch();
            toast.success('event was UnPublished successfully');
        },
        onError: () => {
            toast.error('Error unpublishing event');
        },
    });
    const { mutate: publish, isLoading: isPublishing } = useMutation(publishEvent, {
        onSuccess: () => {
            refetch();
        },
        onError: () => {
            toast.error('Error publishing event');
        },
    });

    const handleUnPublishClick = () => {
        unPublish();
    };

    const handlePublishClick = () => {
        publish();
    };
    const handleGenerateCompletion = async () => {
        try {
            const apiKey = ENV.openai_api_key;
            const apiUrl = ENV.openai_api_url;

            const response = await axios.post(
                apiUrl,
                {
                    prompt: defaultEditorContent.content[0].content[0].text,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiKey}`,
                    },
                },
            );

            setGeneratedCompletion(response.data.choices[0].text);
        } catch (error) {
            console.error('Error making OpenAI request', error);
            toast.error('An error occurred. Please try again later.');
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
                    <Button size="sm" onClick={handlePublishClick} isLoading={isPublishing}>
                        Publish Event
                    </Button>
                ) : (
                    <Button size="sm" onClick={handleUnPublishClick} isLoading={isUnPublishing}>
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
            <Button onClick={handleGenerateCompletion}>Generate description</Button>
            {generatedCompletion && <div>{generatedCompletion}</div>}
        </div>
    );
};

Event.Layout = DashboardLayout;
Event.RequireAuth = true;
export default Event;
