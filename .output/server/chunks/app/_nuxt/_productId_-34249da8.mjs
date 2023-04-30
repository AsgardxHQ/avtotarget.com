import { u as useRoute, h as useNuxtApp, g as useAsyncData } from '../server.mjs';
import { defineComponent, ref, onUnmounted, withAsyncContext, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
  __name: "[productId]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const count = ref(1);
    ref(null);
    const renderItem = ref({});
    onUnmounted(() => {
      delete useNuxtApp().payload.data["item"];
    });
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "item",
      () => $fetch(
        `/api/v1/${route.params.productId}`
      )
    )), __temp = await __temp, __restore(), __temp);
    const { item, mainFilters, mainCategory } = data.value;
    renderItem.value = item;
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(renderItem) && Object.keys(unref(renderItem)).length > 0) {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="w-full flex mt-8"><div class="w-2/5 px-5"><div><img${ssrRenderAttr("src", `https://cdn.autotarget.com.ua/products/${unref(renderItem).images[0]}` || "/images/no_image.png")}></div></div><div class="w-3/5 px-5 divide-y divide-slate-200"><h1 class="text-slate-600 pb-3">${ssrInterpolate(unref(renderItem)[`name_${unref(route).params.locale}`])}</h1><div class="py-3"><ul class="text-xs"><li class="mb-2"><span class="font-bold">${ssrInterpolate(_ctx.$t("items.code_vendor"))}: </span>${ssrInterpolate(unref(renderItem).code_vendor)}</li>`);
        if (unref(mainCategory)) {
          _push(`<li class="mb-2"><span class="font-bold">${ssrInterpolate(unref(mainCategory)[`name_${unref(route).params.locale}`])}: </span>${ssrInterpolate(unref(renderItem).category[`name_${unref(route).params.locale}`])}</li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(mainFilters), (f, index) => {
          _push(`<li class="mb-2"><span class="font-bold">${ssrInterpolate(f[`name_${unref(route).params.locale}`])}: </span>${ssrInterpolate(unref(renderItem).filters.find((cur) => cur.parent_id === f.id)[`name_${unref(route).params.locale}`])}</li>`);
        });
        _push(`<!--]--></ul></div><div class="py-3"><span><span>${ssrInterpolate(_ctx.$t("items.price"))}: </span> ${ssrInterpolate(unref(renderItem).price_retail / 100)} \u0433\u0440\u043D. </span></div><div class="flex items-center py-3"><div><span>${ssrInterpolate(_ctx.$t("count_items"))}: </span><input class="w-10 h-8 text-center outline-none mx-2 py-1 rounded text-xs" type="tel" name="count"${ssrRenderAttr("value", unref(count))}></div><button class="h-8 bg-cyan-700 text-sky-100 px-4 py-1 rounded">${ssrInterpolate(_ctx.$t("to_cart"))}</button></div></div></div><div class="w-full px-5 mt-8">${unref(renderItem).fields[`description_${unref(route).params.locale}`]}</div><div class="cart-notice"><span>\u0422\u043E\u0432\u0430\u0440 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443!</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[locale]/product/[productId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_productId_-34249da8.mjs.map
