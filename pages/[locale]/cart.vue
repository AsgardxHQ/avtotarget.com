<template>
  <div>
    <h1 class="w-full text-xl text-center uppercase mb-6">
      {{$t('cart')}}
    </h1>
    <div class="flex">
      <div class="w-full px-4">
        <div class="w-full flex mb-2 border-t-2 p-2 relative" v-if="cart.length" v-for="item in cart" :key="item.id">
          <NuxtLink class="w-4/12 pr-2" :to="`/${route.params.locale}/product/${item.id}`">
            <img :src="item.images[0] || '/images/no_image.png'"/>
          </NuxtLink>
          <div class="w-full mr-6">
            <NuxtLink :to="`/${route.params.locale}/product/${item.id}`" class="text-md leading-5 text-sky-800">{{item[`name_${route.params.locale}`]}}</NuxtLink>
            <div class="flex justify-between mt-4">
              <ul class="text-xs">
                <li><span class="font-bold">{{ $t('items.code_wholesale') }}: </span>{{item.code_wholesale}}</li>
                <li><span class="font-bold">{{ $t('items.code_vendor') }}: </span>{{item.code_vendor}}</li>
                <!-- <li v-if="mainCategory"><span class="font-bold">{{mainCategory[`name_${route.params.locale}`]}}: </span>{{item.category[`name_${route.params.locale}`]}}</li>
                <template v-for="(f, index) in mainFilters" :key="index">
                  <li><span class="font-bold">{{ f[`name_${route.params.locale}`] }}: </span>{{item.filters.find(cur => cur.parent_id === f.id)[`name_${route.params.locale}`]}}</li>
                </template> -->
              </ul>
              <ul class="text-xs">
                <li><span class="font-bold">{{$t('items.price')}}: </span>{{item.price_retail / 100}} грн.</li>
                <li><span class="font-bold">{{$t('count_items')}}: </span>{{item.count}} шт.</li>
                <li><span class="font-bold">{{$t('items.total_item')}}: </span> {{ (item.price_retail / 100) * item.count }} грн.</li>
              </ul>
            </div>
          </div>
          <a href="#" class="absolute right-2 top-2 hover:rotate-90" @click.prevent="removeItem(item.id)"><i class="pi pi-times"></i></a>
        </div>
      </div>
      <div class="w-52 relative" v-if="cart.length">
        <div class="fixed border rounded p-2 shadow-md">
          <p class="text-md mb-4"><span class="block mb-2">{{ $t('items.total') }}:</span><span class="font-bold">{{ getTotalPrice() }} грн.</span></p>
          <button type="button" class="w-full bg-cyan-700 text-white hover:bg-cyan-900 py-2 px-6 text-xs uppercase font-bold rounded">{{$t('order')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { cartStore } from '~~/stores/cart';
import type { Item } from '~~/types';
const route = useRoute();
const storeCart = cartStore();
const cart:any = computed(() => {
  return storeCart.cart;
})
const getTotalPrice = ():string => {
  let total = 0;
  cart.value.map((item:Item) => {
    total += item.price_retail * item.count;
  });
  const sum:number = total / 100;
  return parseFloat(sum.toString()).toFixed(2);
}

const removeItem = (id:number) => {
  storeCart.delete(id);
}

</script>