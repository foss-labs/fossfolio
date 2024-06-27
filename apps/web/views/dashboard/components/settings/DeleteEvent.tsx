import { Button } from "@app/components/ui/Button";
import { useRoles } from "@app/hooks";
import { Card, CardContent } from "@app/ui/components/card";

interface DeleteEvent {
  deleteEvent: () => Promise<void>;
  isLoading: boolean;
}

export const DeleteEvent = ({ deleteEvent, isLoading }: DeleteEvent) => {
  const { canDeleteEvent } = useRoles();

  if (canDeleteEvent) {
    return (
      <Card className="border-2 border-[red] max-w-2xl">
        <CardContent className="pt-6 ">
          <div className="space-y-2">
            <p>Deleting the Events will delete its all data</p>
            <Button
              className="!bg-[red] !hover:bg-[#ff0000c2]"
              onClick={deleteEvent}
              isLoading={isLoading}
            >
              Delete Event
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
