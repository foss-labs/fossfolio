import React from 'react';

import { Child } from '@app/types';
import { DashNav } from './components/DashNav';

export const DashLayout = ({ children }: Child) => (
    <div className="flex flex-col">
        <DashNav />
        {children}
    </div>
);
