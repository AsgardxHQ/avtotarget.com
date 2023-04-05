import { defineEventHandler } from 'h3';
import fs from 'fs';

const exportProducts_get = defineEventHandler(async (event) => {
  fs.readdir("./temp/products", (err, files) => {
    if (err)
      console.log(err);
    let limit = 0;
    files.forEach(async (file) => {
      if (limit >= 10)
        return;
      console.log(file);
      limit++;
    });
  });
  return { response: "ok" };
});

export { exportProducts_get as default };
//# sourceMappingURL=export-products.get.mjs.map
