import { k as defineNuxtRouteMiddleware, b as useAuthUser, n as navigateTo } from '../server.mjs';
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

const userOnly = defineNuxtRouteMiddleware(async (_to, _from) => {
  const user = useAuthUser();
  if (!user.value)
    return navigateTo({ name: "login" });
});

export { userOnly as default };
//# sourceMappingURL=user-only.a9aaf907.mjs.map
