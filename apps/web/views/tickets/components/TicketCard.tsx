import React from 'react';
import { useToggle } from '@app/hooks/useToggle';
import { TicketModal } from '@app/views/tickets';
import type { Data } from '@app/hooks/api/user/useTickets';

export const TicketCard = ({ data }: Pick<Data, 'data'>) => {
    const [isOpen, triggerModal] = useToggle(false);

    if (!data || !data.length) {
        return <h1>No Upcoming Events</h1>;
    }

    return (
        <>
            <TicketModal isOpen={isOpen} onClose={triggerModal.off} />
            <div onClick={triggerModal.on} className="flex justify-between mt-10 p-14">
                {data.map((el) => (
                    <div>
                        <h1>{el.name}</h1>
                    </div>
                ))}
            </div>
        </>
    );
};
