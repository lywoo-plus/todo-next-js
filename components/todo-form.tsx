'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from './ui/button';
import { Field, FieldError, FieldGroup } from './ui/field';
import { Input } from './ui/input';

const formSchema = z.object({
  taskName: z.string().min(1, 'Task name is required'),
});

export default function TodoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // TODO: implement add new task
      toast.success('Task added successfully');
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Card className="w-96 mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl">Task</CardTitle>
        <CardDescription>New task can be added here</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="todo-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="taskName"
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
            disabled={form.formState.isSubmitting}
            type="submit"
            form="todo-form"
            className="cursor-pointer bg-blue-500 hover:bg-blue-400"
          >
            {form.formState.isSubmitting ? 'Loading' : 'Add'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
