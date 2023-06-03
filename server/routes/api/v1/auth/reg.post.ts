import { getUserByEmail } from '~~/server/models/user'
import { hash } from '~~/server/utils/password'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);
    const user = await getUserByEmail(email);
    if(!user) {
      const pswd = await hash(password);
      await prisma.users.create({
        data: {
          email,
          password: pswd
        }
      });
      return JSON.stringify({result: 'ok'});
    } else {
      return createError({
        statusCode: 401,
        message: 'Этот email занят',
      })
    }
});