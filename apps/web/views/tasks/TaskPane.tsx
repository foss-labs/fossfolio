import { Button } from '@app/components/ui/Button';
import { Input } from '@app/ui/components/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@app/ui/components/select';
import { Editor } from 'novel';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

type Props = {
    open: boolean;
    onClose: () => void;
};

const InputOption = [
    {
        label: 'sreehari',
        value: '1234',
    },
    {
        label: 'gopan',
        value: 'erre',
    },
];

export const TaskPane = ({ open, onClose }: Props) => {
    return (
        <Drawer
            open={open}
            onClose={onClose}
            direction="right"
            size={650}
            className="p-5 bg-red-300 overflow-y-scroll"
        >
            <div className="flex flex-col">
                <Input placeholder="title" />
                <article className="mt-3">
                    <Select>
                        <SelectTrigger id="type">
                            <SelectValue placeholder="Assign users" />
                        </SelectTrigger>

                        <SelectContent position="popper">
                            {InputOption.map((el) => (
                                <SelectItem key={el.value as string} value={el.value as string}>
                                    {el.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </article>
                <article className="border-2 rounded-sm mt-3 min-h-[700px]">
                    <Editor
                        className="w-full"
                        completionApi={`/api/generate`}
                        storageKey="kanban-editor"
                    />
                </article>
                <Button className="mt-3">Save</Button>
            </div>
        </Drawer>
    );
};
