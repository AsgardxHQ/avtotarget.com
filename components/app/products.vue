<template>
  <div class="md:flex">
    <div class="sm:w-full md:w-3/12">
      <filterComponent @changeQuery="changeQuery" class="product-page" />
    </div>
    <div class="sm:w-full md:w-9/12">
      <div v-if="currentCategory" class="w-full text-xl text-center uppercase">
        {{ currentCategory[`name_${route.params.locale}`]}}
      </div>
      <div class="w-full px-2 py-3">
        <h3 class="text-2xl text-slate-600 border-b-2 border-zinc-500">{{ $t('new_supply') }}</h3>
      </div>
      <template v-if="currentItems && currentItems.length > 0">
      <div class="w-full grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mb-12">
        <Item :items="currentItems" />
      </div>
      <Pagination :pagination="pagination" />
      </template>
    </div>
    <div v-if="isLoader" class="fixed inset-0 w-full h-full bg-slate-200/50 flex justify-center items-center">
      <span class="text-2xl text-slate-800">LOADING</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Pagination from "@/components/app/pagination.vue";
  import filterComponent from "@/components/app/filter.vue";
  import Item from "@/components/app/item.vue";
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
    let str = ""
    for(let key in query) {
      if(key && query[key]) {
        str += `${key}=${query[key]}&`;
      }
    }
    return str;
  }
  
  const getData = async (query = route.query) => {
    const { data, refresh }:any = await useFetch(`/api/v1/items?${queryToString(route.params)}${queryToString(query)}&limit=21`)
    await refresh({ dedupe: true })
    currentItems.value = data.value.items;
    pagination.value.count = +data.value.count;
  }
  await getData();

</script>