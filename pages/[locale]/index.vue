<template>
  <div>
    <Slider />
    <Filter class="main-page" />
    <div class="v-full px-2 py-3">
      <h3 class="text-2xl text-slate-600 border-b-2 border-zinc-500">{{ $t('new_supply') }}</h3>
    </div>
    <div class="w-full grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-12">
      <Item :items="data.items"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Slider from "@/components/app/slider.vue";
import Filter from "@/components/app/filter.vue";
import Item from "@/components/app/item.vue";
// import { getAllData } from "@/stores/index";
// const data = getAllData().content;
const { data }:any = await useAsyncData(
  'mainItems',
  () => $fetch('/api/v1/items?limit=20')
)
</script>