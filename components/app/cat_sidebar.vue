<template>
  <div class="pr-2 border-r border-slate-300">
    <h4 class="text-xl border-b border-slate-300 mb-2 pb-2">Фильтр</h4>
    <div class="w-full mb-2">
      <div class="w-full mb-2">
        <select class="w-full form-input px-4 py-3 outline-0" @change="changeCategory()" v-model="filter.category">
          <option :value="null">{{ $t('choise_category') }}</option>
          <template v-for="category in categories" :key="category.id">
          <option v-if="category.parent_id === 0" :value="category.id">{{category[`name_${route.params.locale}`]}}</option>
          </template>
        </select>
      </div>
      <template v-if="filter.category">
        <div class="w-full mb-2">
          <select class="w-full form-input px-4 py-3 outline-0" v-model="filter.subcategory">
            <option :value="null">{{ $t('choise_cars') }}</option>
            <template v-for="category in categories" :key="category.id">
            <option v-if="category.parent_id === filter.category" :value="category.id">{{ category[`name_${$route.params.locale}`] }}</option>
            </template>
          </select>
        </div>
        <template v-for="(f, index) in arrFilters" :key="index">
          <div class="w-full mb-2">
            <select class="w-full form-input px-4 py-3 outline-0" v-model="filter.sort[f.id]">
              <option :value="null">{{f[`name_${route.params.locale}`]}}</option>
              <template v-for="elem in filters" :key="elem.id">
              <option v-if="elem.parent_id === f.id && elem.parent_id !== 0" :value="elem.id">{{ elem[`name_${route.params.locale}`] }}</option>
              </template>
            </select>
          </div>
        </template>
      </template>
    </div>
    <button class="w-full py-4 mb-2 bg-slate-600 text-gray-100 uppercase font-bold" @click.prevent="submitFilter()">Знайти</button> 
  </div>
</template>

<script setup lang="ts">

const router = useRouter();
const route = useRoute();
const { data:filters } = await useFetch('/api/v1/filters');
const { data:categories } = await useFetch('/api/v1/categories');
const { category } = defineProps({
  category: Object
})
const filter = ref({
  category: category.id,
  subcategory: null,
  sort: {}
});

const arrFilters = computed(() => {
  const currentFilters = categories.value.find(f => f.id === filter.value.category);
  return filters.value.filter(f => currentFilters.filter_id.indexOf(f.id) !== -1) || [];
});

const setToDefaultFilter = () => {
  arrFilters.value.map(f => {
    filter.value.sort[f.id] = null;
  });
}
setToDefaultFilter();


if(route.query.filter) {
  let replaceFilter = route.query.filter.indexOf(',') ? route.query.filter.split(',') : [+route.query.filter];
  replaceFilter = replaceFilter.map(m => parseInt(m));
  filters.value.map(f => {
    if(replaceFilter.indexOf(f.id) !== -1) {
      filter.value.sort[f.parent_id] = f.id;
    }
  });
}
if(route.query.subcategory) {
  filter.value.subcategory = route.query.subcategory;
}

const changeCategory = () => {
  filter.value.subcategory = null;
  setToDefaultFilter();
}
const submitFilter = () => {
  const categoryUrl = categories.value.find((f:any) => f.id === filter.value.category).url;
  const filterForQuery = [];
  for(let key in filter.value.sort) {
    if(filter.value.sort[key]) {
      filterForQuery.push(filter.value.sort[key])
    }
  }
  router.push({path: `/${route.params.locale}/${categoryUrl}`, query: {subcategory: filter.value.subcategory, filter: filterForQuery.toString()}});
}
</script>