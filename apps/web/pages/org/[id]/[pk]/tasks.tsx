import { useKanban } from '@app/hooks/api/kanban';
import { DashboardLayout } from '@app/layout';
import { Separator } from '@app/ui/components/separator';
import { Kanban } from '@app/views/tasks';
import { Loader } from '@app/components/preloaders';

const Tasks = () => {
    const { data, isLoading } = useKanban();

    if (isLoading) {
        return <Loader />;
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
