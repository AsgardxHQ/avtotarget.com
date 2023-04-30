import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const data = await readBody(event)
  const user:Array<any> = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${data.email} AND password = ${data.password}`;
  if(user.length > 0) {
    const u = user[0];
    delete u.password;
    useCookie('auth', u);
    return true;
  } else {
    return false;
  }
});