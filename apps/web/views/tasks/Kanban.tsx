import { IoIosMore } from 'react-icons/io';
import { Button } from '@app/components/ui/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '@app/ui/components/dropdown-menu';
import type { Kanban as KanbanType } from '@app/types';
import { TaskPane } from './TaskPane';
import { useToggle } from '@app/hooks';
import { useRouter } from 'next/router';

export const Kanban = ({ title, _count, id }: KanbanType) => {
    const [isTaskPaneOpen, setTaskPane] = useToggle(false);

    const router = useRouter();

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

    return (
        <>
            <TaskPane open={isTaskPaneOpen} onClose={closeTaskPane} />
            <article className="min-h-[700px] w-[300px]">
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
                            <DropdownMenuItem onClick={() => {}} className="hover:cursor-pointe">
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="p-3">
                    <Button className="w-full mt-3" variant="outline" onClick={addTask}>
                        New Task
                    </Button>
                </div>
            </article>
        </>
    );
};
