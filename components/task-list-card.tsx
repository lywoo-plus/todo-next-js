import { countTotalTasksAction } from '@/action/task';
import { Task } from '@prisma/client';
import { Suspense } from 'react';
import { TaskListItem } from './task-list-item';
import TaskLoading from './task-loading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';

type Props = {
  title: string;
  description: string;
  varaint: 'todo' | 'completed';
  action: () => Promise<Task[]>;
};

export default function TaskListCard(props: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 h-full">
        <Input placeholder="Search..." />

        <Suspense fallback={<TaskLoading />}>
          <TodoTasks {...props} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

async function TodoTasks(props: Pick<Props, 'varaint' | 'action'>) {
  const [tasks, todoTasksCount] = await Promise.all([
    await props.action(),
    await countTotalTasksAction({ done: false }),
  ]);

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        props.varaint === 'todo' ? (
          <div className="flex flex-col items-center gap-4 p-4">
            <span className="text-9xl">😂</span>
            <p className="font-medium">Lucky me! No tasks to do!</p>
          </div>
        ) : todoTasksCount === 0 ? (
          <div className="flex flex-col items-center gap-4 p-4">
            <span className="text-9xl">🥳</span>
            <p className="font-medium">All tasks completed!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 p-4">
            <span className="text-9xl">📋</span>
            <p className="font-medium">{todoTasksCount} tasks to be completed!</p>
          </div>
        )
      ) : (
        tasks.map((todo) => <TaskListItem key={todo.id} {...todo} />)
      )}
    </div>
  );
}
