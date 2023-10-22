import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@app/ui/components/dialog';
import { Button } from '@app/ui/components/button';
import { Input } from '@app/ui/components/input';
import { apiHandler } from '@app/config';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@app/ui/components/form';
import { toast } from 'sonner';
import { useRouter } from 'next/router';

// TODO - DEFINE THE TYPE OF REFETCH
type IModal = {
    isOpen: boolean;
    onClose: () => void;
    refetch: any;
};

const Schema = yup.object().shape({
    name: yup.string().required().min(3),
    website: yup.string().url().required(),
    location: yup.string().required(),
    lastDate: yup.string().required(),
});

type ISchema = yup.InferType<typeof Schema>;

export const NewEventDialog = ({ isOpen, onClose, refetch }: IModal) => {
    const router = useRouter();

    const form = useForm<ISchema>({
        mode: 'onSubmit',
        resolver: yupResolver(Schema),
        defaultValues: {
            website: '',
            name: '',
            lastDate: Date(),
            location: '',
        },
    });

    /* 
    generate a new event , doing this here to create unique id to route into
    only after publishing the event public can access the event 
    */
    const onUserSubMit: SubmitHandler<ISchema> = async (val) => {
        const { id } = router.query;
        const payload = {
            ...val,
            organizationId: id,
        };
        try {
            await apiHandler.post('/events/create', payload);
            // create new event
            onClose();
        } catch {
            toast.error('Couldnt create event , please try again later');
        } finally {
            refetch();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[400px] md:w-md-auto">
                <DialogHeader>
                    <DialogTitle className="mb-4">New Event</DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onUserSubMit)}>
                                <div className="flex flex-col gap-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="event name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="website"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Website</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="website link" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Location</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="location" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="lastDate"
                                                        {...field}
                                                        type="date"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-3 mt-4">
                                    <Button
                                        type="submit"
                                        disabled={form.formState.isSubmitting ? true : false}
                                        className="bg-primary px-5 py-2 rounded-md text-white  hover:bg-brand-pink-100  border-[1.4px] hover:border-primary hover:text-primary"
                                    >
                                        {form.formState.isSubmitting ? '...' : 'Create Event'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
