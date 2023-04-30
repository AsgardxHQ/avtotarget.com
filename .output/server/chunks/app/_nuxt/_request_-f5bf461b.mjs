import { defineComponent, ref, onUnmounted, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { u as useRoute, h as useNuxtApp, g as useAsyncData } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './item-eb92086a.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
import 'ufo';
import 'defu';
import 'ohash';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[request]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const currentItems = ref([]);
    const route = useRoute();
    const isLoader = ref(false);
    ref(1);
    const count = ref(0);
    onUnmounted(() => {
      delete useNuxtApp().payload.data["search"];
    });
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "search",
      () => $fetch(
        `/api/v1/search/${route.params.request}`
      )
    )), __temp = await __temp, __restore(), __temp);
    currentItems.value = data.value.items;
    count.value = data.value.count;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))}><div class="w-full"><div class="w-full px-2 py-3"><h3 class="text-slate-600 border-b-2 border-zinc-500 flex justify-between items-center"><span class="text-2xl">${ssrInterpolate(_ctx.$t("search_hl"))}</span> <span class="text-sm">${ssrInterpolate(_ctx.$t("found"))}: ${ssrInterpolate(unref(count))}</span></h3></div>`);
      if (unref(currentItems) && unref(currentItems).length > 0) {
        _push(`<div class="w-full min-h-80 grid grid-flow-row-dense grid-cols-4 mb-12">`);
        _push(ssrRenderComponent(_sfc_main$1, { items: unref(currentItems) }, null, _parent));
        if (unref(count) > 19) {
          _push(`<button type="button" class="group m-2 relative btn-load-next flex items-start"><div class="group-hover:shadow-lg z-50 bg-zinc-100 rounded-md shadow-md flex items-center justify-center w-full"><span class="text-xl uppercase font-bold">${ssrInterpolate(_ctx.$t("show_more"))}</span></div></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(isLoader)) {
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
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[locale]/search/[request].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_request_-f5bf461b.mjs.map
