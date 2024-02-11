import { Button } from '@app/components/ui/Button';
import { apiHandler } from '@app/config';
import { useEvent, useUserRegistartionStatus } from '@app/hooks/api/Events';
import { HomeLayout } from '@app/layout';
import { useMutation } from '@tanstack/react-query';
import { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import { Editor } from 'novel';
import { RiLoaderFill } from 'react-icons/ri';
import { toast } from 'sonner';

const Event: NextPageWithLayout = () => {
    const { data, refetch } = useEvent();
    const { data: dt, refetch: refetchStatus } = useUserRegistartionStatus();
    const router = useRouter();
    // pk of event
    const { id } = router.query;

    const registerEvent = async () => {
        return await apiHandler.post('/events/register', {
            eventId: id,
        });
    };

    const { isLoading, mutate } = useMutation(registerEvent, {
        onSuccess: () => {
            toast.success('successfully registered for event');
            refetch();
            refetchStatus();
        },
    });

    const register = () => {
        mutate();
    };

    if (data) {
        return (
            <div className="mt-5">
                <section>
                    <h1 className="text-5xl font-bold text-center uppercase">{data.data.name}</h1>
                </section>
                <Editor
                    className="w-full"
                    defaultValue={JSON.parse(data.data.description as string)}
                    editorProps={{
                        editable: () => false,
                    }}
                />
                {!dt?.isRegistred && (
                    <Button className="ml-10 px-6" isLoading={isLoading} onClick={register}>
                        Register
                    </Button>
                )}
            </div>
        );
    } else {
        return (
            <div className="h-[90vh]  flex items-center justify-center">
                <RiLoaderFill className="animate-spin h-8 w-8" />
            </div>
        );
    }
};

Event.Layout = HomeLayout;
Event.RequireAuth = false;
export default Event;
