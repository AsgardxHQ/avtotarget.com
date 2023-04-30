import { defineEventHandler } from 'h3';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

new PrismaClient();
const exportProducts_get = defineEventHandler(async (event) => {
  const files = fs.readdirSync("./temp/products");
  const arr = [];
  const chunkSize = 1e4;
  for (let i = 0; i < files.length; i += chunkSize) {
    arr.push(files.slice(i, i + chunkSize));
  }
  return { response: "ok" };
});

export { exportProducts_get as default };
//# sourceMappingURL=export-products.get.mjs.map
