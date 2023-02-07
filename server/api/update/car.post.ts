
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const data:any = await useBody(event);
  const payload:any = {
    name_uk: data.name_uk,
    name_ru: data.name_ru,
  }
  if(data.image) {
    payload.image = data.image
  }
  return new Promise(async (resolve, reject) => {
    try {
      const car = await prisma.cars.update({
        where: {
          id: data.id
        },
        data: payload
      });
      resolve(car); 
    } catch(err) {
      console.log(err);
      reject(err);
    }
  });
})
