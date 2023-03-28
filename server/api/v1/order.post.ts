import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { getUsers } from '~~/server/models/user'

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const user:any = await getUsers();
  const userId = user[0].id ? user[0].id : '';
  body.user_id = userId;
  const { city, delivery, description, email, fullname, phone, post_office } = body;
  await prisma.orders.create({
    data: <any>{
      user: body.user_id,
      fields: {
        city, 
        delivery, 
        description, 
        email, 
        fullname, 
        phone, 
        post_office
      },
      items: body.items
    }
  });
  return {result: 'ok'};
});