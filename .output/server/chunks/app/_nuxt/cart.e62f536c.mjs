import { v as vue_cjs_prod, u as useRoute, a as useRouter, c as cartStore, b as useAuthUser, d as __nuxt_component_0, e as __nuxt_component_0$1 } from '../server.mjs';
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
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const storeCart = cartStore();
    const currentuser = useAuthUser();
    const cart = vue_cjs_prod.computed(() => {
      return storeCart.cart;
    });
    const itemsId = {};
    cart.value.map((m) => {
      itemsId[m.id] = m.count;
    });
    const orderData = vue_cjs_prod.ref({
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
    const modal = vue_cjs_prod.ref(false);
    const getTotalPrice = () => {
      let total = 0;
      cart.value.map((item) => {
        total += item.price_retail * item.count;
      });
      const sum = total / 100;
      return parseFloat(sum.toString()).toFixed(2);
    };
    const postOffices = vue_cjs_prod.ref([]);
    const isShowPostOffices = vue_cjs_prod.ref(true);
    const searchPostOfficesbyCity = async () => {
      console.log(orderData.value.post_office);
      const { data } = await $fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "POST",
        body: {
          apiKey: "36546247000dc161cf93d55c035e8f1b",
          modelName: "Address",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityName: orderData.value.city
          }
        }
      });
      postOffices.value = data;
    };
    const filterPostOffices = vue_cjs_prod.computed(() => {
      const p = orderData.value.post_office;
      if (p.length === 0) {
        return [];
      } else {
        return postOffices.value.filter((f) => f[`Description${route.params.locale === "uk" ? "" : "Ru"}`].indexOf(p.trim()) !== -1);
      }
    });
    const choisePost = (text) => {
      orderData.value.post_office = text;
      isShowPostOffices.value = false;
    };
    const removeItem = (id) => {
      storeCart.delete(id);
    };
    const openModal = () => {
      document.body.classList.add("overflow-hidden");
      modal.value = true;
    };
    const closeModal = () => {
      document.body.classList.remove("overflow-hidden");
      modal.value = false;
    };
    const sendToOrder = async () => {
      try {
        await $fetch("/api/v1/order", { method: "POST", body: orderData.value });
        localStorage.removeItem("cart");
        storeCart.cart = [];
        router.replace(`/${route.params.locale}`);
      } catch (err) {
        console.log(err);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_client_only, null, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="w-full text-xl text-center uppercase mb-6"${_scopeId}>${serverRenderer.exports.ssrInterpolate(_ctx.$t("cart"))}</h1><div class="flex"${_scopeId}><div class="w-full px-4"${_scopeId}>`);
            if (vue_cjs_prod.unref(cart).length) {
              _push2(`<!--[-->`);
              serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(cart), (item) => {
                _push2(`<div class="w-full flex mb-2 border-t-2 p-2 relative"${_scopeId}>`);
                _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                  class: "w-4/12 pr-2",
                  to: `/${vue_cjs_prod.unref(route).params.locale}/product/${item.id}`
                }, {
                  default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (item.images && item.images.length > 0) {
                        _push3(`<img${serverRenderer.exports.ssrRenderAttr("src", `https://cdn.autotarget.com.ua/products/${item.images[0]}`)}${_scopeId2}>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        item.images && item.images.length > 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("img", {
                          key: 0,
                          src: `https://cdn.autotarget.com.ua/products/${item.images[0]}`
                        }, null, 8, ["src"])) : vue_cjs_prod.createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<div class="w-full mr-6"${_scopeId}>`);
                _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                  to: `/${vue_cjs_prod.unref(route).params.locale}/product/${item.id}`,
                  class: "text-md leading-5 text-sky-800"
                }, {
                  default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${serverRenderer.exports.ssrInterpolate(item[`name_${vue_cjs_prod.unref(route).params.locale}`])}`);
                    } else {
                      return [
                        vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<div class="flex justify-between mt-4"${_scopeId}><ul class="text-xs"${_scopeId}><li${_scopeId}><span class="font-bold"${_scopeId}>${serverRenderer.exports.ssrInterpolate(_ctx.$t("items.code_wholesale"))}: </span>${serverRenderer.exports.ssrInterpolate(item.code_wholesale)}</li><li${_scopeId}><span class="font-bold"${_scopeId}>${serverRenderer.exports.ssrInterpolate(_ctx.$t("items.code_vendor"))}: </span>${serverRenderer.exports.ssrInterpolate(item.code_vendor)}</li></ul><ul class="text-xs"${_scopeId}><li${_scopeId}><span class="font-bold"${_scopeId}>${serverRenderer.exports.ssrInterpolate(_ctx.$t("items.price"))}: </span>${serverRenderer.exports.ssrInterpolate(item.price_retail / 100)} \u0433\u0440\u043D.</li><li${_scopeId}><span class="font-bold"${_scopeId}>${serverRenderer.exports.ssrInterpolate(_ctx.$t("count_items"))}: </span>${serverRenderer.exports.ssrInterpolate(item.count)} \u0448\u0442.</li><li${_scopeId}><span class="font-bold"${_scopeId}>${serverRenderer.exports.ssrInterpolate(_ctx.$t("items.total_item"))}: </span> ${serverRenderer.exports.ssrInterpolate(item.price_retail / 100 * item.count)} \u0433\u0440\u043D.</li></ul></div></div><a href="#" class="absolute right-2 top-2 hover:rotate-90"${_scopeId}><i class="pi pi-times"${_scopeId}></i></a></div>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (vue_cjs_prod.unref(cart).length) {
              _push2(`<div class="w-52 relative"${_scopeId}><div class="fixed border rounded p-2 shadow-md"${_scopeId}><p class="text-md mb-4"${_scopeId}><span class="block mb-2"${_scopeId}>${serverRenderer.exports.ssrInterpolate(_ctx.$t("items.total"))}:</span><span class="font-bold"${_scopeId}>${serverRenderer.exports.ssrInterpolate(getTotalPrice())} \u0433\u0440\u043D.</span></p><button type="button" class="w-full bg-cyan-700 text-white hover:bg-cyan-900 py-2 px-6 text-xs uppercase font-bold rounded"${_scopeId}>${serverRenderer.exports.ssrInterpolate(_ctx.$t("order"))}</button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (modal.value) {
              _push2(`<div class="modal fixed top-0 left-0 w-full h-full flex justify-center items-center"${_scopeId}><div class="overlay fixed top-0 left-0 w-full h-full bg-slate-200 opacity-50 z-10"${_scopeId}></div><div class="w-80 relative z-20 bg-white py-2 px-4 rounded-md shadow-lg"${_scopeId}><form class="relative"${_scopeId}><a href="#" class="absolute -right-7 -top-5 rounded-full bg-white border border-slate-200 p-2"${_scopeId}><i class="pi pi-plus rotate-45"${_scopeId}></i></a><h2 class="text-2xl border-b border-slate-200"${_scopeId}>\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430</h2><div class="mt-2"${_scopeId}><label class="block mb-2"${_scopeId}><span class="text-xs mb-1 block"${_scopeId}>\u0424\u0418\u041E</span><input class="w-full form-input px-4 py-3 outline-0 border border-slate-200" type="text" name="fullname" placeholder="\u0424\u0418\u041E"${serverRenderer.exports.ssrRenderAttr("value", orderData.value.fullname)} required="true"${_scopeId}></label><label class="block mb-2"${_scopeId}><span class="text-xs mb-1 block"${_scopeId}>Email</span><input class="w-full form-input px-4 py-3 outline-0 border border-slate-200" type="email" name="email" placeholder="Email"${serverRenderer.exports.ssrRenderAttr("value", orderData.value.email)} required="true"${_scopeId}></label><label class="block mb-2"${_scopeId}><span class="text-xs mb-1 block"${_scopeId}>\u0422\u0435\u043B\u0435\u0444\u043E\u043D</span><input class="w-full form-input px-4 py-3 outline-0 border border-slate-200" type="tel" name="phone" placeholder="\u0422\u0435\u043B\u0435\u0444\u043E\u043D"${serverRenderer.exports.ssrRenderAttr("value", orderData.value.phone)} required="true"${_scopeId}></label><label class="block mb-2"${_scopeId}><span class="text-xs mb-1 block"${_scopeId}>\u0421\u043F\u043E\u0441\u043E\u0431 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438</span><select class="w-full form-input px-4 py-3 outline-0 border border-slate-200" name="delivery" required="true"${_scopeId}><option value=""${_scopeId}>\u0421\u043F\u043E\u0441\u043E\u0431 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438</option><option value="\u0441\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437"${_scopeId}>\u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437</option><option value="\u043D\u043E\u0432\u0430\u044F \u043F\u043E\u0447\u0442\u0430"${_scopeId}>\u041D\u043E\u0432\u0430\u044F \u043F\u043E\u0447\u0442\u0430</option></select></label>`);
              if (orderData.value.delivery === "\u043D\u043E\u0432\u0430\u044F \u043F\u043E\u0447\u0442\u0430") {
                _push2(`<!--[--><label class="block mb-2"${_scopeId}><span class="text-xs mb-1 block"${_scopeId}>\u0413\u043E\u0440\u043E\u0434</span><input class="w-full form-input px-4 py-3 outline-0 border border-slate-200" type="text" name="city" placeholder="\u0413\u043E\u0440\u043E\u0434"${serverRenderer.exports.ssrRenderAttr("value", orderData.value.city)} required="true"${_scopeId}></label>`);
                if (orderData.value.city.length != 0) {
                  _push2(`<label class="block mb-2 relative"${_scopeId}><span class="text-xs mb-1 block"${_scopeId}>\u041E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0447\u0442\u044B</span><input class="w-full form-input px-4 py-3 outline-0 border border-slate-200" type="text" name="post_office" placeholder="\u041E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0447\u0442\u044B"${serverRenderer.exports.ssrRenderAttr("value", orderData.value.post_office)} required="true"${_scopeId}>`);
                  if (postOffices.value.length > 0 && orderData.value.post_office.length > 0) {
                    _push2(`<ul style="${serverRenderer.exports.ssrRenderStyle(isShowPostOffices.value ? null : { display: "none" })}" class="max-h-40 overflow-auto absolute bg-white border border-slate-200"${_scopeId}><!--[-->`);
                    serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(filterPostOffices), (el, index) => {
                      _push2(`<li class="px-2 mb-2 text-xs hover:bg-slate-200"${_scopeId}>${serverRenderer.exports.ssrInterpolate(el[vue_cjs_prod.unref(route).params.locale === "uk" ? "Description" : "DescriptionRu"])}</li>`);
                    });
                    _push2(`<!--]--></ul>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</label>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<label class="block mb-2"${_scopeId}><span class="text-xs mb-1 block"${_scopeId}>\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435 \u043A \u0437\u0430\u043A\u0430\u0437\u0443</span><textarea class="w-full form-input px-4 py-3 outline-0 border border-slate-200" rows="4"${_scopeId}>${serverRenderer.exports.ssrInterpolate(orderData.value.description)}</textarea></label><div class="flex justify-between items-center"${_scopeId}><button type="button" class="py-2 px-4 border border-slate-200 rounded hover:bg-slate-100"${_scopeId}>\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button><button type="submit" class="bg-cyan-700 text-white hover:bg-cyan-900 py-2 px-6 text-xs uppercase font-bold rounded"${_scopeId}>\u041A\u0443\u043F\u0438\u0442\u044C</button></div></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vue_cjs_prod.createVNode("h1", { class: "w-full text-xl text-center uppercase mb-6" }, vue_cjs_prod.toDisplayString(_ctx.$t("cart")), 1),
              vue_cjs_prod.createVNode("div", { class: "flex" }, [
                vue_cjs_prod.createVNode("div", { class: "w-full px-4" }, [
                  vue_cjs_prod.unref(cart).length ? (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, { key: 0 }, vue_cjs_prod.renderList(vue_cjs_prod.unref(cart), (item) => {
                    return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                      class: "w-full flex mb-2 border-t-2 p-2 relative",
                      key: item.id
                    }, [
                      vue_cjs_prod.createVNode(_component_NuxtLink, {
                        class: "w-4/12 pr-2",
                        to: `/${vue_cjs_prod.unref(route).params.locale}/product/${item.id}`
                      }, {
                        default: vue_cjs_prod.withCtx(() => [
                          item.images && item.images.length > 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("img", {
                            key: 0,
                            src: `https://cdn.autotarget.com.ua/products/${item.images[0]}`
                          }, null, 8, ["src"])) : vue_cjs_prod.createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1032, ["to"]),
                      vue_cjs_prod.createVNode("div", { class: "w-full mr-6" }, [
                        vue_cjs_prod.createVNode(_component_NuxtLink, {
                          to: `/${vue_cjs_prod.unref(route).params.locale}/product/${item.id}`,
                          class: "text-md leading-5 text-sky-800"
                        }, {
                          default: vue_cjs_prod.withCtx(() => [
                            vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item[`name_${vue_cjs_prod.unref(route).params.locale}`]), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"]),
                        vue_cjs_prod.createVNode("div", { class: "flex justify-between mt-4" }, [
                          vue_cjs_prod.createVNode("ul", { class: "text-xs" }, [
                            vue_cjs_prod.createVNode("li", null, [
                              vue_cjs_prod.createVNode("span", { class: "font-bold" }, vue_cjs_prod.toDisplayString(_ctx.$t("items.code_wholesale")) + ": ", 1),
                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.code_wholesale), 1)
                            ]),
                            vue_cjs_prod.createVNode("li", null, [
                              vue_cjs_prod.createVNode("span", { class: "font-bold" }, vue_cjs_prod.toDisplayString(_ctx.$t("items.code_vendor")) + ": ", 1),
                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.code_vendor), 1)
                            ])
                          ]),
                          vue_cjs_prod.createVNode("ul", { class: "text-xs" }, [
                            vue_cjs_prod.createVNode("li", null, [
                              vue_cjs_prod.createVNode("span", { class: "font-bold" }, vue_cjs_prod.toDisplayString(_ctx.$t("items.price")) + ": ", 1),
                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.price_retail / 100) + " \u0433\u0440\u043D.", 1)
                            ]),
                            vue_cjs_prod.createVNode("li", null, [
                              vue_cjs_prod.createVNode("span", { class: "font-bold" }, vue_cjs_prod.toDisplayString(_ctx.$t("count_items")) + ": ", 1),
                              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(item.count) + " \u0448\u0442.", 1)
                            ]),
                            vue_cjs_prod.createVNode("li", null, [
                              vue_cjs_prod.createVNode("span", { class: "font-bold" }, vue_cjs_prod.toDisplayString(_ctx.$t("items.total_item")) + ": ", 1),
                              vue_cjs_prod.createTextVNode(" " + vue_cjs_prod.toDisplayString(item.price_retail / 100 * item.count) + " \u0433\u0440\u043D.", 1)
                            ])
                          ])
                        ])
                      ]),
                      vue_cjs_prod.createVNode("a", {
                        href: "#",
                        class: "absolute right-2 top-2 hover:rotate-90",
                        onClick: vue_cjs_prod.withModifiers(($event) => removeItem(item.id), ["prevent"])
                      }, [
                        vue_cjs_prod.createVNode("i", { class: "pi pi-times" })
                      ], 8, ["onClick"])
                    ]);
                  }), 128)) : vue_cjs_prod.createCommentVNode("", true)
                ]),
                vue_cjs_prod.unref(cart).length ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                  key: 0,
                  class: "w-52 relative"
                }, [
                  vue_cjs_prod.createVNode("div", { class: "fixed border rounded p-2 shadow-md" }, [
                    vue_cjs_prod.createVNode("p", { class: "text-md mb-4" }, [
                      vue_cjs_prod.createVNode("span", { class: "block mb-2" }, vue_cjs_prod.toDisplayString(_ctx.$t("items.total")) + ":", 1),
                      vue_cjs_prod.createVNode("span", { class: "font-bold" }, vue_cjs_prod.toDisplayString(getTotalPrice()) + " \u0433\u0440\u043D.", 1)
                    ]),
                    vue_cjs_prod.createVNode("button", {
                      onClick: ($event) => openModal(),
                      type: "button",
                      class: "w-full bg-cyan-700 text-white hover:bg-cyan-900 py-2 px-6 text-xs uppercase font-bold rounded"
                    }, vue_cjs_prod.toDisplayString(_ctx.$t("order")), 9, ["onClick"])
                  ])
                ])) : vue_cjs_prod.createCommentVNode("", true)
              ]),
              modal.value ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                key: 0,
                class: "modal fixed top-0 left-0 w-full h-full flex justify-center items-center"
              }, [
                vue_cjs_prod.createVNode("div", {
                  class: "overlay fixed top-0 left-0 w-full h-full bg-slate-200 opacity-50 z-10",
                  onClick: ($event) => closeModal()
                }, null, 8, ["onClick"]),
                vue_cjs_prod.createVNode("div", { class: "w-80 relative z-20 bg-white py-2 px-4 rounded-md shadow-lg" }, [
                  vue_cjs_prod.createVNode("form", {
                    class: "relative",
                    onSubmit: vue_cjs_prod.withModifiers(($event) => sendToOrder(), ["prevent"])
                  }, [
                    vue_cjs_prod.createVNode("a", {
                      href: "#",
                      class: "absolute -right-7 -top-5 rounded-full bg-white border border-slate-200 p-2",
                      onClick: vue_cjs_prod.withModifiers(($event) => closeModal(), ["prevent"])
                    }, [
                      vue_cjs_prod.createVNode("i", { class: "pi pi-plus rotate-45" })
                    ], 8, ["onClick"]),
                    vue_cjs_prod.createVNode("h2", { class: "text-2xl border-b border-slate-200" }, "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430"),
                    vue_cjs_prod.createVNode("div", { class: "mt-2" }, [
                      vue_cjs_prod.createVNode("label", { class: "block mb-2" }, [
                        vue_cjs_prod.createVNode("span", { class: "text-xs mb-1 block" }, "\u0424\u0418\u041E"),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                          class: "w-full form-input px-4 py-3 outline-0 border border-slate-200",
                          type: "text",
                          name: "fullname",
                          placeholder: "\u0424\u0418\u041E",
                          "onUpdate:modelValue": ($event) => orderData.value.fullname = $event,
                          required: "true"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelText, orderData.value.fullname]
                        ])
                      ]),
                      vue_cjs_prod.createVNode("label", { class: "block mb-2" }, [
                        vue_cjs_prod.createVNode("span", { class: "text-xs mb-1 block" }, "Email"),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                          class: "w-full form-input px-4 py-3 outline-0 border border-slate-200",
                          type: "email",
                          name: "email",
                          placeholder: "Email",
                          "onUpdate:modelValue": ($event) => orderData.value.email = $event,
                          required: "true"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelText, orderData.value.email]
                        ])
                      ]),
                      vue_cjs_prod.createVNode("label", { class: "block mb-2" }, [
                        vue_cjs_prod.createVNode("span", { class: "text-xs mb-1 block" }, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                          class: "w-full form-input px-4 py-3 outline-0 border border-slate-200",
                          type: "tel",
                          name: "phone",
                          placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
                          "onUpdate:modelValue": ($event) => orderData.value.phone = $event,
                          required: "true"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelText, orderData.value.phone]
                        ])
                      ]),
                      vue_cjs_prod.createVNode("label", { class: "block mb-2" }, [
                        vue_cjs_prod.createVNode("span", { class: "text-xs mb-1 block" }, "\u0421\u043F\u043E\u0441\u043E\u0431 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("select", {
                          class: "w-full form-input px-4 py-3 outline-0 border border-slate-200",
                          name: "delivery",
                          "onUpdate:modelValue": ($event) => orderData.value.delivery = $event,
                          required: "true"
                        }, [
                          vue_cjs_prod.createVNode("option", { value: "" }, "\u0421\u043F\u043E\u0441\u043E\u0431 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"),
                          vue_cjs_prod.createVNode("option", { value: "\u0441\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437" }, "\u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437"),
                          vue_cjs_prod.createVNode("option", { value: "\u043D\u043E\u0432\u0430\u044F \u043F\u043E\u0447\u0442\u0430" }, "\u041D\u043E\u0432\u0430\u044F \u043F\u043E\u0447\u0442\u0430")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelSelect, orderData.value.delivery]
                        ])
                      ]),
                      orderData.value.delivery === "\u043D\u043E\u0432\u0430\u044F \u043F\u043E\u0447\u0442\u0430" ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, { key: 0 }, [
                        vue_cjs_prod.createVNode("label", { class: "block mb-2" }, [
                          vue_cjs_prod.createVNode("span", { class: "text-xs mb-1 block" }, "\u0413\u043E\u0440\u043E\u0434"),
                          vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                            onChange: ($event) => searchPostOfficesbyCity(),
                            class: "w-full form-input px-4 py-3 outline-0 border border-slate-200",
                            type: "text",
                            name: "city",
                            placeholder: "\u0413\u043E\u0440\u043E\u0434",
                            "onUpdate:modelValue": ($event) => orderData.value.city = $event,
                            required: "true"
                          }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                            [vue_cjs_prod.vModelText, orderData.value.city]
                          ])
                        ]),
                        orderData.value.city.length != 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("label", {
                          key: 0,
                          class: "block mb-2 relative"
                        }, [
                          vue_cjs_prod.createVNode("span", { class: "text-xs mb-1 block" }, "\u041E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0447\u0442\u044B"),
                          vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("input", {
                            onInput: ($event) => {
                              isShowPostOffices.value = true;
                            },
                            class: "w-full form-input px-4 py-3 outline-0 border border-slate-200",
                            type: "text",
                            name: "post_office",
                            placeholder: "\u041E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0447\u0442\u044B",
                            "onUpdate:modelValue": ($event) => orderData.value.post_office = $event,
                            required: "true"
                          }, null, 40, ["onInput", "onUpdate:modelValue"]), [
                            [vue_cjs_prod.vModelText, orderData.value.post_office]
                          ]),
                          postOffices.value.length > 0 && orderData.value.post_office.length > 0 ? vue_cjs_prod.withDirectives((vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("ul", {
                            key: 0,
                            class: "max-h-40 overflow-auto absolute bg-white border border-slate-200"
                          }, [
                            (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(filterPostOffices), (el, index) => {
                              return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("li", {
                                key: index,
                                onClick: ($event) => choisePost(el[vue_cjs_prod.unref(route).params.locale === "uk" ? "Description" : "DescriptionRu"]),
                                class: "px-2 mb-2 text-xs hover:bg-slate-200"
                              }, vue_cjs_prod.toDisplayString(el[vue_cjs_prod.unref(route).params.locale === "uk" ? "Description" : "DescriptionRu"]), 9, ["onClick"]);
                            }), 128))
                          ], 512)), [
                            [vue_cjs_prod.vShow, isShowPostOffices.value]
                          ]) : vue_cjs_prod.createCommentVNode("", true)
                        ])) : vue_cjs_prod.createCommentVNode("", true)
                      ], 64)) : vue_cjs_prod.createCommentVNode("", true),
                      vue_cjs_prod.createVNode("label", { class: "block mb-2" }, [
                        vue_cjs_prod.createVNode("span", { class: "text-xs mb-1 block" }, "\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435 \u043A \u0437\u0430\u043A\u0430\u0437\u0443"),
                        vue_cjs_prod.withDirectives(vue_cjs_prod.createVNode("textarea", {
                          class: "w-full form-input px-4 py-3 outline-0 border border-slate-200",
                          rows: "4",
                          "onUpdate:modelValue": ($event) => orderData.value.description = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vue_cjs_prod.vModelText, orderData.value.description]
                        ])
                      ]),
                      vue_cjs_prod.createVNode("div", { class: "flex justify-between items-center" }, [
                        vue_cjs_prod.createVNode("button", {
                          type: "button",
                          class: "py-2 px-4 border border-slate-200 rounded hover:bg-slate-100",
                          onClick: ($event) => closeModal()
                        }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", 8, ["onClick"]),
                        vue_cjs_prod.createVNode("button", {
                          type: "submit",
                          class: "bg-cyan-700 text-white hover:bg-cyan-900 py-2 px-6 text-xs uppercase font-bold rounded"
                        }, "\u041A\u0443\u043F\u0438\u0442\u044C")
                      ])
                    ])
                  ], 40, ["onSubmit"])
                ])
              ])) : vue_cjs_prod.createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[locale]/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cart.e62f536c.mjs.map
