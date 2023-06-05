import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const data:any = await readBody(event);
  return new Promise(async (resolve, reject) => {
    try {
      const id = data.id;
      delete data.id;
      const order = await prisma.orders.update({
        where: {
          id: id
        },
        data: data
      });
      resolve(order); 
    } catch(err) {
      console.log(err);
      reject(err);
    }
  });
})
