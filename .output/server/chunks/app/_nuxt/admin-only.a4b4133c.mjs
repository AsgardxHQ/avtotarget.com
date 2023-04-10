import { k as defineNuxtRouteMiddleware, n as navigateTo, b as useAuthUser, v as vue_cjs_prod } from '../server.mjs';
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

const useAdmin = () => {
  const authUser = useAuthUser();
  return vue_cjs_prod.computed(() => {
    if (!authUser.value)
      return false;
    return authUser.value.access_level === 0;
  });
};
const adminOnly = defineNuxtRouteMiddleware(async (_to, _from) => {
  const isAdmin = useAdmin();
  if (!isAdmin.value)
    return navigateTo({ name: "login" });
});

export { adminOnly as default };
//# sourceMappingURL=admin-only.a4b4133c.mjs.map
