import { Child } from '@app/types';
import { DashNav } from "./components/DashboardNav"

export const DashboardLayout = ({ children }: Child) => {
    return (
        <>
            <DashNav />
            {children}
        </>
    );
};
