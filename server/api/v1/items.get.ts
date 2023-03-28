import type { QueryPrisma } from '~~/types'
import * as url from "url";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = url.parse(event.req.url as string, true).query;
  let where:any = {};
  let cats = [];
  if(query.category) {
    if(!where.AND) where.AND = [];
    const categories = await prisma.categories.findMany({});
    if(!query.subcategory) {
      categories.map(cat => {
        if(cat.id === +query.category) {
          cats.push(cat.id);
        } else if(cat.parent_id === +query.category) {
          cats.push(cat.id);
          categories.map(subCat => {
            if(subCat.parent_id === cat.id) {
              cats.push(subCat.id);
            }
          });
        }
      });
    } else {
      categories.map(cat => {
        if(cat.id === +query.subcategory || cat.parent_id === +query.subcategory) {
          cats.push(cat.id);
        }
      });
    }
    where.AND.push({category_id: {in: cats}});
  }
  const options:QueryPrisma = {
    orderBy: {ts: 'asc'},
  };
  if(Object.keys(query).length > 0) {
    const filters = [];
    for(let key in query) {
      if(['category', 'subcategory', 'page', 'limit'].indexOf(key) === -1 && !isNaN(+query[key])) {
        filters.push(+query[key]);
      }
    }
    if(filters.length > 0) {
      if(!where.AND) where.AND = [];
      where.AND.push({filters_id: {hasEvery: filters}})
    }
  }
  options.where = where;
  if(query.limit) options.take = +query.limit;
  else options.take = 20;

  if(query.page) {
    const limit = query.limit ? +query.limit : 20;
    const page = query.page ? +query.page : 1;
    options.skip = (page - 1) * limit;
  }
  try {
    const payload = await prisma.$transaction([
      prisma.items.count({
        where: where
      }),
      prisma.items.findMany(options),
    ]);
    const [count, items] = payload;
    prisma.$disconnect();
    return {items, count};
  } catch(err) {
    prisma.$disconnect();
    console.log(err);
    return null;
  }
  // const category = cat || null;
});