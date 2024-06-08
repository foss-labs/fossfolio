import { Button } from '@app/components/ui/Button';
import { Comments } from '@app/types';
import { Editor } from 'novel';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    description: Comments[];
    storageKey: string;
};

export const TaskPreviewPane = ({ open, onClose, title, description, storageKey }: Props) => {
    const handleClose = () => {
        localStorage.clear();
        onClose();
    };

    return (
        <Drawer
            open={open}
            onClose={handleClose}
            direction="right"
            size={650}
            className="p-5 bg-red-300 overflow-y-scroll"
        >
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{title}</h1>

                <article className="border-2 rounded-sm mt-3 p-2">
                    {description.map((desc) => (
                        <Editor
                            className="w-full"
                            completionApi={`/api/generate`}
                            storageKey={desc.id}
                            defaultValue={JSON.parse(desc.data) || ''}
                        />
                    ))}
                </article>
                <article className="border-2 rounded-sm mt-3 p-2">
                    <Editor className="w-full" storageKey={storageKey} defaultValue="" />
                </article>
                <Button className="mt-3">Save</Button>
            </div>
        </Drawer>
    );
};
