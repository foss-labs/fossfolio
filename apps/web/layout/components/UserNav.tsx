import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@app/ui/components/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@app/ui/components/avatar';
import { Button } from '@app/ui/components/button';
import { useAuth, useToggle } from '@app/hooks';
import { ProfileModal } from '@app/views/profile';
import { useLogOut } from '@app/hooks/api/Auth';

export const UserNav = () => {
    const { logOut } = useLogOut();
    const { user } = useAuth();
    const [isOpen, triggerModal] = useToggle(false);
    return (
        <>
            <ProfileModal isOpen={isOpen} onClose={triggerModal.off} />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={user!.photoURL} alt={user?.displayName} />
                            <AvatarFallback>{user?.email}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user?.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onClick={triggerModal.on}
                            className="hover:cursor-pointer"
                        >
                            Profile
                        </DropdownMenuItem>
                        <Link href="/org" className="!hover:cursor-pointer">
                            <DropdownMenuItem className="!hover:cursor-pointer">
                                Organize Events
                            </DropdownMenuItem>
                        </Link>

                        <Link href="/tickets" className="!hover:cursor-pointer">
                            <DropdownMenuItem className="!hover:cursor-pointer">
                                My Tickets
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logOut} className="hover:cursor-pointer">
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
