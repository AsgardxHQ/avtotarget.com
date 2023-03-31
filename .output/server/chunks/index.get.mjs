import { defineEventHandler, createError } from 'h3';
import { i as isAdmin, g as getUsers } from './nitro/node-server.mjs';
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
import '@prisma/client';

const index_get = defineEventHandler(async (event) => {
  if (!isAdmin(event.context.user)) {
    return createError({
      statusCode: 401,
      message: "You don't have the rights to access this resource"
    });
  }
  const usersWithPassword = await getUsers();
  const usersWithoutPassword = usersWithPassword.map(({ password: _password, ...user }) => user);
  return usersWithoutPassword;
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
