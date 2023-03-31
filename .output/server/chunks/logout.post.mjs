import { defineEventHandler, deleteCookie } from 'h3';
import { u as useRuntimeConfig } from './nitro/node-server.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  deleteCookie(event, config.cookieName, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: true
  });
  return {
    user: null
  };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
