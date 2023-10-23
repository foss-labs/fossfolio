import { useToggle } from '@app/hooks';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@app/ui/components/table';
import { DeleteModal } from './DeleteModal';
import { AiOutlineDelete } from 'react-icons/ai';

export const Participants = () => {
    const [isModapOpen, toggleModal] = useToggle();
    return (
        <Table className="border-1/4 border-brand-purple-200 rounded-full">
            <DeleteModal isOpen={isModapOpen} onClose={toggleModal.off} />
            <TableHeader className="bg-[#F9FAFB] rounded-lg">
                <TableRow style={{ background: 'white', height: '67px' }}>
                    <TableCell className="font-medium">Participants</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Student / Pro</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email address</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">
                        <h5>sreehari jayaraj</h5>
                    </TableCell>
                    <TableCell>Student</TableCell>
                    <TableCell>9745644798</TableCell>
                    <TableCell>sreeharivijaya2003@gmail.com</TableCell>
                    <TableCell className="text-right" onClick={toggleModal.on}>
                        <AiOutlineDelete className="hover:text-red-500 cursor-pointer text-lg" />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};
