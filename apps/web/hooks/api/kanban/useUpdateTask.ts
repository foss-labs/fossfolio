import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiHandler } from "@app/config";
import { KanbanResponse } from "@app/hooks/api/kanban/useKanban";
import { useRouter } from "next/router";

const updateTaskKanbanId = async ({
  taskId,
  newKanbanId,
}: {
  taskId: string;
  newKanbanId: string;
}) => {
  await apiHandler.patch(`/events/kanban/tasks/${taskId}`, {
    kanbanId: newKanbanId,
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pk } = router.query;

  return useMutation(updateTaskKanbanId, {
    onMutate: async ({ taskId, newKanbanId }) => {
      const previousKanban = queryClient.getQueryData<KanbanResponse>([
        "event",
        "kanban",
        pk,
      ]);

      queryClient.setQueryData<KanbanResponse>(
        ["event", "kanban", pk],
        // @ts-ignore
        (old: KanbanResponse) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.map((board) => {
              if (board.id === newKanbanId) {
                return {
                  ...board,
                  tasks: [
                    ...board.tasks,
                    {
                      ...board.tasks.find((task) => task.id === taskId),
                      kanbanId: newKanbanId,
                    },
                  ],
                };
              }
              if (board.tasks.find((task) => task.id === taskId)) {
                return {
                  ...board,
                  tasks: board.tasks.filter((task) => task.id !== taskId),
                };
              }
              return board;
            }),
          };
        }
      );

      return { previousKanban };
    },
    onError: (_, __, context: any) => {
      queryClient.setQueryData(["event", "kanban", pk], context.previousKanban);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["event", "kanban", pk]);
    },
  });
};
