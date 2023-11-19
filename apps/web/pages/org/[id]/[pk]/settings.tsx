import { DashboardLayout } from '@app/layout';
import { Calendar } from '@app/ui/components/calendar';
import { DialogHeader, DialogFooter } from '@app/ui/components/dialog';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@app/ui/components/form';
import { Input } from '@app/ui/components/input';
import { cn } from '@app/ui/lib/utils';
import { EventSchema, IProfile } from '@app/views/dashboard';
import { Popover, PopoverTrigger, PopoverContent } from '@app/ui/components/popover';
import { format } from 'date-fns';
import { Button } from '@app/components/ui/Button';
import { useForm } from 'react-hook-form';
import { useEvent } from '@app/hooks/api/Events';
import { RiLoaderFill } from 'react-icons/ri';

const Settings = () => {
    const { data, isLoading } = useEvent('org');
    const form = useForm<IProfile>({
        defaultValues: {
            eventDate: data?.data.eventDate,
            lastDate: data?.data.lastDate,
            maxTicketCount: data?.data.maxTickerCount,
        },
    });

    const handleUpdates = () => {};
    return (
        <div className="flex flex-col justify-center w-full ml-10">
            <h2 className="self-start  text-3xl mt-8 mb-5 font-medium">
                Event Information & Settings
            </h2>
            {isLoading ? (
                <div className="h-[90vh]  flex items-center justify-center">
                    <RiLoaderFill className="animate-spin h-8 w-8" />
                </div>
            ) : (
                <div className="w-[450px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleUpdates)}>
                            <div className="grid gap-4 py-4">
                                <FormField
                                    control={form.control}
                                    name="maxTicketCount"
                                    render={({ field }) => (
                                        <FormItem className="items-center ">
                                            <FormLabel>Maximum Ticket Count</FormLabel>
                                            <FormControl>
                                                <Input placeholder="0" {...field} type="number" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastDate"
                                    render={({ field }) => (
                                        <FormItem className="items-start flex flex-col">
                                            <FormLabel>Registration end date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                'w-full  text-start font-normal text-black',
                                                                !field.value &&
                                                                    'text-muted-foreground',
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, 'PPP')
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 bg-white shadow-md">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="eventDate"
                                    render={({ field }) => (
                                        <FormItem className="items-start flex flex-col">
                                            <FormLabel>Event Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                'w-full  text-start font-normal text-black',
                                                                !field.value &&
                                                                    'text-muted-foreground',
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, 'PPP')
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 bg-white shadow-md">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </div>
            )}
        </div>
    );
};

Settings.Layout = DashboardLayout;
Settings.RequireAuth = true;
export default Settings;
