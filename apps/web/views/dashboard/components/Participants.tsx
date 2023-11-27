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
import { User } from '@app/types';
import { Avatar, AvatarFallback, AvatarImage } from '@app/ui/components/avatar';

interface Data {
    data: User[];
}

export const Participants = ({ data }: Data) => {
    const [isModapOpen, toggleModal] = useToggle();
    return (
        <Table className="border-1/4 border-brand-purple-200 rounded-full">
            <DeleteModal isOpen={isModapOpen} onClose={toggleModal.off} />
            <TableHeader className="bg-[#F9FAFB] rounded-lg">
                <TableRow style={{ background: 'white', height: '67px' }}>
                    <TableCell className="font-medium">Participants</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Student / Pro</TableHead>
                    <TableHead>Email address</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((el) => (
                    <TableRow>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={el.photoURL} />
                                <AvatarFallback>photo</AvatarFallback>
                            </Avatar>
                        </TableCell>

                        <TableCell className="font-medium">
                            <h5>{el.displayName}</h5>
                        </TableCell>
                        <TableCell>{el.isStudent ? 'Student' : 'Professional'}</TableCell>
                        <TableCell>{el.email}</TableCell>
                        <TableCell className="text-right" onClick={toggleModal.on}>
                            <AiOutlineDelete className="hover:text-red-500 cursor-pointer text-lg" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
