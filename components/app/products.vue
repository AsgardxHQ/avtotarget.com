<template>
  <div class="md:flex">
    <div class="sm:w-full md:w-3/12">
      <filterComponent class="product-page" />
    </div>
    <div class="sm:w-full md:w-9/12">
      <div v-if="currentCategory" class="w-full text-xl text-center uppercase">
        {{ currentCategory[`name_${route.params.locale}`]}}
      </div>
      <div class="w-full px-2 py-3">
        <h3 class="text-2xl text-slate-600 border-b-2 border-zinc-500">{{ $t('new_supply') }}</h3>
      </div>
      <div v-if="currentItems && currentItems.length > 0"
        class="w-full grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mb-12">
        <Item :items="currentItems" />
      </div>
      {{ pagination }}
      <NuxtLink :to="{ params: { page: +route.params.page + 1 }, query: route.query }">next page</NuxtLink>
    </div>
    <div v-if="isLoader" class="fixed inset-0 w-full h-full bg-slate-200/50 flex justify-center items-center">
      <span class="text-2xl text-slate-800">LOADING</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import filterComponent from "@/components/app/filter.vue";
  import Item from "@/components/app/item.vue";
  import { getAllData } from "@/stores/index";
  const route = useRoute();
  const currentItems = ref([]);
  const currentCategory = ref([]);
  const isLoader = ref(false);
  const getData = async () => {
    const {items, count} = await getAllData().getItems(route.params, route.query);
    currentItems.value = items;
    pagination.value.count = +count;

  }
  const pagination = ref({
    count: 0
  });
  getData();
  watch(() => route.query, async (newQuery, oldQuery) => {
    getData()
  });

</script>