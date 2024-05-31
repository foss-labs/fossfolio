import { IoIosMore } from 'react-icons/io';
import { Button } from '@app/components/ui/Button';
import { useDrop } from 'react-dnd';
import { clsx } from 'clsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '@app/ui/components/dropdown-menu';
import type { Kanban as KanbanType, Task } from '@app/types';
import { TaskPane } from './TaskPane';
import { useToggle } from '@app/hooks';
import { useRouter } from 'next/router';
import { TaskPreviewPane } from './TaskPreviewPane';
import { useState } from 'react';
import { apiHandler } from '@app/config';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KanbanTask } from './KanbanTask';
import { useUpdateTask } from '@app/hooks/api/kanban';

interface KanbanWithRefetch extends KanbanType {
    refetch: Function;
}

export const Kanban = ({ title, _count, id, tasks, refetch }: KanbanWithRefetch) => {
    const [isTaskPaneOpen, setTaskPane] = useToggle(false);
    const [isPreviewPaneOpen, setTaskPreviewPane] = useToggle(false);
    const updateTask = useUpdateTask();

    const queryClient = useQueryClient();

    const [taskPreview, setTaskPreview] = useState<Task>();

    const router = useRouter();

    const { pk } = router.query;

    const addTask = () => {
        router.replace({
            query: {
                ...router.query,
                newTask: true,
                kanban: id,
            },
        });
        setTaskPane.on();
    };

    const closeTaskPane = () => {
        const { newTask, kanban, ...query } = router.query;

        router.replace({
            query: {
                ...query,
            },
        });

        setTaskPane.off();
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TASK',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        drop: (item: any, monitor) => {
            if (monitor.didDrop()) return;

            if (item.id === id) return;

            updateTask.mutate({
                taskId: item.id,
                newKanbanId: id,
            });
        },
    }));

    const deleteTask = async () => {
        try {
            await apiHandler.delete(`/events/kanban/${pk}/${id}`);

            toast.success('board deleted successfully');
        } catch {
            toast.error('Error deleting board');
        }
    };

    const { mutate } = useMutation(deleteTask, {
        onSettled: () => {
            queryClient.invalidateQueries(['event', 'kanban', pk]);
        },
        onSuccess: () => {
            refetch();
        },
    });

    return (
        <>
            <TaskPane open={isTaskPaneOpen} onClose={closeTaskPane} boardId={id} />
            <TaskPreviewPane
                open={isPreviewPaneOpen}
                onClose={setTaskPreviewPane.off}
                title={taskPreview?.title || ''}
                description={taskPreview?.Comment || []}
                storageKey={id}
            />
            <article className="min-h-[700px] w-[300px]" ref={drop}>
                <div className="p-5 flex justify-between">
                    <h3 className="text-start font-bold">
                        {title}
                        <span className="rounded-sm text-gray-400 ml-1 px-2 font-light">
                            {_count.tasks}
                        </span>
                    </h3>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="hover:cursor-pointer">
                                <IoIosMore className="self-center" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-20" align="end" forceMount>
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={() => {}}
                                    className="hover:cursor-pointer"
                                >
                                    Rename
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => mutate()}
                                className=" text-white bg-red-600"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className={clsx('p-3 gap-2 flex flex-col', isOver && 'bg-slate-200')}>
                    {tasks.map((data) => (
                        <KanbanTask
                            data={data}
                            setTaskPreview={setTaskPreview}
                            setTaskPreviewPane={setTaskPreviewPane}
                        />
                    ))}
                    <Button className="w-full mt-3" variant="outline" onClick={addTask}>
                        New Task
                    </Button>
                </div>
            </article>
        </>
    );
};
