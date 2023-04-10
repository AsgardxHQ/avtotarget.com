import { k as defineNuxtRouteMiddleware, b as useAuthUser, n as navigateTo, m as abortNavigation } from '../server.mjs';
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

const guestOnly = defineNuxtRouteMiddleware(async (to, from) => {
  const user = useAuthUser();
  if (user.value) {
    if (from.name === to.name)
      return navigateTo({ name: "index" });
    return abortNavigation();
  }
});

export { guestOnly as default };
//# sourceMappingURL=guest-only.92d6d30e.mjs.map
