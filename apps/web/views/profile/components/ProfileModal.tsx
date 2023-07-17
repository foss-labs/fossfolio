import { apiHandler } from '@app/config';
import { useAuth } from '@app/hooks';
import { Button } from '@app/ui/components/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@app/ui/components/dialog';
import { Input } from '@app/ui/components/input';
import { Label } from '@app/ui/components/label';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

type IModal = {
    isOpen: boolean;
    onClose: () => void;
};

export const ProfileModal = ({ isOpen, onClose }: IModal) => {
    const { user, setUser } = useAuth();
    const [name, setName] = useState(user?.displayName);
    const [slug, setSlug] = useState(user?.slug);

    const updateProfile = async () => {
        try {
            const { data } = await apiHandler.patch('/user', {
                displayName: name,
                slug: slug,
                uid: user?.uid,
            });
            setUser(data);
        } catch (err) {
            console.log(err);
        } finally {
            onClose();
        }
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
                    <Button onClick={updateProfile}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
