import { _ as __nuxt_component_0$2 } from '../server.mjs';
import { defineComponent, ref, withCtx, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "item",
  __ssrInlineRender: true,
  props: {
    items: Array
  },
  setup(__props) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<!--[--><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<div class="group m-2 relative"><div class="transition ease-in-out group-hover:scale-110 group-hover:absolute group-hover:shadow-lg z-50 bg-zinc-100 rounded-md shadow-md">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          title: item[`name_${_ctx.$route.params.locale}`],
          to: `/${_ctx.$route.params.locale}/product/${item.id}`,
          class: "block mb-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (item.images && item.images.length > 0) {
                _push2(`<img class="w-full h-40 object-cover"${ssrRenderAttr("src", `https://cdn.autotarget.com.ua/products/${item.images[0]}`)}${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                item.images && item.images.length > 0 ? (openBlock(), createBlock("img", {
                  key: 0,
                  class: "w-full h-40 object-cover",
                  src: `https://cdn.autotarget.com.ua/products/${item.images[0]}`
                }, null, 8, ["src"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          title: item[`name_${_ctx.$route.params.locale}`],
          to: `/${_ctx.$route.params.locale}/product/${item.id}`,
          class: "item-name block h-10 overflow-hidden text-sm text-slate-500 transition group-hover:text-slate-900 px-2 mb-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item[`name_${_ctx.$route.params.locale}`])}`);
            } else {
              return [
                createTextVNode(toDisplayString(item[`name_${_ctx.$route.params.locale}`]), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="h-12"><ul class="text-xs px-2 mb-2"><li class="font-bold"><span class="font-normal">\u041A\u043E\u0434 \u0442\u043E\u0432\u0430\u0440\u0430: </span>${ssrInterpolate(item.code_vendor)}</li><li class="font-bold"><span class="font-normal">\u041A\u043E\u0434 \u043F\u0440\u043E-\u043B\u044F: </span>${ssrInterpolate(item.code_wholesale)}</li></ul></div><div class="flex items-center"><span class="block w-1/2 px-2 text-slate-600 text-sm font-bold whitespace-nowrap">${ssrInterpolate(item.price_retail / 100)} \u0433\u0440\u043D.</span><button type="button" class="w-1/2 text-sky-900 bg-inherit group-hover:bg-cyan-700 group-hover:text-sky-100 py-2 rounded-br-md">${ssrInterpolate(_ctx.$t("to_cart"))}</button></div></div></div>`);
      });
      _push(`<!--]--><div class="cart-notice"><span>\u0422\u043E\u0432\u0430\u0440 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443!</span></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/item.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=item-eb92086a.mjs.map
