import { defineEventHandler, useBody } from 'h3';
import { utils, writeFile } from 'xlsx';

const exportProducts_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const worksheet = utils.json_to_sheet(body.data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Dates");
  writeFile(workbook, "./temp/exportProducts.xlsx");
  return { response: "ok" };
});

export { exportProducts_post as default };
//# sourceMappingURL=export-products.post.mjs.map
