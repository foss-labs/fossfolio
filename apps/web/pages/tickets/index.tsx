import React, { useState, useEffect } from 'react';
import { NextPageWithLayout } from 'next';
import { HomeLayout } from '@app/layout';
import { Button } from '@app/components/ui/Button';

const Ticket: NextPageWithLayout = () => {
    const [activeTab, setTab] = useState('upcoming');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsLoading(false);
        };

        fetchData();
    }, [activeTab]);

    return (
        <div className="mt-4 p-4 h-[92vh]">
            <div className="flex items-center justify-center mb-4 gap-4">
                <Button onClick={() => setTab('upcoming')}>Upcoming Tickets</Button>

                <Button variant="outline" className="rounded-sm" onClick={() => setTab('archived')}>
                    Archived Tickets
                </Button>
            </div>

            <div>
                {isLoading ? (
                    <div className="h-[300px]  flex items-center justify-center">
                        {/*Skeleton*/}
                    </div>
                ) : (
                    <div>
                        {activeTab === 'upcoming' && (
                            <div>
                                <div className="rectangle-card">Upcoming Ticket 1</div>
                                <div className="rectangle-card">Upcoming Ticket 2</div>
                            </div>
                        )}
                        {activeTab === 'archived' && (
                            <div>
                                <div className="rectangle-card">Archived Ticket 1</div>
                                <div className="rectangle-card">Archived Ticket 2</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

Ticket.Layout = HomeLayout;
export default Ticket;
