import React from 'react';
import { DashLayout } from '@app/layout';
import { Card } from '@app/views/events';
import { NextPageWithLayout } from 'next';

const Tickets: NextPageWithLayout = () => (
    <div className="flex flex-wrap flex-col p-[10px] gap-[25px]">
        <h2 className="text-center text-[38px]">Your Tickets</h2>
        <div className="flex gap-[25px] flex-wrap">
            <Card />
            <Card />
        </div>
    </div>
);
Tickets.Layout = DashLayout;
Tickets.RequireAuth = true;

export default Tickets;
