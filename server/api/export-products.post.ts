import fs from 'fs';
import { utils, writeFile } from 'xlsx';
export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const worksheet = utils.json_to_sheet(body.data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Dates");
  writeFile(workbook, './temp/exportProducts.xlsx');
  // fs.writeFile('./temp/test.xlsx', JSON.stringify(newData), (e) => {
  //   console.log(e)
  // });
  return { response: 'ok' }
})