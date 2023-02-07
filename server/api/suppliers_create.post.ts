import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await useBody(event);
    await prisma.suppliers.createMany({
      data: body
    });
    
    return { response: 'ok' }
});