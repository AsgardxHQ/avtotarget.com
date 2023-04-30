import { u as useRoute, b as useRouter, d as cartStore, e as __nuxt_component_0 } from '../server.mjs';
import { defineComponent, computed, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const storeCart = cartStore();
    const currentuser = null;
    const cart = computed(() => {
      return storeCart.cart;
    });
    const itemsId = {};
    cart.value.map((m) => {
      itemsId[m.id] = m.count;
    });
    const orderData = ref({
      fullname: "",
      phone: "",
      email: "",
      delivery: "",
      description: "",
      post_office: "",
      city: "",
      items: itemsId
    });
    if (currentuser.value) {
      for (let key in currentuser.value) {
        if (Object.keys(orderData.value).indexOf(key) !== -1) {
          orderData.value[key] = currentuser.value[key];
        }
      }
    }
    ref(false);
    const postOffices = ref([]);
    ref(true);
    computed(() => {
      const p = orderData.value.post_office;
      if (p.length === 0) {
        return [];
      } else {
        return postOffices.value.filter((f) => f[`Description${route.params.locale === "uk" ? "" : "Ru"}`].indexOf(p.trim()) !== -1);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[locale]/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cart-a366a24c.mjs.map
