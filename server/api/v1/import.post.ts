import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { updateItems } = await useBody(event);
  console.log('START IMPORT');
  // const payload = await prisma.$transaction([
  //   prisma.filters.createMany(suppliers),
  //   prisma.filters.createMany(parts),
  //   prisma.categories.createMany(cars)
  // ]);
  
  await prisma.items.createMany({
    data: updateItems
  });
  // await prisma.$transaction(
  //   newItems.map((item) => 
  //     prisma.items.update({
  //       where: {
  //         id: item.id
  //       },
  //       data: {
  //         category_id: item.category_id
  //       }
  //     })
  //   ),
  //   // parts.map((part) =>
  //   //   prisma.filters.create({
  //   //     data: part
  //   //   })
  //   // ),
  //   suppliers.map((sup) => 
  //     prisma.filters.create({
  //       data: sup
  //     })
  //   )
  // )
  console.log('END IMPORT');
//   const data = await prisma.categories.create({
//     data: body
//   });
  
  return {result: 'ok'};
})