'use client';

import { createTaskAction } from '@/action/task';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from './ui/button';
import { Field, FieldError, FieldGroup } from './ui/field';
import { Input } from './ui/input';

export const taskFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type TaskFormSchemaData = z.infer<typeof taskFormSchema>;

export default function TaskForm() {
  const form = useForm<TaskFormSchemaData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(data: TaskFormSchemaData) {
    try {
      await createTaskAction(data);
      form.reset();
      toast.success('Task added successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);

        if (error.message === 'Unauthorized') {
          toast.error(error.message);
          redirect('/sign-in');
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Task</CardTitle>
        <CardDescription>New task can be added here</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="todo-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Task name"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal" className=" justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="cursor-pointer"
          >
            Reset
          </Button>
          <Button
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            type="submit"
            form="todo-form"
            className="cursor-pointer bg-green-600 hover:bg-green-400"
          >
            {form.formState.isSubmitting ? 'Loading' : 'Add'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
