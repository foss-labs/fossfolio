import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@app/ui/components/table';
import { Input } from '@app/ui/components/input';
import { Button } from '@app/ui/components/button';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@app/ui/components/select';
import { toast } from 'sonner';
import { AiOutlineDelete } from 'react-icons/ai';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { apiHandler } from '@app/config';
import { useRouter } from 'next/router';
import { FormField, FormItem, FormControl, FormMessage, Form } from '@app/ui/components/form';
import { useAuth } from '@app/hooks';

enum Roles {
    Admin = 'ADMIN',
    Editor = 'EDITOR',
    Viewer = 'VIEWER',
}

const invite = yup.object().shape({
    email: yup.string().email(),
    role: yup.mixed<Roles>().oneOf(Object.values(Roles)).required(),
});

type Invite = yup.InferType<typeof invite>;

export const Members = () => {
    const form = useForm<Invite>({
        mode: 'onChange',
        resolver: yupResolver(invite),
        defaultValues: {
            email: '',
            role: Roles.Viewer,
        },
    });

    const router = useRouter();

    const sendEmailInvite: SubmitHandler<Invite> = async (data) => {
        try {
            await apiHandler.post('/org/invite', {
                email: data.email,
                organizationId: router.query?.id,
                role: data.role,
            });
            toast.success('Email was sent');
            form.reset();
        } catch {
            toast.error('Couldnt send email please try again later');
        }
    };

    return (
        <div className="p-none md:p-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(sendEmailInvite)}>
                    <div className="flex gap-2 justify-end items-center mb-10">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter the email to send invite"
                                            {...field}
                                            className="w-60"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={Roles.Admin}>Admin</SelectItem>
                                            <SelectItem value={Roles.Editor}>editor</SelectItem>
                                            <SelectItem value={Roles.Viewer}>viewer</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Send Invite</Button>
                    </div>
                </form>
            </Form>
            <Table className="border-2 border-[#E9D7FE] rounded-full">
                <TableHeader className="bg-[#F9FAFB] rounded-lg">
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
                                <SelectTrigger className="w-44">
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
                            <AiOutlineDelete className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">
                            <h5>sreehari jayaraj</h5>
                        </TableCell>
                        <TableCell>sreeharivijaya2003@gmail.com</TableCell>
                        <TableCell>
                            <Select>
                                <SelectTrigger className="w-44">
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
                            <AiOutlineDelete className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">
                            <h5>sreehari jayaraj</h5>
                        </TableCell>
                        <TableCell>sreeharivijaya2003@gmail.com</TableCell>
                        <TableCell>
                            <Select>
                                <SelectTrigger className="w-44">
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
                            <AiOutlineDelete className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">
                            <h5>sreehari jayaraj</h5>
                        </TableCell>
                        <TableCell>sreeharivijaya2003@gmail.com</TableCell>
                        <TableCell>
                            <Select>
                                <SelectTrigger className="w-44">
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
                            <AiOutlineDelete className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
