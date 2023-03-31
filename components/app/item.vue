<template>
  <div 
    v-for="item in items"
    :key="item.id"
    class="group m-2 relative"
  >
    <div class="
      transition ease-in-out
      group-hover:scale-110
      group-hover:absolute
      group-hover:shadow-lg
      z-50
      bg-zinc-100
      rounded-md
      shadow-md
    ">
      <NuxtLink
        :title="item[`name_${$route.params.locale}`]"
        :to="`/${$route.params.locale}/product/${item.id}`"
        class="block mb-2"
      >
        <!--${item.images[0]}-->
        <!-- <ClientOnly> -->
        <img 
          class="w-full h-40 object-cover" 
          v-if="item.images && item.images.length > 0" 
          :src="`https://cdn.autotarget.com.ua/products/${item.images[0]}`"> <!--${getImage(item.images[0])}-->
        <!-- </ClientOnly> -->
      </NuxtLink>
      <NuxtLink 
        :title="item[`name_${$route.params.locale}`]"
        :to="`/${$route.params.locale}/product/${item.id}`"
        class="item-name block h-10 overflow-hidden text-sm text-slate-500 transition group-hover:text-slate-900 px-2 mb-2"
      >
        {{item[`name_${$route.params.locale}`]}}
      </NuxtLink>
      <div class="h-12">
        <ul class="text-xs px-2 mb-2">
          <li class="font-bold"><span class="font-normal">Код товара: </span>{{item.code_vendor}}</li>
          <li class="font-bold"><span class="font-normal">Код про-ля: </span>{{item.code_wholesale}}</li>
        </ul>
      </div>
      <div class="flex items-center">
        <span class="block w-1/2 px-2 text-slate-600 text-sm font-bold whitespace-nowrap">{{item.price_retail / 100}} грн.</span>
        <button 
          type="button" 
          class="w-1/2 text-sky-900 bg-inherit group-hover:bg-cyan-700 group-hover:text-sky-100 py-2 rounded-br-md"
          @click.prevent="addToCart(item.id)"
        >
          {{ $t('to_cart') }}
        </button>
      </div>
    </div>
  </div>
  <div ref="cartNotice" class="cart-notice">
    <span>Товар добавлен в корзину!</span>
  </div>
</template>

<script setup lang="ts">
import { cartStore } from '@/stores/cart';
const { items } = defineProps({
  items: Array<any>,
});
const cartNotice = ref(null);
const addToCart = (id:number) => {
  cartStore().set(id, 1);
  cartNotice.value.style.opacity = 1;
  setTimeout(() => {
    cartNotice.value.style.opacity = 0;
  }, 2000);
  return;
}
const getImage = (path:string) => {
  const img = new URL(`../../files/products/${path}`, import.meta.url);
  return img;
}
</script>