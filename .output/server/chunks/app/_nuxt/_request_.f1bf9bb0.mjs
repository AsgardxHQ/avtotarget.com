import { v as vue_cjs_prod, u as useRoute, j as useNuxtApp, f as useAsyncData, h as _sfc_main$g } from '../server.mjs';
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
  __name: "[request]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const currentItems = vue_cjs_prod.ref([]);
    const route = useRoute();
    const isLoader = vue_cjs_prod.ref(false);
    vue_cjs_prod.ref(1);
    const count = vue_cjs_prod.ref(0);
    vue_cjs_prod.onUnmounted(() => {
      delete useNuxtApp().payload.data["search"];
    });
    const { data } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData(
      "search",
      () => $fetch(
        `/api/v1/search/${route.params.request}`
      ),
      "$oGzSBZxjTL"
    )), __temp = await __temp, __restore(), __temp);
    currentItems.value = data.value.items;
    count.value = data.value.count;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex" }, _attrs))}><div class="w-full"><div class="w-full px-2 py-3"><h3 class="text-slate-600 border-b-2 border-zinc-500 flex justify-between items-center"><span class="text-2xl">${serverRenderer.exports.ssrInterpolate(_ctx.$t("search_hl"))}</span> <span class="text-sm">${serverRenderer.exports.ssrInterpolate(_ctx.$t("found"))}: ${serverRenderer.exports.ssrInterpolate(count.value)}</span></h3></div>`);
      if (currentItems.value && currentItems.value.length > 0) {
        _push(`<div class="w-full min-h-80 grid grid-flow-row-dense grid-cols-4 mb-12">`);
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$g, { items: currentItems.value }, null, _parent));
        if (count.value > 19) {
          _push(`<button type="button" class="group m-2 relative btn-load-next flex items-start"><div class="group-hover:shadow-lg z-50 bg-zinc-100 rounded-md shadow-md flex items-center justify-center w-full"><span class="text-xl uppercase font-bold">${serverRenderer.exports.ssrInterpolate(_ctx.$t("show_more"))}</span></div></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (isLoader.value) {
        _push(`<div class="fixed inset-0 w-full h-full bg-slate-200/50 flex justify-center items-center"><span class="text-2xl text-slate-800">LOADING</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[locale]/search/[request].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_request_.f1bf9bb0.mjs.map
