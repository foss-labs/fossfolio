import { useKanban } from '@app/hooks/api/kanban';
import { DashboardLayout } from '@app/layout';
import { RiLoaderFill } from 'react-icons/ri';
import { Separator } from '@app/ui/components/separator';
import { Kanban } from '@app/views/tasks';

const Tasks = () => {
    const { data, isLoading } = useKanban();

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center p-4">
                <RiLoaderFill className="animate-spin h-8 w-8" />
            </div>
        );
    }
    return (
        <div className="h-screen p-5">
            <h1 className="text-3xl">Board</h1>
            <Separator className="mt-5" />
            <div className="flex mt-6 gap-3">
                {data?.data.map((board) => (
                    <div className="flex">
                        <Kanban {...board} />
                        <Separator className="mt-5" orientation="vertical" />
                    </div>
                ))}
            </div>
        </div>
    );
};

Tasks.Layout = DashboardLayout;
Tasks.RequireAuth = true;
export default Tasks;
