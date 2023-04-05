import fs from 'fs';
export default defineEventHandler(async (event) => {
  fs.readdir('./temp/products', (err, files) => {
    if(err) console.log(err);
    let limit = 0;
    files.forEach(async (file) => {
      if(limit >= 10) return;
      console.log(file);
      limit++
    });
  });
  return { response: 'ok' }
})