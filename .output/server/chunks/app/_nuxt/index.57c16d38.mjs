import { v as vue_cjs_prod, e as useAsyncData, S as Slider, f as _sfc_main$h, g as _sfc_main$g } from '../server.mjs';
import { s as serverRenderer } from '../../handlers/renderer.mjs';
import 'unenv/runtime/mock/proxy';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'h3';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';
import 'cookie-signature';
import '@prisma/client';
import 'stream';

const _sfc_main = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData(
      "mainItems",
      () => $fetch("/api/v1/items?limit=20"),
      "$TRt7dBGoXP"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
      _push(serverRenderer.exports.ssrRenderComponent(Slider, null, null, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$h, { class: "main-page" }, null, _parent));
      _push(`<div class="v-full px-2 py-3"><h3 class="text-2xl text-slate-600 border-b-2 border-zinc-500">${serverRenderer.exports.ssrInterpolate(_ctx.$t("new_supply"))}</h3></div><div class="w-full grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-12">`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$g, {
        items: vue_cjs_prod.unref(data).items
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[locale]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.57c16d38.mjs.map
