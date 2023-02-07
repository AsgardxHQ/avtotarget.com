<template>
  <div class="relative group">
    <NuxtLink class="group-hover:bg-slate-200 rounded-md px-3 py-4 relative" :to="`/${$route.params.locale}/cart`" :title="$t('cart')">
      <span class="rounded-full bg-slate-300/75 w-4 h-4 flex justify-center items-center absolute text-xs top-2 right-1">{{ cart.length }}</span>
      {{ $t('cart') }} <i class="pi pi-shopping-cart text-xl"></i>
    </NuxtLink>
    <div class="w-96 bg-gray-50 z-40 shadow-md rounded absolute right-0 top-8 hidden group-hover:block">
      <ul>
        <li v-for="item in cart" :key="item.id" class="flex items-center p-2 text-xs relative border-b">
          <NuxtLink class="w-1/4" :to="`/${$route.params.locale}/product/${item.id}`" :title="item[`name_${$route.params.locale}`]">
            <img :src="item.images[0] || '/images/no_image.png'"/>
          </NuxtLink>
          <div class="w-2/4 px-2">
            <NuxtLink :to="`/${$route.params.locale}/product/${item.id}`" :title="item[`name_${$route.params.locale}`]">
              {{item[`name_${$route.params.locale}`]}}
            </NuxtLink>
          </div>
          <div class="w-1/4 text-center"><span>Кол-во: </span>{{ item.count }}</div>
          <a class="absolute right-1 top-1 opacity-25 hover:opacity-100" href="javascript:void" @click.prevent="removeItem(item.id)"><i class="pi pi-times"></i></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cartStore } from '@/stores/cart';
const storeCart = cartStore();
const cart:any = computed(() => {
  return storeCart.cart;
})
const removeItem = (id:number) => {
  storeCart.delete(id);
}
</script>