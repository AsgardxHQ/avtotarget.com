import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const order_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const user = [{}];
  const userId = user[0].id ? user[0].id : "";
  body.user_id = userId;
  const { city, delivery, description, email, fullname, phone, post_office } = body;
  await prisma.orders.create({
    data: {
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
  return { result: "ok" };
});

export { order_post as default };
//# sourceMappingURL=order.post.mjs.map
