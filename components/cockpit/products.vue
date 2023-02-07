<template>
<div>
  <div class="my-2 flex justify-between">
    <span>Все товары (кол-во: {{items.length}})</span>
  </div>
  <DataTable
    :value="items"
    :paginator="true"
    :rows="10"
    dataKey="id" 
    stripedRows
    showGridlines
    responsiveLayout="scroll"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
  >
    <Column :expander="true" headerStyle="width: 3rem" />
    <Column field="id" header="ID" :sortable="true"></Column>
    <Column field="code_vendor" header="Код"></Column>
    <Column field="code_wholesale" header="Код пр."></Column>
    <Column field="name_uk" header="Название"></Column>
    <Column field="price_retail" header="Цена" :sortable="true">
      <template #body="slotProps">
          {{ slotProps.data.price_retail / 100 }}
      </template>
    </Column>
    <Column field="category" header="Категория" :sortable="true">
      <template #body="slotProps">
        <template v-if="slotProps.data.category">
          {{ slotProps.data.category[`name_${route.params.locale}`] }}
        </template>
        <template v-else>
          <span class="text-red-600">Нет категории</span>
        </template>
        <!-- <span
          v-for="car in slotProps.data.cars"
          :key="car.id"
        >
          <template v-if="car.name_uk === 'all'">
            Все модели
          </template>
          <template v-else>
            {{ car[`name_${route.params.locale}`] }}
          </template>
        </span> -->
      </template>
    </Column>
    <Column field="filters_id" header="Атрибуты" :sortable="true">
      <template #body="slotProps">
        <div class="flex flex-col">
          <span
            class="bg-slate-400 rounded px-2 py-1 text-white mb-2"
            v-for="f in slotProps.data.filters"
          >
            {{f[`name_${route.params.locale}`]}}
          </span>
        </div>
      </template>
    </Column>
    <Column field="status" header="Статус" :sortable="true"></Column>
    <template #expansion="slotProps">
      <div class="max-w-3xl mx-auto">
        <h3 class="text-md text-center border-b pb-4 mb-4">Редактирование товара</h3>
        <div class="w-full px-2 text-center mb-4">
          <img 
            v-if="slotProps.data.temporaryImg || slotProps.data.image" :src="slotProps.data.temporaryImg || `/images/cars/${slotProps.data.image}`"
            class="border-slate-200 border rounded shadow-md p-2 w-auto mx-auto mb-4"
          >
          <FileUpload 
            mode="basic"
            name="product"
            :auto="true"
            :customUpload="true"
            @uploader="uploadImg($event, slotProps.data, '/api/upload?itemType=products&fileType=images', 'images')"
            :chooseLabel="slotProps.data.image ? 'Изменить изображение' : 'Загрузить изображение'"
          />
          <span v-if="errorMessage" class="inline-block mt-4 text-center bg-red-600/75 text-sm p-2 rounded text-white">{{errorMessage}}</span>
        </div>
        <div class="flex">
          <div class="md:w-1/2 sm:w-full px-2">
            <div class="text-sm mb-4">
              Название (укр):
              <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="slotProps.data.name_uk">
            </div>
            <div class="text-sm mb-4">
              Код товара:
              <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="slotProps.data.code_vendor">
            </div>
            <div class="text-sm mb-4">
              Код производителя:
              <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="slotProps.data.code_wholesale">
            </div>
            <div class="text-sm mb-4">
              Цена:
              <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="slotProps.data.formatedPrice">
            </div>
            <div class="text-sm mb-4">
              Поставщик:
              <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="slotProps.data.fields.provider">
            </div>
          </div>
          <div class="md:w-1/2 sm:w-full px-2">
            <div class="text-sm mb-4">
              Название (рус):
              <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="slotProps.data.name_ru">
            </div>
            <div class="text-sm mb-4">
              Категория:
              <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" v-model="slotProps.data.category_id">
                <option :value="0" disabled>Выберите категории</option>
                <option v-for="cat in (categories as any)" :key="cat.id" :value="cat.id">{{cat[`name_${route.params.locale}`]}}</option>
              </select>
            </div>
            <div class="text-sm mb-4">
              Атрибуты:
              <MultiSelect 
                v-model="slotProps.data.filters"
                :options="sortedFilters"
                :optionLabel="`name_${route.params.locale}`"
                display="chip"
                :filter="true"
                class="w-full bg-slate-50 mt-1 rounded border border-slate-400"
              >
              <template #value="filtersSelected">
                <!-- <div 
                  class="p-multiselect-car-token bg-slate-200 inline p-1 mr-2 rounded"
                  v-for="option of filtersSelected.value"
                  :key="option.id"
                >
                  <span>
                    {{option[`name_${route.params.locale}`]}}
                  </span>
                </div> -->
                <div 
                  class="p-multiselect-token"
                  v-for="option of filtersSelected.value"
                  :key="option.id"
                >
                  <span class="p-multiselect-token-label">{{option[`name_${route.params.locale}`]}}</span>
                  <!-- <span class="p-multiselect-token-icon pi pi-times-circle"></span> -->
                </div>
              </template>
              <template #option="filtersOptions">
                <div :class="filtersOptions.option.parent_id !== 0 ? 'pl-4': ''">
                  <span>
                    {{filtersOptions.option[`name_${route.params.locale}`]}}
                  </span>
                </div>
              </template>
              </MultiSelect>
            </div>
            <div class="text-sm mb-4">
              Статус:
              <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" v-model="slotProps.data.status">
                <option v-for="(value, index) in status" :key="index" :value="index">{{value}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="md:w-1/2 sm:w-full px-2">
            <div class="text-sm mb-4">
              Описание (укр):
              <textarea class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" v-model="slotProps.data.fields.description_uk">
              </textarea>
            </div>
          </div>
          <div class="md:w-1/2 sm:w-full px-2">
            <div class="text-sm mb-4">
              Описание (рус):
              <textarea class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" v-model="slotProps.data.fields.description_ru">
              </textarea>
            </div>
          </div>
        </div>
        <div class="flex justify-between pt-4 px-2 mt-4 border-t border-slate-200">
          <button type="button" class="px-3 py-2 bg-red-600 rounded hover:bg-red-700 text-white">Удалить</button>
          <button type="button" class="px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white" @click="save(slotProps.data)">Сохранить</button>
        </div>
        <div v-if="successMessage" class="flex justify-center">
          <span class="mt-4 text-center bg-green-600/75 text-sm p-2 rounded text-white">{{successMessage}}</span>
        </div>
      </div>
    </template>
  </DataTable>
</div>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import MultiSelect from 'primevue/multiselect';
import { uploadImg } from '@/helpers/upload-image';
import { settings } from '@/stores/settings';
const route = useRoute();
const items = ref([]);
const { categories, filters } = defineProps({
  categories: Array,
  filters: Array
});

const mainFilter = filters.filter((f:any) => f.parent_id === 0);
const childFiters = [];

mainFilter.forEach((mf:any) => {
  childFiters.push(filters.filter((f:any) => f.parent_id === mf.id));
});
let sortedFilters = [];
for(let i=0;i<mainFilter.length;i++) {
  sortedFilters = [...sortedFilters, mainFilter[i], ...childFiters[i]];
}

const count = ref(0);
const status = [
  'Удален',
  'В обработке',
  'В работе'
]
const expandedRows = ref([]);
const errorMessage = settings().uploader.error;
const successMessage = settings().uploader.success;
const onRowExpand = () => {
  clearMSG();
}
const onRowCollapse = () => {
  clearMSG();
}
const clearMSG = () => {
  settings().uploader.error = '';
  settings().uploader.success = '';
}
const save = (payload:any) => {
  const data:any = payload;
  data.filters_id = [];
  data.filters.map((f:any) => {
    data.filters_id.push(f.id) ;
  });
  delete data.filters;
  delete data.category;
  delete data.formatedPrice;
  $fetch('/api/v1/update/product', {
    method: 'POST',
    body: data,
  }).then(() => {
    clearMSG();
    successMessage.value = 'Сохранено успешно!'
    setTimeout(() => {
      clearMSG();
    }, 1000);
  }).catch((err) => {
    console.log(err);
  })
}
const getData = async () => {
  const data:any = await $fetch('/api/v1/items?limit=20');
  data.items.map((item:any) => {
    item.formatedPrice = item.price_retail / 100;
    item.category = categories.find((cat:any) => cat.id === item.category_id);
    item.filters = filters.filter((f:any) => item.filters_id.indexOf(f.id) !== -1);
  });
  items.value = data.items;
  count.value = data.count;
}


onMounted(() => {
  getData()
});
</script>

<style>
  table, th, td {
    border: 1px solid black;
  }
  .p-multiselect {
   @apply border-slate-400 !important 
  }
</style>