import { useKanban } from '@app/hooks/api/kanban';
import { DashboardLayout } from '@app/layout';
import { Separator } from '@app/ui/components/separator';
import { Kanban } from '@app/views/tasks';
import { Loader } from '@app/components/preloaders';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Button } from '@app/components/ui/Button';

const Tasks = () => {
    const { data, isLoading, refetch } = useKanban();

    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className="h-screen p-5 absolute">
            <div className="flex justify-between items-center h-12 fixed w-full p-5 top-20 bg-white z-10 left-2">
                <h1 className="text-3xl">Board</h1>
                <Button variant="outline">New Board</Button>
            </div>
            <Separator className="mt-16" />
            <DndProvider backend={HTML5Backend}>
                <div className="flex mt-6 gap-3">
                    {data?.data.map((board) => (
                        <div className="flex" key={board.id}>
                            <Kanban {...board} refetch={refetch} />
                            <Separator className="mt-5" orientation="vertical" />
                        </div>
                    ))}
                </div>
            </DndProvider>
        </div>
    );
};

Tasks.Layout = DashboardLayout;
Tasks.RequireAuth = true;
export default Tasks;
