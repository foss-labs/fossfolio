import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@app/ui/components/dialog';
import { useAuth } from '@app/hooks';
import { toast } from 'sonner';
import { Input } from '@app/ui/components/input';
import { Button } from '@app/components/ui/Button';
import { useProfileUpdate } from '@app/hooks/api/Profile';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@app/ui/components/select';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@app/ui/components/form';

type IModal = {
    isOpen: boolean;
    onClose: () => void;
};

type Description = 'true' | 'false';

const ProfileSchema = yup.object().shape({
    name: yup.string().required(),
    slug: yup.string().required(),
    description: yup.string(),
    collegeName: yup.string().when('description', {
        is: (val: Description) => Boolean(val),
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
    }),
});

type IProfile = yup.InferType<typeof ProfileSchema>;

export const ProfileModal = ({ isOpen, onClose }: IModal) => {
    const { user } = useAuth();
    const handleProfileUpdates = useProfileUpdate();

    const form = useForm<IProfile>({
        defaultValues: {
            name: user?.displayName,
            slug: user?.slug,
            description: String(user?.isStudent) || '',
            collegeName: user?.collegeName,
        },
    });

    const isCollegeStudent = form.watch('description') === 'true';

    const handleUpdates: SubmitHandler<IProfile> = (data) => {
        const isCollegeStudent = Boolean(data.description);
        handleProfileUpdates.mutate({
            name: data.name,
            slug: data.slug,
            isCollegeStudent,
            collegeName: data.collegeName,
        });
        if (handleProfileUpdates.isSuccess) {
            toast.success('Profile updated successfully');
        }
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[325px] md:w-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleUpdates)}>
                        <DialogHeader>
                            <DialogTitle className="mb-4">Update Profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save once done
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="items-center ">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem className=" items-center">
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="username"
                                                defaultValue={user?.slug}
                                                className="col-span-3"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description about you</FormLabel>

                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="description" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="true">Student</SelectItem>
                                                <SelectItem value="false">Professional</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {isCollegeStudent && (
                                <FormField
                                    control={form.control}
                                    name="collegeName"
                                    render={({ field }) => (
                                        <FormItem className="items-center ">
                                            <FormLabel>College Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="College" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
