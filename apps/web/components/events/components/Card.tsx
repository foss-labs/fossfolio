import { BiLink, BiLocationPlus } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';
import { Button } from '@app/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@app/ui/components/card';
import { OrgEvents } from '@app/types';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import Image from 'next/image';

type DescriptionExcluded = Omit<
    OrgEvents,
    | 'description'
    | 'createdAt'
    | 'isPublished'
    | 'updatedAt'
    | 'isFormPublished'
    | 'form'
    | 'ticketPrice'
>;

interface Prop extends DescriptionExcluded {
    description?: string;
    isOrg?: boolean;
}

export const EventCard = ({
    name,
    description,
    website,
    location,
    lastDate,
    isOrg = false,
    slug,
    coverImage,
}: Prop) => {
    const router = useRouter();

    const goToEventInfo = () => {
        router.push(`/events/${slug}`);
    };
    return (
        <Card className="w-[300px] md:w-25 mt-6 border-solid border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition rounded-sm hover:cursor-pointer">
            <CardHeader className="grid items-start gap-4 space-y-0">
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <div className="flex items-center  rounded-md bg-secondary text-secondary-foreground ">
                    <a href={website} type="_blank">
                        <Button variant="secondary" className="shadow-none">
                            <BiLink className="mr-2 h-4" />
                            <div className="truncate max-w-[220px]">{website}</div>
                        </Button>
                    </a>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex text-sm text-muted-foreground flex-wrap gap-3 w-full">
                    {coverImage && (
                        <Image src={coverImage} width={500} height={300} alt="event banner" />
                    )}
                    <div className="flex items-center">
                        <BiLocationPlus className="mr-1 h-3.5 w-3.5 fill-sky-400 text-sky-400" />
                        {location}
                    </div>

                    {lastDate && (
                        <div className="flex items-center">
                            <BsCalendarDate className="mr-1 h-3 w-3" />
                            Last date: {format(new Date(lastDate), 'dd/MM/yyyy')}
                        </div>
                    )}
                </div>
                {!isOrg ? (
                    <Button
                        variant="outline"
                        className="bg-[#F9F5FF] mt-4 px-5 py-2 rounded-sm text-primary border-1 hover:bg-[#F9F5FF]  border-[1.4px] hover:border-primary"
                        onClick={goToEventInfo}
                    >
                        Apply
                    </Button>
                ) : (
                    <></>
                )}
            </CardContent>
        </Card>
    );
};
