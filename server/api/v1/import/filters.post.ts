import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const carsDB = await prisma.filters.findMany({});
  const suppDB = await prisma.filters.findMany({
    where: {
      parent_id: 2
    }
  });
  if(body.suppliers) {
    const supp = [];
    for(let key in body.suppliers) {
      if(!suppDB.find(f => f.name_uk === key)) {
        supp.push(body.suppliers[key]);
      }
    }
    await prisma.filters.createMany({
      data: supp,
      skipDuplicates: true
    });
  } else if(body.cars) {
    const cars = body.cars;
    const model = {};
    const arrCars = [];
    for(let key in cars) {
      model[key] = cars[key].child;
      delete cars[key].child;
      if(!carsDB.find(f => f.name_uk === key)) {
        arrCars.push(cars[key]);
      }
    }
    await prisma.filters.createMany({
      data: arrCars,
      skipDuplicates: true
    });
    const arr = []
    for(let key in model) {
      const make = carsDB.find(f => f.name_uk === key);
      if(make) {
        for(let m in model[key]) {
          if(model[key][m].name_uk !== '' && 
            !carsDB.find(f => f.name_uk === m) && 
            !arr.find(f => f.name_uk === m)
          ) {
            arr.push({
              parent_id: make.id,
              ...model[key][m]
            });
          }
        }
      }
    }
    await prisma.filters.createMany({
      data: arr,
      skipDuplicates: true
    });
    // const cars = await prisma.filters.createMany({
    //   data: makesNotChild
    // });
    // console.log(cars);
  }
  await prisma.$disconnect();
  return {result: 'ok'};
});