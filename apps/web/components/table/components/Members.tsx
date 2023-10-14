import React, { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';
import { AiOutlineDelete } from 'react-icons/ai';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
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
import { FormField, FormItem, FormControl, FormMessage, Form } from '@app/ui/components/form';
import { Input } from '@app/ui/components/input';
import { Button } from '@app/ui/components/button';
import { useMembers } from '@app/hooks/api/org';
import { apiHandler } from '@app/config';
import { useAuth } from '@app/hooks';
import * as yup from 'yup';

enum Roles {
    Admin = 'ADMIN',
    Editor = 'EDITOR',
    Viewer = 'VIEWER',
}

const invite = yup.object().shape({
    email: yup.string().email().required(),
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

    const { data, isLoading } = useMembers();
    const { user } = useAuth();
    const router = useRouter();

    // only admin or editor can change members rule
    const isEditorOrAdmin = useMemo(() => {
        return (
            data?.find((el) => el.user.email === user?.email)?.role === 'ADMIN' ||
            data?.find((el) => el.user.email === user?.email)?.role === 'EDITOR'
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

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
                        <div>
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
                                        <FormMessage className="text-xs text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>

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
            {isLoading ? (
                <h1>Loading</h1>
            ) : (
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
                        {data?.map((el) => (
                            <TableRow key={el.user.uid}>
                                <TableCell className="font-medium">
                                    <h5>{el.user.slug}</h5>
                                </TableCell>
                                <TableCell>{el.user.email}</TableCell>
                                <TableCell>
                                    <Select disabled={!isEditorOrAdmin}>
                                        <SelectTrigger className="w-44">
                                            <SelectValue placeholder={el.role} />
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
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};
