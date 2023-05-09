<template>
<div v-if="categories.length > 0">
  <div class="px-2 pt-3">
    <h3 class="text-2xl text-slate-600 border-b-2 border-zinc-700">{{ $t('filter') }}</h3>
  </div>
  <div class="container py-3 items-end">
    <div class="wrapper mb-2">
      <div class="select-block px-2">
        <label>
          <span class="text-xs mb-1 block">Категория</span>
          <select class="w-full form-input px-4 py-3 outline-0" v-model="filterData.category">
            <option :value="null">Категория</option>
            <template v-for="category in categories" :key="category.id">
            <option v-if="category.parent_id === 0" :value="category.id">{{category[`name_${route.params.locale}`]}}</option>
            </template>
          </select>
        </label>
      </div>
      <template v-if="filterData.category">
        <div class="select-block px-2">
          <label>
            <span class="text-xs mb-1 block">Сабкатегория</span>
            <select class="w-full form-input px-4 py-3 outline-0" v-model="filterData.subcategory">
              <option :value="null">Сабкатегория</option>
              <template v-for="category in categories" :key="category.id">
              <option v-if="category.parent_id === filterData.category" :value="category.id">{{ category[`name_${$route.params.locale}`] }}</option>
              </template>
            </select>
          </label>
        </div>
      </template>
      <div class="select-block px-2">
        <label>
          <span class="text-xs mb-1 block">Марка</span>
          <select class="w-full form-input px-4 py-3 outline-0" v-model="filterData.make">
            <option :value="null">Марка</option>
            <template v-for="filter in filters" :key="filter.id">
            <option v-if="filter.parent_id === 3" :value="filter.id">{{ filter[`name_${$route.params.locale}`] }}</option>
            </template>
          </select>
        </label>
      </div>
      <template v-if="filterData.make && modelsList.length > 0">
        <div class="select-block px-2">
          <label>
            <span class="text-xs mb-1 block">Модель</span>
            <select class="w-full form-input px-4 py-3 outline-0" v-model="filterData.model">
            <option :value="null">Модель</option>
            <template v-for="filter in filters" :key="filter.id">
            <option v-if="filter.parent_id === filterData.make" :value="filter.id">{{ filter[`name_${$route.params.locale}`] }}</option>
            </template>
          </select>
          </label>
        </div>
      </template>
      <div class="select-block px-2">
        <label>
          <span class="text-xs mb-1 block">Производитель</span>
          <select class="w-full form-input px-4 py-3 outline-0" v-model="filterData.supplier">
          <option :value="null">Производитель</option>
          <template v-for="filter in filters" :key="filter.id">
          <option v-if="filter.parent_id === 2 && filter[`name_${$route.params.locale}`]" :value="filter.id">{{ filter[`name_${$route.params.locale}`] }}</option>
          </template>
        </select>
        </label>
      </div>
    </div>
    <button class="filter-btn mx-2 mb-2 h-11 bg-slate-600 text-gray-100" @click.prevent="submitFilter()">Знайти</button>
  </div>
</div>
</template>

<script setup lang="ts">
const emits = defineEmits(['changeQuery']);
const { filters, categories } = defineProps(['filters', 'categories']);
const router = useRouter();
const route = useRoute();
const filterData:any = reactive({
  category: +route.params.category || null,
  subcategory: +route.params.subcategory || null,
  model: (route.query.model && +route.query.model) || null,
  make: (route.query.make && +route.query.make) || null,
  supplier: (route.query.supplier && +route.query.supplier) || null
});
const modelsList = computed(() => {
  return filters.value.filter((f:any) => f.parent_id === filterData.make);
});

const submitFilter = async () => {
  let filters:any = {};
  for(let f in filterData) {
    if(['category', 'subcategory'].indexOf(f) === -1 && filterData[f]) {
      filters[f] = filterData[f];
    }
  }
  emits('changeQuery', filters);
  router.push({path: `/${route.params.locale}/${filterData.category}/${filterData.subcategory ? filterData.subcategory+'/' : ''}page-1`, query: filters});
}
</script>


<style>
@import url('@/public/app/style.css');
</style>