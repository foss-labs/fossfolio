import { Button } from '@app/components/ui/Button';
import { ENV } from '@app/config';
import { useEvent } from '@app/hooks/api/Events';
import { HomeLayout } from '@app/layout';
import { NextPageWithLayout } from 'next';
import { Editor } from 'novel';
import { RiLoaderFill } from 'react-icons/ri';
import { toast } from 'sonner';

const Event: NextPageWithLayout = () => {
    const { data } = useEvent();

    const registerEvent = async () => {
        try {
        } catch {
            toast.error('Error registering event please try again later');
        }
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
                    completionApi={`${ENV.api_base}/ai/generate`}
                    editorProps={{
                        editable: () => false,
                    }}
                />
                <Button className="ml-10 px-6">Register</Button>
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
