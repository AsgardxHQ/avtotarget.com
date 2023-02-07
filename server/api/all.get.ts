import * as url from "url";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = url.parse(event.req.url as string, true).query;
  const options:any = {};
  if(query.limit) {
    options.take = +query.limit;
  }
  const items = await prisma.items.findMany({
    ...options
  });
  // const cars = await prisma.cars.findMany({
  //   orderBy: {id: 'asc'}
  // });
  // const suppliers = await prisma.suppliers.findMany({orderBy: {id: 'asc'}});
  // const parts = await prisma.parts.findMany({orderBy: {id: 'asc'}});

  return {items};
});