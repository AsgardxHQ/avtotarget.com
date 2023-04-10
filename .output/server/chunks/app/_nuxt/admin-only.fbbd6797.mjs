import { k as defineNuxtRouteMiddleware, l as useAdmin, n as navigateTo } from '../server.mjs';
import 'unenv/runtime/mock/proxy';
import '../../handlers/renderer.mjs';
import 'ufo';
import 'h3';
import '../../nitro/node-server.mjs';
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
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';
import 'cookie-signature';
import '@prisma/client';
import 'stream';
import 'unctx';
import 'defu';

const adminOnly = defineNuxtRouteMiddleware(async (_to, _from) => {
  const isAdmin = useAdmin();
  if (!isAdmin.value)
    return navigateTo({ name: "login" });
});

export { adminOnly as default };
//# sourceMappingURL=admin-only.fbbd6797.mjs.map
