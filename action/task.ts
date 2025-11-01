'use server';

import { TaskFormSchemaData } from '@/components/task-form';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

async function checkSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session) {
    const err = new Error('Unauthorized');
    throw err;
  }

  return session;
}

export async function createTaskAction(data: TaskFormSchemaData) {
  const session = await checkSession();

  await prisma.task.create({
    data: {
      id: crypto.randomUUID(),
      name: data.name,
      userId: session.user.id,
    },
  });

  revalidatePath('/');
}

export async function listTasksAction(payload?: { name?: string; done?: boolean }) {
  const session = await checkSession();

  return prisma.task.findMany({
    where: {
      userId: session.user.id,
      name: payload?.name,
      done: payload?.done ?? false,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export async function countTotalTasksAction(payload?: { done?: boolean }) {
  await checkSession();

  return prisma.task.count({
    where: {
      done: payload?.done ?? false,
    },
  });
}

export async function completeTaskAction(payload: { id: string; done: boolean }) {
  await prisma.task.update({
    where: {
      id: payload.id,
    },
    data: {
      done: payload.done,
    },
  });

  revalidatePath('/');
}

export async function deleteTaskAction(payload: { id: string }) {
  await prisma.task.delete({
    where: {
      id: payload.id,
    },
  });

  revalidatePath('/');
}
