import { defineEventHandler, readBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const sign_in_post = defineEventHandler(async (event) => {
  const data = await readBody(event);
  const user = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${data.email} AND password = ${data.password}`;
  if (user.length > 0) {
    const u = user[0];
    delete u.password;
    useCookie("auth", u);
    return true;
  } else {
    return false;
  }
});

export { sign_in_post as default };
//# sourceMappingURL=sign_in.post.mjs.map
