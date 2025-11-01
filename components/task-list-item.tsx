'use client';

import { completeTaskAction, deleteTaskAction } from '@/action/task';
import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemTitle } from '@/components/ui/item';
import { Task } from '@prisma/client';
import { useRequest } from 'ahooks';
import { CheckCircleIcon, PencilIcon, UndoIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Spinner } from './ui/spinner';

export function TaskListItem(props: Pick<Task, 'id' | 'name' | 'done'>) {
  const { loading: isCompletingTask, run: completeTask } = useRequest(
    (value: Pick<Task, 'id' | 'done'>) => completeTaskAction(value),
    {
      manual: true,
      onSuccess: () => {
        toast.success(`Task ${props.done ? 'undid' : 'completed'} successfully`);
      },
    }
  );

  const { loading: isDeletingTask, run: deleteTask } = useRequest(
    (value: Pick<Task, 'id'>) => deleteTaskAction(value),
    {
      manual: true,
      onSuccess: () => {
        toast.success(`Task deleted successfully`);
      },
    }
  );

  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>{props.name}</ItemTitle>
        </ItemContent>

        {isCompletingTask || isDeletingTask ? (
          <Spinner />
        ) : (
          <ItemActions>
            {!props.done && (
              <>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className="bg-red-500 rounded-full"
                  onClick={() => deleteTask({ id: props.id })}
                >
                  <XIcon className="size-4" />
                </Button>

                <Button size="icon-sm" variant="ghost" className="bg-yellow-500 rounded-full">
                  <PencilIcon className="size-4" />
                </Button>
              </>
            )}

            {props.done ? (
              <Button
                size="icon-sm"
                variant="ghost"
                className="bg-orange-500 rounded-full"
                onClick={() =>
                  completeTask({
                    id: props.id,
                    done: false,
                  })
                }
              >
                <UndoIcon className="size-4" />
              </Button>
            ) : (
              <Button
                size="icon-sm"
                variant="ghost"
                className="bg-green-500 rounded-full"
                onClick={() =>
                  completeTask({
                    id: props.id,
                    done: true,
                  })
                }
              >
                <CheckCircleIcon />
              </Button>
            )}
          </ItemActions>
        )}
      </Item>
    </div>
  );
}
