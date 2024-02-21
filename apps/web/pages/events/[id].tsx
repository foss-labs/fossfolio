import { Button } from '@app/components/ui/Button';
import { apiHandler } from '@app/config';
import { useToggle } from '@app/hooks';
import { useEvent, useUserRegistartionStatus } from '@app/hooks/api/Events';
import { HomeLayout } from '@app/layout';
import { PublicFormModal } from '@app/views/form';
import { useMutation } from '@tanstack/react-query';
import { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import { Editor } from 'novel';
import { RiLoaderFill } from 'react-icons/ri';
import { toast } from 'sonner';

const Event: NextPageWithLayout = () => {
    const { data, refetch } = useEvent('public');
    const { data: dt, refetch: refetchStatus } = useUserRegistartionStatus();
    const [isFormOpen, toggleForm] = useToggle(false);
    const router = useRouter();
    // pk of event
    const { id } = router.query;

    const registerEvent = async () => {
        if (data && data.data && data?.data.form.length > 0 && data.data.isFormPublished) {
            // popup the form component
            toggleForm.on();
            return;
        }
        return await apiHandler.post('/events/register', {
            eventId: id,
        });
    };

    const { isLoading, mutate } = useMutation(registerEvent, {
        onSuccess: () => {
            // make sure to close the form else this onSuccess wont work
            // Should add payment condition as well - todo @sreehari2003
            if (data?.data.isFormPublished && isFormOpen) return;
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
                <PublicFormModal
                    isOpen={isFormOpen}
                    onClose={toggleForm.off}
                    schema={data.data.form}
                />
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
