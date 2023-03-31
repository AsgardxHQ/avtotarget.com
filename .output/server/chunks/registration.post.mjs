import { defineEventHandler, useBody } from 'h3';
import { a as getUserByEmail } from './nitro/node-server.mjs';
import { h as hash } from './password.mjs';
import { PrismaClient } from '@prisma/client';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';
import 'cookie-signature';
import 'bcryptjs';

new PrismaClient();
const registration_post = defineEventHandler(async (event) => {
  const { email, password } = await useBody(event);
  await getUserByEmail(email);
  await hash(password);
  return JSON.stringify({ result: "ok" });
});

export { registration_post as default };
//# sourceMappingURL=registration.post.mjs.map
