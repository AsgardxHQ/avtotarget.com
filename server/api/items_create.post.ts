import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// async function setUser(payload) {
//   await prisma.users.create({
//     data: payload,
//   });
// }

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  await prisma.items.createMany({
    data: body
  });
  
  return { response: 'ok' }
})