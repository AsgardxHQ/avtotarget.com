<template>
<div v-if="renderItem && Object.keys(renderItem).length > 0">
  <div class="w-full flex mt-8">
    <div class="w-2/5 px-5">
      <div>
        <img :src="`/images/products/${renderItem.images[0]}` || '/images/no_image.png'"/>
      </div>
    </div>
    <div class="w-3/5 px-5 divide-y divide-slate-200">
      <h1 class="text-slate-600 pb-3">{{renderItem[`name_${route.params.locale}`]}}</h1>
      <div class="py-3">
        <ul class="text-xs">
          <li class="mb-2"><span class="font-bold">{{ $t('items.code_vendor') }}: </span>{{renderItem.code_vendor}}</li>
          <li class="mb-2" v-if="mainCategory"><span class="font-bold">{{mainCategory[`name_${route.params.locale}`]}}: </span>{{renderItem.category[`name_${route.params.locale}`]}}</li>
          <template v-for="(f, index) in mainFilters" :key="index">
            <li class="mb-2"><span class="font-bold">{{ f[`name_${route.params.locale}`] }}: </span>{{renderItem.filters.find(cur => cur.parent_id === f.id)[`name_${route.params.locale}`]}}</li>
          </template>
          <!-- <li><span class="font-bold">{{ $t('items.car') }}: </span>{{renderItem.car[`name_${route.params.locale}`] === 'all' ? $t('all') : renderItem.car[`name_${route.params.locale}`]}}</li> -->
        </ul>
      </div>
      <div class="py-3">
        <span>
          <span>{{ $t('items.price') }}: </span>
          {{renderItem.price_retail / 100}} грн.
        </span>
      </div>
      <div class="flex items-center py-3">
        <div>
          <span>{{ $t('count_items')}}: </span>
          <input class="w-10 h-8 text-center outline-none mx-2 py-1 rounded text-xs" type="tel" name="count" v-model="count"/>
        </div>
        <button class="h-8 bg-cyan-700 text-sky-100 px-4 py-1 rounded" @click.prevent="addToCart(renderItem.id)">{{ $t('to_cart') }}</button>
      </div>
    </div>
  </div>
  <div class="w-full px-5 mt-8" v-html="renderItem.fields[`description_${route.params.locale}`]">
  </div>
</div>
</template>

<script lang="ts" setup>
import { cartStore } from '@/stores/cart';
const route = useRoute();
const count = ref(1);
const renderItem:any = ref({});
onUnmounted(() => {
  delete useNuxtApp().payload.data['item']
});
onMounted(() => {
  delete useNuxtApp().payload.data['item']
});
const { data, pending, refresh } = await useAsyncData('item', () => 
  $fetch(
    `/api/v1/${route.params.productId}`,
  )
);
const { item, mainFilters, mainCategory }:any = data.value;
renderItem.value = item;

const addToCart = (id:number) => {
  if(+count.value > 0) {
    cartStore().set(id, +count.value);
  }
  count.value = 1;
  return;
}
</script>