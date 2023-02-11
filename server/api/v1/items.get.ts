import type { QueryPrisma } from '~~/types'
import * as url from "url";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = url.parse(event.req.url as string, true).query;
  let where:any = {};
  let cats = null;
  if(query.category && !query.subcategory) {
    if(+query.category !== 0) {
      cats = await prisma.categories.findMany({
        where: {
          parent_id: +query.category
        },
        select: {
          id: true
        }
      })
    }
    const categories = [{id: +query.category}, ...cats];
    const catIds = [];
    categories.map(m => {
      catIds.push(m.id);
    })
    where.category_id = { in: catIds };
  } else if(query.subcategory) {
    const subcats = await prisma.categories.findMany({
      where: {
        parent_id: +query.subcategory
      }
    });
    const arr = [];
    subcats.map(m => arr.push(m.id));
    where.category_id = { in: [...arr, +query.subcategory] };
  }
  
  const options:QueryPrisma = {
    orderBy: {ts: 'asc'},
  };
  const { make, model, supplier } = query;
  const arr:any = [];
  let filters = [];
  if(make && model) {
    if(model) {
      for(let key in query) {
        if(!isNaN(+query[key]) && ['make', 'category', 'subcategory'].indexOf(key) === -1) arr.push(+query[key]);
      }
      filters = await prisma.filters.findMany({
        where: {
          id: {in: arr}
        }
      });
    } else if(make) {
      for(let key in query) {
        if(!isNaN(+query[key]) && ['category', 'subcategory'].indexOf(key) === -1) arr.push(+query[key]);
      }
      filters.push(
        ...await prisma.filters.findMany({
          where: {
            id: {in: arr}
          },
          select: {
            id: true
          }
        })
      );
      filters.push(
        ...await prisma.filters.findMany({
          where: {
            parent_id: +make
          },
          select: {
            id: true
          }
        })
      );
    }
    if(filters.length > 0) {
      let convertFilter = [];
      filters.map(f => {
        convertFilter.push(+f.id)
      });
      const hasType = convertFilter.length > 2;
      // hasSome - if we have only one attr
      // hasEvery - if we have two or more attrs
      where.filters_id = {[`${hasType ? 'hasSome' : 'hasEvery'}`]: convertFilter};
    }
  }
  // const test = await prisma.items.findMany({
  //   where: {
  //     AND: [
  //       {
  //         category_id: +query.category
  //       },
  //       {
  //         filters_id: {hasEvery: [+make, +supplier]}
  //       }
  //     ]
  //   }
  // });
  // console.log(test);
  // if(query.filter) {
  //   const qf:any = query.filter.indexOf(',') !== -1 ? (query.filter as string).split(','): [query.filter]
  //   let filterToNumber:number[] = qf.map(f => +f);
  //   filterToNumber = filterToNumber.map(m => +m);
  //   const filters = await prisma.filters.findMany({
  //     where: {parent_id: {in: filterToNumber}},
  //     select: {
  //       id: true,
  //       parent_id: true
  //     }
  //   })
  //   let convertFilter = [];
  //   filters.map(f => {
  //     if(f.parent_id !== 0) {
  //       convertFilter.push(+f.id)
  //     }
  //   });
  //   convertFilter.push(...filterToNumber);
  //   //hasSome - if we have only one attr
  //   //hasEvery - if we have two or more attrs
  //   const hasType = convertFilter.length > 2;
  //   where.filters_id = {[`${hasType ? 'hasSome' : 'hasEvery'}`]: convertFilter};
  // }
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