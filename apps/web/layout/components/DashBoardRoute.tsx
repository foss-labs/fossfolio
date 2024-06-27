import { useRouter } from "next/router";
import { IconType } from "react-icons";

export const DashBoardRoute = ({ Icon, name }: Props) => {
  const router = useRouter();

  const { id, eventid } = router.query;
  return (
    <div
      className="font-medium flex text-lg hover:cursor-pointer  justify-center items-center gap-3"
      onClick={() => router.push(`/org/${id}/${eventid}/${name.toLowerCase()}`)}
    >
      <Icon className="mr-2.1" />
      {name}
    </div>
  );
};

interface Props {
  Icon: IconType;
  name: string;
}
