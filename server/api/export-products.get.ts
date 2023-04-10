import fs from 'fs';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const files = fs.readdirSync('./temp/products');
  let limit = 0;
  const obj = {};
  const arr = []
  // const countFolder = Math.round(files.length/10000);
  // for(let i=0;i<countFolder;i++) {
  //   const dir = `./files/products/${i}`;
  //   if (!fs.existsSync(dir)){
  //     fs.mkdirSync(dir, '0744');
  //   }
  // }
  
  const chunkSize = 10000;
  for (let i = 0; i < files.length; i += chunkSize) {
      arr.push(files.slice(i, i + chunkSize));
      // do whatever
  }
  const r = async (currentChunk) => {
    let inFolder = 10000;
    arr[currentChunk].forEach(async (file) => {
      if(limit >= inFolder) {
        inFolder += inFolder;
        console.log('change folder', currentChunk);
      };
      obj[file.split('.')[0]] = `${currentChunk}/${file}`;
      const inStr = fs.createReadStream(`./temp/products/${file}`);
      const outStr = fs.createWriteStream(`./files/products/${currentChunk}/${file}`);
      inStr.pipe(outStr);
      limit++;
    });
    for(let key in obj) {
      try {
        const items = await prisma.items.findMany({
          where: {
            code_vendor: key
          }
        });
        if(items.length > 0 && items[0].id) {
          await prisma.items.update({
            where: {
              id: items[0].id
            },
            data: {
              images: [obj[key]]
            }
          });
        } else {
          console.log(key);
        }
      } catch(err) {
        console.log(err);
      }
    }
    // console.log('END UPDATE IMAGES -> ', currentChunk);
    return;
  }
  // await r(0);
  return { response: 'ok' }
})