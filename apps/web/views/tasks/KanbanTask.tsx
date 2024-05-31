import { clsx } from 'clsx';
import { Toggle } from '@app/hooks/useToggle';
import { Task } from '@app/types';
import { Card } from '@app/ui/components/card';
import { useDrag } from 'react-dnd';

interface Prop {
    setTaskPreview: React.Dispatch<Task>;
    setTaskPreviewPane: Toggle;
    data: Task;
}

export const KanbanTask = ({ setTaskPreview, setTaskPreviewPane, data }: Prop) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'TASK',
            item: {
                id: data.id,
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [data.id],
    );

    const handlePreviewPane = () => {
        setTaskPreview(data);
        setTaskPreviewPane.on();
    };

    return (
        <Card
            ref={drag}
            className={clsx('rounded-md p-5 hover:cursor-pointer', isDragging && 'hidden')}
            onClick={handlePreviewPane}
        >
            <h2>{data.title}</h2>
        </Card>
    );
};
