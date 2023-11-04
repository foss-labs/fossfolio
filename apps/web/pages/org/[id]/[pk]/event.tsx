import { Editor } from 'novel';
import { DashboardLayout } from '@app/layout';
import { ENV } from '@app/config';
import { Button } from '@app/components/ui/Button';

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
    const onPublish = () => {
        // novel store the data in local storage
        const data = localStorage.getItem('novel__content');
    };

    return (
        <div>
            <div className="flex justify-end">
                <Button size="lg" onClick={onPublish}>
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
