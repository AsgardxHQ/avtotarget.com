import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// async function setUser(payload) {
//   await prisma.users.create({
//     data: payload,
//   });
// }

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  await prisma.$transaction(
    body.map((item) =>
      prisma.items.upsert({
        where: { id: item.id },
        update: { 
            carsId: item.carsId,
            suppliersId: item.suppliersId,
            partsId: item.partsId
        },
        create: item
      })
    )
  );
//   await prisma.items.updateMany({
//     data: body
//   });
  
  return { response: 'ok' }
})