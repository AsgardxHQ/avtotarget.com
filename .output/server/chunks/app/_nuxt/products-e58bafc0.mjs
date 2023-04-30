import { useSSRContext, defineComponent, ref, withAsyncContext, mergeProps, unref, computed, withCtx, createVNode, createTextVNode, toDisplayString } from 'vue';
import { u as useRoute, a as useFetch, _ as __nuxt_component_0$2 } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './filter-ecc64663.mjs';
import { _ as _sfc_main$3 } from './item-eb92086a.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "pagination",
  __ssrInlineRender: true,
  props: ["pagination", "refresh"],
  setup(__props) {
    const route = useRoute();
    const getPages = computed(() => {
      const page = +route.params.page;
      const obj = {
        min: 0,
        max: 0
      };
      if (page < 3) {
        obj.min = 0;
        obj.max = 6;
      } else {
        obj.min = page - 3;
        obj.max = page + 2;
      }
      return obj;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pagination flex items-center justify-center" }, _attrs))}>`);
      if (+unref(route).params.page > 1) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { params: { page: 1 }, query: unref(route).query },
          class: "text-2xl py-2 px-4 mx-1 border border-slate-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-angle-double-left"${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "pi pi-angle-double-left" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"><i class="pi pi-angle-double-left"></i></span>`);
      }
      if (+unref(route).params.page > 1) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { params: { page: +unref(route).params.page - 1 }, query: unref(route).query },
          class: "text-2xl py-2 px-4 mx-1 border border-slate-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-angle-left"${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "pi pi-angle-left" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"><i class="pi pi-angle-left"></i></span>`);
      }
      _push(`<div class="pagination-pages overflow-hidden flex items-center"><!--[-->`);
      ssrRenderList(Math.ceil(__props.pagination.count / 20), (index) => {
        _push(`<!--[-->`);
        if (unref(getPages).min <= index && unref(getPages).max >= index) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: { params: { page: index }, query: unref(route).query },
            class: ["text-2xl py-2 px-4 mx-1 border border-slate-200", +unref(route).params.page === index ? "active" : ""]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(index)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(index), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
      if (+unref(route).params.page < Math.ceil(__props.pagination.count / 20)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { params: { page: +unref(route).params.page + 1 }, query: unref(route).query },
          class: "text-2xl py-2 px-4 mx-1 border border-slate-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-angle-right"${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "pi pi-angle-right" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"><i class="pi pi-angle-right"></i></span>`);
      }
      if (+unref(route).params.page < Math.ceil(__props.pagination.count / 20)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { params: { page: Math.ceil(__props.pagination.count / 20) }, query: unref(route).query },
          class: "text-2xl py-2 px-4 mx-1 border border-slate-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="pi pi-angle-double-right"${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "pi pi-angle-double-right" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"><i class="pi pi-angle-double-right"></i></span>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/pagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "products",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const currentItems = ref([]);
    const currentCategory = ref([]);
    const isLoader = ref(false);
    const pagination = ref({
      count: 0
    });
    const changeQuery = async (query) => {
      await getData(query);
    };
    const queryToString = (query) => {
      let str = "";
      for (let key in query) {
        if (key && query[key]) {
          str += `${key}=${query[key]}&`;
        }
      }
      return str;
    };
    const getData = async (query = route.query) => {
      const { data, refresh } = await useFetch(`/api/v1/items?${queryToString(route.params)}${queryToString(query)}&limit=21`, "$gfvq5tKCLR");
      await refresh({ dedupe: true });
      currentItems.value = data.value.items;
      pagination.value.count = +data.value.count;
    };
    [__temp, __restore] = withAsyncContext(() => getData()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:flex" }, _attrs))}><div class="sm:w-full md:w-3/12">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        onChangeQuery: changeQuery,
        class: "product-page"
      }, null, _parent));
      _push(`</div><div class="sm:w-full md:w-9/12">`);
      if (unref(currentCategory)) {
        _push(`<div class="w-full text-xl text-center uppercase">${ssrInterpolate(unref(currentCategory)[`name_${unref(route).params.locale}`])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="w-full px-2 py-3"><h3 class="text-2xl text-slate-600 border-b-2 border-zinc-500">${ssrInterpolate(_ctx.$t("new_supply"))}</h3></div>`);
      if (unref(currentItems) && unref(currentItems).length > 0) {
        _push(`<!--[--><div class="w-full grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mb-12">`);
        _push(ssrRenderComponent(_sfc_main$3, { items: unref(currentItems) }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_sfc_main$1, { pagination: unref(pagination) }, null, _parent));
        _push(`<!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=products-e58bafc0.mjs.map
