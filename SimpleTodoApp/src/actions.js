import { HttpError } from 'wasp/server'

export const createTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Task.create({
    data: {
      description: args.description,
      isDone: false,
      userId: context.user.id
    }
  });
}

export const toggleTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const task = await context.entities.Task.findUnique({
    where: { id: args.id }
  });
  if (task.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Task.update({
    where: { id: args.id },
    data: { isDone: !task.isDone }
  });
}

export const editTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const task = await context.entities.Task.findUnique({
    where: { id: args.id }
  });
  if (task.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Task.update({
    where: { id: args.id },
    data: { description: args.description }
  });
}