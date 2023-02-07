import { readdir, readFile } from "fs/promises";
import { DOMParser } from '@xmldom/xmldom'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

let formatedCategories = [];
let formatedSuppliers = {};
let formatedCars = [];
const processData = async (content:string):Promise<any> => {
  // let xmlData = null, xmlCategories = null;
  // const categoriesDB = await prisma.categories.findMany({});
  // const suppliersDB = await prisma.filters.findMany({
  //   where: {
  //     parent_id: 3
  //   }
  // });
  // const carsDB = await prisma.filters.findMany({
  //   where: {
  //     parent_id: 2
  //   }
  // });
  const filters = await prisma.filters.findMany({});
  console.log('READING CONTENT');
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "application/xml");
  // if(categoriesDB.length === 0) {
  //   const categories = doc.getElementsByTagName('category');
  //   for(let key in categories) {
  //     if(typeof categories[key].getAttribute === 'function') {
  //       formatedCategories.push({
  //         id: +categories[key].getAttribute('id'),
  //         parent_id: +categories[key].getAttribute('parentId'),
  //         name_uk: categories[key].getAttribute('nameUA'),
  //         name_ru: categories[key].getAttribute('name'),
  //         url: "",
  //         image: "",
  //         position: 0,
  //         fields: "",
  //         ts: undefined,
  //         status: 1,
  //         filter_id: []
  //       })
  //     }
  //   }
  //   console.log('INSERT CATEGORIES', formatedCategories.length);
  //   await prisma.categories.createMany({
  //     data: formatedCategories
  //   });
  // }
  const offers = doc.getElementsByTagName('offer');
  const supp = offers[0].getElementsByTagName('crosses');
  const cars = offers[0].getElementsByTagName('car');
  const params = offers[0].getElementsByTagName('param');
  const filters_id = [];
  const paramsArr = [];
  for(let key in supp) {
    if(typeof supp[key].getAttribute === 'function') {
      if(supp[key].getAttribute('article')) {
        filters_id.push(supp[key].getAttribute('article'));
      }
    }
  }
  for(let key in cars) {
    if(typeof cars[key].getAttribute === 'function') {
      if(cars[key].getAttribute('model')) {
        filters_id.push(cars[key].getAttribute('model'));
      }
    }
  }
  for(let key in params) {
    if(typeof params[key].getAttribute === 'function') {
      paramsArr.push({
        key: params[key].getAttribute('name'),
        value: params[key].getAttribute('text')
      })
    }
  }
  const items = [];
  for(let key in offers) {
     const analogs = [];
    if(typeof offers[key].getElementsByTagName === 'function') {
      const anal = offers[key].getElementsByTagName('analog');
      for(let i=0;i<anal.length;i++) {
        analogs.push(anal[i].getAttribute('id'));
      }
      items.push({
        name_uk: offers[key].getElementsByTagName('name_ua')[0].textContent,
        name_ru: offers[key].getElementsByTagName('name')[0].textContent,
        url: '',
        images: [offers[key].getElementsByTagName('picture')[0].textContent],
        code_wholesale: '',
        code_vendor: offers[key].getElementsByTagName('vendorCode')[0].textContent.split('-')[0],
        price_retail: +offers[0].getElementsByTagName('price')[0].textContent * 100,
        remains: 9999,
        status: 1,
        fields: {
          provider: 'Omega',
          description_uk: offers[key].getElementsByTagName('description')[0].textContent,
          description_ru: offers[key].getElementsByTagName('description_ua')[0].textContent,
          params: paramsArr,
          keywords: offers[key].getElementsByTagName('keywords')[0].textContent
        },
        category_id: +offers[key].getElementsByTagName('categoryId')[0].textContent,
        filters_id: filters_id,
        analogs: analogs
      })
    }
  }
  // if(carsDB.length === 0) {
  //   const cars = doc.getElementsByTagName('car');
  //   for(let key in cars) {
  //     if(typeof cars[key].getAttribute === 'function') {
  //       if(!formatedCars.find(f => f.name_uk === cars[key].getAttribute('model'))) {
  //         formatedCars.push({
  //           parent_id: carsDB.find(f => f.name_uk === cars[key].getAttribute('brand')).id,
  //           name_uk: cars[key].getAttribute('model'),
  //           name_ru: cars[key].getAttribute('model'),
  //           image: '',
  //           status: 1,
  //         });
  //       }
  //     }
  //   }
  //   console.log('INSERT MODEL', formatedCars.length);
  //   await prisma.filters.createMany({
  //     data: formatedCars
  //   });
  // }
  // const suppliers = doc.getElementsByTagName('cross');
  // for(let key in suppliers) {
  //   if(typeof suppliers[key].getAttribute === 'function') {
  //     if(!formatedSuppliers[suppliers[key].getAttribute('brand')]) formatedSuppliers[suppliers[key].getAttribute('brand')] = []; 
  //     formatedSuppliers[suppliers[key].getAttribute('brand')].push(suppliers[key].getAttribute('article'));
  //   }
  // }
  // const suppArr = [];
  // for(let key in formatedSuppliers) {
  //   suppArr.push({
  //     parent_id: 3,
  //     name_uk: key,
  //     name_ru: key,
  //     image: '',
  //     status: 1,
  //     fields: {
  //       articles: formatedSuppliers[key]
  //     }
  //   });
  // }

  // await prisma.filters.createMany({
  //   data: suppArr
  // });

  // console.log(
  //   `Items - ${offers.length}`
  // );
  return items;
}

export default defineEventHandler(async (event) => {
  console.log('start import xml files');
  try {
    const files = await readdir('temp/files_import');
    console.log(`detected files - ${files.length}`);
    const allItems = [];
    for (const file of files) {
      // if(file === files[0]) {
        console.log(`START READ ${file}`);
        const controller = new AbortController();
        const { signal } = controller;
        const promise = await readFile(`temp/files_import/${file}`, { signal, encoding: 'utf-8' });
        // Abort the request before the promise settles.
        controller.abort();
        // console.log(promise);
        const items = await processData(promise)
        allItems.push(...items);
      // }
    }
    console.log(allItems.length);
    return { result: 'ok' }
  } catch(err) {
    console.log(err);
    return { result: 'error' };
  }
});