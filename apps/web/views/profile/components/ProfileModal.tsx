import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@app/ui/components/dialog';
import { useAuth } from '@app/hooks';
import { toast } from "sonner"
import { Label } from '@app/ui/components/label';
import { Input } from '@app/ui/components/input';
import { Button } from '@app/components/ui';
import { useProfileUpdate } from '@app/hooks/api/Profile';
import * as yup from "yup"
import { useForm, SubmitHandler } from 'react-hook-form';


type IModal = {
    isOpen: boolean;
    onClose: () => void;
};

const ProfileSchema = yup.object().shape({
    name: yup.string().required(),
    slug: yup.string().required()
})

type IProfile = yup.InferType<typeof ProfileSchema>

export const ProfileModal = ({ isOpen, onClose }: IModal) => {
    const { user } = useAuth();
    const handleProfileUpdates = useProfileUpdate();

    const { register, handleSubmit, formState: { errors } } = useForm<IProfile>({
        defaultValues: {
            name: user?.displayName,
            slug: user?.slug
        }
    })


    const handleUpdates: SubmitHandler<IProfile> = (data) => {
        handleProfileUpdates.mutate({
            name: data.name,
            slug: data.slug,
        });
        if (handleProfileUpdates.isSuccess) {
            toast.success(
                'Profile updated successfully',
            );
        }
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[325px] md:w-auto">
                <form onSubmit={handleSubmit(handleUpdates)}>
                    <DialogHeader>
                        <DialogTitle className="mb-4">Update Profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save once done
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue={user?.displayName}
                                className="col-span-3"
                                {...register("name")}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                defaultValue={user?.slug}
                                className="col-span-3"
                                {...register("slug")}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" isLoading={handleProfileUpdates.isLoading}>Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
