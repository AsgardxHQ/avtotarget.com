import { v as vue_cjs_prod, u as useRoute, j as useNuxtApp, f as useAsyncData } from '../server.mjs';
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
  __name: "[productId]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const count = vue_cjs_prod.ref(1);
    vue_cjs_prod.ref(null);
    const renderItem = vue_cjs_prod.ref({});
    vue_cjs_prod.onUnmounted(() => {
      delete useNuxtApp().payload.data["item"];
    });
    const { data, pending, refresh } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useAsyncData(
      "item",
      () => $fetch(
        `/api/v1/${route.params.productId}`
      ),
      "$76xHkzP9vr"
    )), __temp = await __temp, __restore(), __temp);
    const { item, mainFilters, mainCategory } = data.value;
    renderItem.value = item;
    return (_ctx, _push, _parent, _attrs) => {
      if (renderItem.value && Object.keys(renderItem.value).length > 0) {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}><div class="w-full flex mt-8"><div class="w-2/5 px-5"><div><img${serverRenderer.exports.ssrRenderAttr("src", `https://cdn.autotarget.com.ua/products/${renderItem.value.images[0]}` || "/images/no_image.png")}></div></div><div class="w-3/5 px-5 divide-y divide-slate-200"><h1 class="text-slate-600 pb-3">${serverRenderer.exports.ssrInterpolate(renderItem.value[`name_${vue_cjs_prod.unref(route).params.locale}`])}</h1><div class="py-3"><ul class="text-xs"><li class="mb-2"><span class="font-bold">${serverRenderer.exports.ssrInterpolate(_ctx.$t("items.code_vendor"))}: </span>${serverRenderer.exports.ssrInterpolate(renderItem.value.code_vendor)}</li>`);
        if (vue_cjs_prod.unref(mainCategory)) {
          _push(`<li class="mb-2"><span class="font-bold">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(mainCategory)[`name_${vue_cjs_prod.unref(route).params.locale}`])}: </span>${serverRenderer.exports.ssrInterpolate(renderItem.value.category[`name_${vue_cjs_prod.unref(route).params.locale}`])}</li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(mainFilters), (f, index) => {
          _push(`<li class="mb-2"><span class="font-bold">${serverRenderer.exports.ssrInterpolate(f[`name_${vue_cjs_prod.unref(route).params.locale}`])}: </span>${serverRenderer.exports.ssrInterpolate(renderItem.value.filters.find((cur) => cur.parent_id === f.id)[`name_${vue_cjs_prod.unref(route).params.locale}`])}</li>`);
        });
        _push(`<!--]--></ul></div><div class="py-3"><span><span>${serverRenderer.exports.ssrInterpolate(_ctx.$t("items.price"))}: </span> ${serverRenderer.exports.ssrInterpolate(renderItem.value.price_retail / 100)} \u0433\u0440\u043D. </span></div><div class="flex items-center py-3"><div><span>${serverRenderer.exports.ssrInterpolate(_ctx.$t("count_items"))}: </span><input class="w-10 h-8 text-center outline-none mx-2 py-1 rounded text-xs" type="tel" name="count"${serverRenderer.exports.ssrRenderAttr("value", count.value)}></div><button class="h-8 bg-cyan-700 text-sky-100 px-4 py-1 rounded">${serverRenderer.exports.ssrInterpolate(_ctx.$t("to_cart"))}</button></div></div></div><div class="w-full px-5 mt-8">${renderItem.value.fields[`description_${vue_cjs_prod.unref(route).params.locale}`]}</div><div class="cart-notice"><span>\u0422\u043E\u0432\u0430\u0440 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443!</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[locale]/product/[productId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_productId_.d3374b95.mjs.map
