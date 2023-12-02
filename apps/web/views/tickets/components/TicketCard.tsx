import React from 'react';
import { useToggle } from '@app/hooks/useToggle';
import { TicketModal } from '@app/views/tickets';

export const TicketCard = () => {
    const [isOpen, triggerModal] = useToggle(false);
    return (
        <>
            <TicketModal isOpen={isOpen} onClose={triggerModal.off} />
            <div onClick={triggerModal.on} className="flex justify-between mt-10 p-14">
                {[1, 2, 3].map((cardIndex) => (
                    <div
                        key={cardIndex}
                        className="flex flex-col justify-between w-[300px] h-[150px] bg-gray-200 p-3 rounded-sm hover:cursor-pointer shadow-md"
                    >
                        Ticket
                    </div>
                ))}
            </div>
        </>
    );
};
