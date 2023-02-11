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
        <!-- <NuxtLink :to="{ params: { page: +route.params.page + 1 }, query: route.query }"
          class="group m-2 relative"
        >
          <div class="transition ease-in-out group-hover:scale-110 group-hover:absolute group-hover:shadow-lg z-50 bg-zinc-100 rounded-md shadow-md h-full flex items-center justify-center w-full">
            <span class="text-xl uppercase font-bold">{{ $t('show_more') }}</span>
          </div>
        </NuxtLink> -->
      </div>
      <Pagination :pagination="pagination" />
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
  import { getAllData } from "@/stores/index";
  const route = useRoute();
  const currentItems = ref([]);
  const currentCategory = ref([]);
  const isLoader = ref(false);
  const pagination = ref({
    count: 0
  });
  const getData = async () => {
    const {items, count} = await getAllData().getItems(route.params, route.query);
    currentItems.value = items;
    pagination.value.count = +count;

  }
  getData();
  watch(() => route.query, async (newQuery, oldQuery) => {
    getData()
  });

</script>