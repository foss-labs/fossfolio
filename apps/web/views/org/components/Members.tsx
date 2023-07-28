import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@app/ui/components/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@app/ui/components/select';
import { AiOutlineDelete } from 'react-icons/ai';

export const Members = () => {
    return (
        <div className="px-[100px] mt-10">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">
                            <h5>sreehari jayaraj</h5>
                        </TableCell>
                        <TableCell>sreeharivijaya2003@gmail.com</TableCell>
                        <TableCell>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Admin</SelectItem>
                                    <SelectItem value="dark">viewer</SelectItem>
                                    <SelectItem value="system">editor</SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell className="text-right">
                            <AiOutlineDelete className="hover:cursor-pointer text-lg " />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
