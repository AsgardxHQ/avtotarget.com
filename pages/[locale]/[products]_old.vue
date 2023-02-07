<template>
<div ref="elementContent">
  <div class="md:flex" v-if="currentItems.length > 0">
    <div class="sm:w-full md:w-2/6">
      <CatSidebar 
        :cars="cars"
        :suppliers="suppliers"
        :parts="parts"
        :getAllData="getAllData"
      ></CatSidebar>
    </div>
    <div class="sm:w-full md:w-6/8">
      <div v-if="part" class="w-full text-xl text-center uppercase">
        {{part[`name_${route.params.locale}`]}}
      </div>
      <div class="w-full px-2 py-3">
        <h3 class="text-2xl text-slate-600 border-b-2 border-zinc-500">{{ $t('new_supply') }}</h3>
      </div>
      <div class="w-full grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-12">
        <Item :items="currentItems"/>
      </div>
      {{pagination}}
      <button type="button" @click="getNextPage()">Показать еще...</button>
    </div>
  </div>
  <div v-if="isLoader" class="fixed inset-0 w-full h-full bg-slate-200/50 flex justify-center items-center">
    <span class="text-2xl text-slate-800">LOADING</span>
  </div>
</div>
</template>

<script lang="ts" setup>
import CatSidebar from "@/components/app/cat_sidebar.vue";
import Item from "@/components/app/item.vue";
import { getAllData } from "@/stores/index";
const route = useRoute();
const router = useRouter();
const isLoader = ref(false);
const currentItems = ref([]);
const elementContent = ref(null);
await getAllData().getItems({...route.query, limit: 20});
const { items, count_items } = getAllData();
currentItems.value = items;
const pagination = ref({
  count: count_items,
  pages: Math.ceil(count_items / 20),
  page: route.query.page
});
watch(route, async (to, from) => {
  isLoader.value = true;
  let str = "";
  for(let key in route.query) {
    if(route.query[key]) {
      str += `${key}=${route.query[key]}&`;
    }
  }
  const { items, count_items }:any = await getAllData().filteringItems({...to.query, limit: 20});
  if(to.query.page) {
    currentItems.value.push(...items);
  } else {
    currentItems.value = items;
  }
  pagination.value = {
    count: count_items,
    pages: Math.ceil(count_items / 20),
    page: route.query.page
  }
  isLoader.value = false;
});

const { cars, suppliers, parts } = getAllData().content;
const part = parts.find(f => f.id === +route.query.part_id);

const getNextPage = async () => {
  console.log('get next page');
  const obj:any = {};
  for(let key in route.query) {
    obj[key] = route.query[key];
  }
  if(obj.page) obj.page = parseInt(obj.page) + 1;
  else obj.page = 2;
  router.push({path: `/${route.params.locale}/products`, query: obj})
}
</script>