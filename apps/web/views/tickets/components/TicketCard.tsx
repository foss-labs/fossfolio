import { useToggle } from '@app/hooks/useToggle';
import { TicketModal } from '@app/views/tickets';
import { Button } from '@app/components/ui/Button';
import Link from 'next/link';
import type { Data } from '@app/hooks/api/user/useTickets';

interface Prop extends Pick<Data, 'data'> {
    type: 'Upcoming' | 'Archived';
}

export const TicketCard = ({ data, type }: Prop) => {
    const [isOpen, triggerModal] = useToggle(false);

    if (!data || !data.length) {
        return (
            <div className="flex justify-center items-center h-[650px] flex-col gap-5">
                {type === 'Upcoming' && <h1 className="text-xl font-light">No Upcoming Events</h1>}
                {type === 'Archived' && <h1 className="text-xl font-light">No Archived Events</h1>}
                <Link href="/events">
                    <Button variant="outline">But tickets</Button>
                </Link>
            </div>
        );
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
