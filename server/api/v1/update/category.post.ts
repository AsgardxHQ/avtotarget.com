import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const data:any = await useBody(event);
  return new Promise(async (resolve, reject) => {
    try {
      const id = data.id;
      delete data.id;
      const item = await prisma.categories.update({
        where: {
          id: id
        },
        data: data
      });
      resolve(item); 
    } catch(err) {
      console.log(err);
      reject(err);
    }
  });
})
