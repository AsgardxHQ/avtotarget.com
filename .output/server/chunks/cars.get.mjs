import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const cars_get = defineEventHandler(async (event) => {
  const cars = await prisma.cars.findMany({
    orderBy: { id: "desc" }
  });
  return JSON.stringify(cars);
});

export { cars_get as default };
//# sourceMappingURL=cars.get.mjs.map
