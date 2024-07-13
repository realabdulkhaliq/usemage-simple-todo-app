import { HttpError } from 'wasp/server'

export const getTasks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Task.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getUser = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.User.findUnique({
    where: { id: context.user.id }
  });
}