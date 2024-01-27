import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';
import { AiOutlineDelete } from 'react-icons/ai';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { DeleteMemModal } from './DeleteMemModal';
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
import { Button } from '@app/components/ui/Button';
import { useMembers } from '@app/hooks/api/org';
import { apiHandler } from '@app/config';
import { useAuth, useRoles, useToggle } from '@app/hooks';
import * as yup from 'yup';
import { isProd } from '@app/utils';
import { RiLoaderFill } from 'react-icons/ri';

enum Roles {
    Admin = 'ADMIN',
    Editor = 'EDITOR',
    Viewer = 'VIEWER',
}

type IProp = {
    setLink: React.Dispatch<string>;
    onInviteModal: VoidFunction;
};

const invite = yup.object().shape({
    email: yup.string().email().required(),
    role: yup.mixed<Roles>().oneOf(Object.values(Roles)).required(),
});

type Invite = yup.InferType<typeof invite>;

export const Members = ({ setLink, onInviteModal }: IProp) => {
    const { canRemoveOrgUser, canSendInvite } = useRoles();
    const [isOpen, triggerModal] = useToggle(false);
    const form = useForm<Invite>({
        mode: 'onChange',
        resolver: yupResolver(invite),
        defaultValues: {
            email: '',
            role: Roles.Viewer,
        },
    });

    const { data, isLoading } = useMembers();
    const router = useRouter();

    const sendEmailInvite: SubmitHandler<Invite> = async (data) => {
        try {
            const { data: response } = await apiHandler.post('/org/invite', {
                email: data.email,
                organizationId: router.query?.id,
                role: data.role,
            });
            /* 
            in DEV setup we dont send email
            so instead  a modal open with the invite link
            */
            if (!isProd) {
                onInviteModal();
                setLink(response.data);
            }

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
                    <div className="flex gap-2 justify-end items-center mb-10 flex-wrap">
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
            {isLoading ? (
                <div className="h-[50vh] flex justify-center items-center">
                    <RiLoaderFill className="animate-spin h-8 w-8" />
                </div>
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
                                    <Select disabled={!canSendInvite}>
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
                                {canRemoveOrgUser && (
                                    <TableCell className="text-right">
                                        {el.role !== Roles.Admin && (
                                            <AiOutlineDelete
                                                className="hover:text-[red] cursor-pointer text-lg"
                                                onClick={triggerModal.on}
                                            />
                                        )}
                                        <DeleteMemModal
                                            isOpen={isOpen}
                                            onClose={triggerModal.off}
                                        />
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};
