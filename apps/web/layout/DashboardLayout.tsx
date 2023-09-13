import { Child } from '@app/types';
import { DashNav } from "./components/DashboardNav"

export const DashboardLayout = ({ children }: Child) => {
    return (
        <div className='flex'>
            <DashNav />
            {children}
        </div>
    );
};
