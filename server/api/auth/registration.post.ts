import { getUserByEmail } from '~~/server/models/user'
import { hash } from '~~/server/utils/password'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { email, password } = await useBody(event);
    const user = await getUserByEmail(email);
    const pswd = await hash(password);
    return JSON.stringify({result: 'ok'});
});