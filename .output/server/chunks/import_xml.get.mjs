import { defineEventHandler } from 'h3';
import { readdir, readFile } from 'fs/promises';
import { DOMParser } from '@xmldom/xmldom';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const processData = async (content) => {
  await prisma.filters.findMany({});
  console.log("READING CONTENT");
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "application/xml");
  const offers = doc.getElementsByTagName("offer");
  const supp = offers[0].getElementsByTagName("crosses");
  const cars = offers[0].getElementsByTagName("car");
  const params = offers[0].getElementsByTagName("param");
  const filters_id = [];
  const paramsArr = [];
  for (let key in supp) {
    if (typeof supp[key].getAttribute === "function") {
      if (supp[key].getAttribute("article")) {
        filters_id.push(supp[key].getAttribute("article"));
      }
    }
  }
  for (let key in cars) {
    if (typeof cars[key].getAttribute === "function") {
      if (cars[key].getAttribute("model")) {
        filters_id.push(cars[key].getAttribute("model"));
      }
    }
  }
  for (let key in params) {
    if (typeof params[key].getAttribute === "function") {
      paramsArr.push({
        key: params[key].getAttribute("name"),
        value: params[key].getAttribute("text")
      });
    }
  }
  const items = [];
  for (let key in offers) {
    const analogs = [];
    if (typeof offers[key].getElementsByTagName === "function") {
      const anal = offers[key].getElementsByTagName("analog");
      for (let i = 0; i < anal.length; i++) {
        analogs.push(anal[i].getAttribute("id"));
      }
      items.push({
        name_uk: offers[key].getElementsByTagName("name_ua")[0].textContent,
        name_ru: offers[key].getElementsByTagName("name")[0].textContent,
        url: "",
        images: [offers[key].getElementsByTagName("picture")[0].textContent],
        code_wholesale: "",
        code_vendor: offers[key].getElementsByTagName("vendorCode")[0].textContent.split("-")[0],
        price_retail: +offers[0].getElementsByTagName("price")[0].textContent * 100,
        remains: 9999,
        status: 1,
        fields: {
          provider: "Omega",
          description_uk: offers[key].getElementsByTagName("description")[0].textContent,
          description_ru: offers[key].getElementsByTagName("description_ua")[0].textContent,
          params: paramsArr,
          keywords: offers[key].getElementsByTagName("keywords")[0].textContent
        },
        category_id: +offers[key].getElementsByTagName("categoryId")[0].textContent,
        filters_id,
        analogs
      });
    }
  }
  return items;
};
const import_xml_get = defineEventHandler(async (event) => {
  console.log("start import xml files");
  try {
    const files = await readdir("temp/files_import");
    console.log(`detected files - ${files.length}`);
    const allItems = [];
    for (const file of files) {
      console.log(`START READ ${file}`);
      const controller = new AbortController();
      const { signal } = controller;
      const promise = await readFile(`temp/files_import/${file}`, { signal, encoding: "utf-8" });
      controller.abort();
      const items = await processData(promise);
      allItems.push(...items);
    }
    console.log(allItems.length);
    return { result: "ok" };
  } catch (err) {
    console.log(err);
    return { result: "error" };
  }
});

export { import_xml_get as default };
//# sourceMappingURL=import_xml.get.mjs.map
