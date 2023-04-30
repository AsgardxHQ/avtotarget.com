import { defineComponent, withAsyncContext, reactive, computed, unref, useSSRContext } from 'vue';
import { b as useRouter, u as useRoute, a as useFetch } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "filter",
  __ssrInlineRender: true,
  props: ["refresh"],
  emits: ["changeQuery"],
  async setup(__props, { emit: emits }) {
    let __temp, __restore;
    useRouter();
    const route = useRoute();
    const { data: filters } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/v1/filters", "$5hdpGqCQFQ")), __temp = await __temp, __restore(), __temp);
    const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/v1/categories", "$XqEDBpiu8X")), __temp = await __temp, __restore(), __temp);
    const filterData = reactive({
      category: +route.params.category || null,
      subcategory: +route.params.subcategory || null,
      model: +route.query.model || null,
      make: +route.query.make || null,
      supplier: +route.query.supplier || null
    });
    const modelsList = computed(() => {
      return filters.value.filter((f) => f.parent_id === filterData.make);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="px-2 pt-3"><h3 class="text-2xl text-slate-600 border-b-2 border-zinc-700">${ssrInterpolate(_ctx.$t("filter"))}</h3></div><div class="container py-3 items-end"><div class="wrapper mb-2"><div class="select-block px-2"><label><span class="text-xs mb-1 block">\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</span><select class="w-full form-input px-4 py-3 outline-0"><option${ssrRenderAttr("value", null)}>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</option><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(`<!--[-->`);
        if (category.parent_id === 0) {
          _push(`<option${ssrRenderAttr("value", category.id)}>${ssrInterpolate(category[`name_${unref(route).params.locale}`])}</option>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></select></label></div>`);
      if (unref(filterData).category) {
        _push(`<div class="select-block px-2"><label><span class="text-xs mb-1 block">\u0421\u0430\u0431\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</span><select class="w-full form-input px-4 py-3 outline-0"><option${ssrRenderAttr("value", null)}>\u0421\u0430\u0431\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</option><!--[-->`);
        ssrRenderList(unref(categories), (category) => {
          _push(`<!--[-->`);
          if (category.parent_id === unref(filterData).category) {
            _push(`<option${ssrRenderAttr("value", category.id)}>${ssrInterpolate(category[`name_${_ctx.$route.params.locale}`])}</option>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></select></label></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="select-block px-2"><label><span class="text-xs mb-1 block">\u041C\u0430\u0440\u043A\u0430</span><select class="w-full form-input px-4 py-3 outline-0"><option${ssrRenderAttr("value", null)}>\u041C\u0430\u0440\u043A\u0430</option><!--[-->`);
      ssrRenderList(unref(filters), (filter) => {
        _push(`<!--[-->`);
        if (filter.parent_id === 3) {
          _push(`<option${ssrRenderAttr("value", filter.id)}>${ssrInterpolate(filter[`name_${_ctx.$route.params.locale}`])}</option>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></select></label></div>`);
      if (unref(filterData).make && unref(modelsList).length > 0) {
        _push(`<div class="select-block px-2"><label><span class="text-xs mb-1 block">\u041C\u043E\u0434\u0435\u043B\u044C</span><select class="w-full form-input px-4 py-3 outline-0"><option${ssrRenderAttr("value", null)}>\u041C\u043E\u0434\u0435\u043B\u044C</option><!--[-->`);
        ssrRenderList(unref(filters), (filter) => {
          _push(`<!--[-->`);
          if (filter.parent_id === unref(filterData).make) {
            _push(`<option${ssrRenderAttr("value", filter.id)}>${ssrInterpolate(filter[`name_${_ctx.$route.params.locale}`])}</option>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></select></label></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="select-block px-2"><label><span class="text-xs mb-1 block">\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C</span><select class="w-full form-input px-4 py-3 outline-0"><option${ssrRenderAttr("value", null)}>\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C</option><!--[-->`);
      ssrRenderList(unref(filters), (filter) => {
        _push(`<!--[-->`);
        if (filter.parent_id === 2 && filter[`name_${_ctx.$route.params.locale}`]) {
          _push(`<option${ssrRenderAttr("value", filter.id)}>${ssrInterpolate(filter[`name_${_ctx.$route.params.locale}`])}</option>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></select></label></div></div><button class="filter-btn mx-2 mb-2 h-11 bg-slate-600 text-gray-100">\u0417\u043D\u0430\u0439\u0442\u0438</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/filter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=filter-ecc64663.mjs.map
