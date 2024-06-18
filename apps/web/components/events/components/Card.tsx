import { BiLink, BiLocationPlus } from "react-icons/bi";
import { Button } from "@app/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@app/ui/components/card";
import { OrgEvents } from "@app/types";
import { format } from "date-fns";
import { useRouter } from "next/router";
import Image from "next/image";

type DescriptionExcluded = Omit<
  OrgEvents,
  | "description"
  | "created_at"
  | "is_published"
  | "updatedAt"
  | "fk_organization_id"
  | "updated_at"
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
  isOrg = false,
  slug,
  cover_image,
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
          {cover_image && (
            <div className="image-container w-10 h-10">
              <Image
                src={cover_image}
                alt="event banner"
                fill={true}
                objectFit="contain"
              />
            </div>
          )}
          <div className="flex items-center">
            <BiLocationPlus className="mr-1 h-3.5 w-3.5 fill-sky-400 text-sky-400" />
            {location}
          </div>
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
