import { Child } from '@app/types';
import { DashNav } from './components/DashboardNav';

export const DashboardLayout = ({ children }: Child) => {
    return (
        <div className="flex">
            <DashNav />
            <div className="ml-[240px] w-full">{children}</div>
        </div>
    );
};
