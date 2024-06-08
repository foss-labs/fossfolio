import { Child } from '@app/types';
import { DashNav } from './components/DashboardNav';

export const DashboardLayout = ({ children }: Child) => {
    return (
        <div className="flex flex-col">
            <DashNav />
            <div className="w-full mt-12">{children}</div>
        </div>
    );
};
