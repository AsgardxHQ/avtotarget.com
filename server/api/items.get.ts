import type { QueryPrisma } from '~~/types'
import * as url from "url";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = url.parse(event.req.url as string, true).query;
  const options:QueryPrisma = {
    orderBy: {ts: 'desc'},
  };
  let where = {};
  for(let key in query) {
    switch (key) {
      case "cars_id":
        where[key] = {
          hasEvery: [+query.cars_id],
        }
        break;
      case "part_id": 
      case "supplier_id":
        where[key] = +query[key];
      break;
    }
    // if(key !== 'limit' && key != 'page') {
    //   where[key] = +query[key];
    // }
  }
  options.where = where;
  // options.include = {
  //   part: {},
  //   supplier: {},
  // }
  if(query.page) {
    options.skip = +query.page * +query.limit;
  }
  if(query.limit) options.take = +query.limit;
  const payload = await prisma.$transaction([
    prisma.items.count({
      where: where
    }),
    prisma.items.findMany(options),
    prisma.cars.findMany()
  ]);
  const [count, items, cars] = payload;
  return {items, count, cars};
  // return [];
});