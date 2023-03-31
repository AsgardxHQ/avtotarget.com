import { defineEventHandler, useBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const _import = defineEventHandler(async (event) => {
  const body = await useBody(event);
  console.log("IMPORT request");
  await prisma.items.createMany({
    data: body
  });
  return JSON.stringify({ result: "ok" });
});

export { _import as default };
//# sourceMappingURL=import.mjs.map
