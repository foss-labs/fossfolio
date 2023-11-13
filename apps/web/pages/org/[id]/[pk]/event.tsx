import { Editor } from 'novel';
import { DashboardLayout } from '@app/layout';
import { ENV, apiHandler } from '@app/config';
import { Button } from '@app/components/ui/Button';
import { useRouter } from 'next/router';

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
    const router = useRouter();
    const { id, pk } = router.query;

    const publishEvent = async () => {
        return await apiHandler.get(`/events/publish/${id}/${pk}`);
    };

    return (
        <div>
            <div className="flex justify-end">
                <Button size="sm" onClick={publishEvent}>
                    Publish Event
                </Button>
            </div>
            <Editor
                onDebouncedUpdate={(e) => console.log(e)}
                className="w-full"
                defaultValue={defaultEditorContent}
                completionApi={`${ENV.api_base}/ai/generate`}
            />
        </div>
    );
};

Event.Layout = DashboardLayout;
Event.RequireAuth = true;
export default Event;
