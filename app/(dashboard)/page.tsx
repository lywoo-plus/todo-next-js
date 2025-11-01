import { listTasksAction } from '@/action/task';
import TaskForm from '@/components/task-form';
import TaskListCard from '@/components/task-list-card';

export default function Home() {
  return (
    <div className="mx-auto grid grid-cols-1 p-8 md:grid-cols-3 2xl:container gap-6">
      <div>
        <TaskForm />
      </div>

      <TaskListCard
        varaint="todo"
        title="Todo Tasks"
        description="Todo tasks will be listed here"
        action={() => listTasksAction({ done: false })}
      />

      <TaskListCard
        varaint="completed"
        title="Completed Tasks"
        description="Completed tasks will be listed here"
        action={() => listTasksAction({ done: true })}
      />
    </div>
  );
}
