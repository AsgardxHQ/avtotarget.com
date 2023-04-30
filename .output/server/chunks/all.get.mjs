import { defineEventHandler } from 'h3';
import * as url from 'url';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const all_get = defineEventHandler(async (event) => {
  const query = url.parse(event.req.url, true).query;
  const options = {};
  if (query.limit) {
    options.take = +query.limit;
  }
  const items = await prisma.items.findMany({
    ...options
  });
  return { items };
});

export { all_get as default };
//# sourceMappingURL=all.get.mjs.map
