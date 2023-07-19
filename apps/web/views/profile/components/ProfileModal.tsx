import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@app/ui/components/dialog';
import { useAuth } from '@app/hooks';
import { Label } from '@app/ui/components/label';
import { Input } from '@app/ui/components/input';
import { Button } from '@app/ui/components/button';
import { useProfileUpdate } from '@app/hooks/api/Profile';

type IModal = {
    isOpen: boolean;
    onClose: () => void;
};

export const ProfileModal = ({ isOpen, onClose }: IModal) => {
    const { user } = useAuth();
    const handleProfileUpdates = useProfileUpdate();
    // TODO
    // MOVE TO HOOK FORM ?
    const [name, setName] = useState<string>(user?.displayName as string);
    const [slug, setSlug] = useState<string>(user?.slug as string);

    const handleUpdates = () => {
        handleProfileUpdates.mutate({
            uid: user?.uid as string,
            name: name,
            slug: slug,
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[325px] md:w-auto">
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
                            onChange={(e) => setName(e.target.value)}
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
                            onChange={(e) => setSlug(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleUpdates}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
