import type { User } from '~~/types'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getUsers() {
  return await prisma.users.findMany();
}

export async function getUserByEmail(email: string) {
  return await prisma.users.findUnique({
    where: {
      email: email
    }
  });
}

export async function getUserById(id: number) {
  return await prisma.users.findUnique({
    where: {
      id: id
    }
  });
}

export async function isAdmin(user?: User) {
  return user && user.roles.includes('ADMIN')
}
