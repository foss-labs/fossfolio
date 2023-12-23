import { useMemo, useState } from 'react';
import { NextPageWithLayout } from 'next';
import { isBefore } from 'date-fns';
import { HomeLayout } from '@app/layout';
import { Button } from '@app/components/ui/Button';
import { TicketCard } from '@app/views/tickets';
import { useTickets } from '@app/hooks/api/user';
import { PreLoader } from '@app/components/events';

const Ticket: NextPageWithLayout = () => {
    const [activeTab, setTab] = useState<'upcoming' | 'archived'>('upcoming');
    const { isLoading, data } = useTickets();

    const oldTickets = useMemo(() => {
        const d = data?.data?.filter((el) => {
            if (isBefore(new Date(), el.eventDate)) {
                return el;
            }
        });

        return d;
    }, [data]);

    return (
        <div className="mt-4 p-4 h-[92vh]">
            <div className="flex items-center justify-center mb-4 gap-4">
                <Button
                    onClick={() => setTab('upcoming')}
                    variant={activeTab === 'archived' ? 'outline' : 'default'}
                >
                    Upcoming Tickets
                </Button>

                <Button
                    variant={activeTab === 'upcoming' ? 'outline' : 'default'}
                    className="rounded-sm"
                    onClick={() => setTab('archived')}
                >
                    Archived Tickets
                </Button>
            </div>

            <div>
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <PreLoader count={6} />
                    </div>
                ) : (
                    <div>
                        {activeTab === 'upcoming' && (
                            <TicketCard data={data?.data} type="Upcoming" />
                        )}
                        {activeTab === 'archived' && (
                            <TicketCard data={oldTickets} type="Archived" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

Ticket.Layout = HomeLayout;
Ticket.RequireAuth = true;
export default Ticket;
