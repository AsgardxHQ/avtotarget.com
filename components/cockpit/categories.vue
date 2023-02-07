<template>
  <div class="w-full">
    <div class="flex justify-end">
      <button type="button" class="px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white" @click="showCreateItem = !showCreateItem">Создать категорию</button>
    </div>
    <div v-if="showCreateItem" class="max-w-3xl mx-auto">
      <h3 class="text-md text-center border-b pb-4 mb-4">Создание категории</h3>
      <div class="flex">
        <div class="md:w-1/2 sm:w-full px-2">
          <div class="text-sm mb-4">
            Название (укр):
            <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="newData.name_uk">
          </div>
          <div class="text-sm mb-4">
            URL:
            <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="newData.url">
          </div>
          <div class="text-sm mb-4">
            Принадлежит к:
            <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" v-model="newData.parent_id">
              <option value="0">Основная категория</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{category[`name_${route.params.locale}`]}}</option>
            </select>
          </div>
        </div>
        <div class="md:w-1/2 sm:w-full px-2">
          <div class="text-sm mb-4">
            Название (рус):
            <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="newData.name_ru">
          </div>
          <div class="text-sm mb-4">
              Фильтр:
              <MultiSelect 
                v-model="newData.filters"
                :options="filters"
                :optionLabel="`name_${route.params.locale}`"
                class="w-full bg-slate-50 mt-1 rounded border border-slate-400"
              >
              <template #value="filtersSelected">
                <div class="p-multiselect-car-token bg-slate-200 inline p-1 mr-2 rounded" v-for="option of filtersSelected.value" :key="option.id">
                  <span>
                    {{option[`name_${route.params.locale}`]}}
                  </span>
                </div>
                <template v-if="!filtersSelected">
                  Выбор фильтров
                </template>
              </template>
              <template #option="filtersOptions">
                <div class="p-multiselect-car-option">
                  <span>
                    {{filtersOptions.option[`name_${route.params.locale}`]}}
                  </span>
                </div>
              </template>
            </MultiSelect>
          </div>
          <div class="text-sm mb-4">
            Статус:
            <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" v-model="newData.status">
              <option v-for="(value, index) in status" :key="index" :value="index">{{value}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="md:w-1/2 sm:w-full px-2">
          <div class="text-sm mb-4">
            Описание (укр):
            <textarea class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" v-model="newData.fields.description_uk">
            </textarea>
          </div>
        </div>
        <div class="md:w-1/2 sm:w-full px-2">
          <div class="text-sm mb-4">
            Описание (рус):
            <textarea class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" v-model="newData.fields.description_ru">
            </textarea>
          </div>
        </div>
      </div>
      <div class="flex justify-end pt-4 px-2 mt-4 border-t border-slate-200">
        <button type="button" class="px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white" @click="create(newData)">Сохранить</button>
      </div>
      <div v-if="successMessage" class="flex justify-center">
        <span class="mt-4 text-center bg-green-600/75 text-sm p-2 rounded text-white">{{successMessage}}</span>
      </div>
    </div>
  </div>
  <DataTable
    v-if="filterCategories.length > 0"
    :value="filterCategories"
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
    <Column field="name_uk" header="Название (укр)"></Column>
    <Column field="name_ru" header="Название (рус)"></Column>
    <Column field="filters" header="Фильтры">
      <template #body="slotProps">
        <span class="mr-2">{{slotProps.data.filters.length}}</span>
      </template>
    </Column>
    
    <template #expansion="slotProps">
      <div class="max-w-3xl mx-auto">
        <h3 class="text-md text-center border-b pb-4 mb-4">Редактирование категорий</h3>
        <div class="flex">
          <div class="md:w-1/2 sm:w-full px-2">
            <div class="text-sm mb-4">
              Название (укр):
              <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="slotProps.data.name_uk">
            </div>
            <div class="text-sm mb-4">
              URL:
              <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="slotProps.data.url">
            </div>
            <div class="text-sm mb-4">
              Входит в категорию:
              <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" v-model="slotProps.data.parent_id">
                <option value="0">Основная категория</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{category[`name_${route.params.locale}`]}}</option>
              </select>
            </div>
          </div>
          <div class="md:w-1/2 sm:w-full px-2">
            <div class="text-sm mb-4">
              Название (рус):
              <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="slotProps.data.name_ru">
            </div>
            <div class="text-sm mb-4">
              Фильтр:
              <MultiSelect 
                v-model="slotProps.data.filters"
                :options="filters"
                :optionLabel="`name_${route.params.locale}`"
                class="w-full bg-slate-50 mt-1 rounded border border-slate-400"
              >
              <template #value="filtersSelected">
                <div class="p-multiselect-car-token bg-slate-200 inline p-1 mr-2 rounded" v-for="option of filtersSelected.value" :key="option.id">
                  <span>
                    {{option[`name_${route.params.locale}`]}}
                  </span>
                </div>
                <template v-if="!filtersSelected">
                  Выбор фильтров
                </template>
              </template>
              <template #option="filtersOptions">
                <div class="p-multiselect-car-option">
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
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import MultiSelect from 'primevue/multiselect';
import { settings } from '@/stores/settings';

interface NewData {
  name_uk: string,
  name_ru: string,
  status: number,
  url: string,
  parent_id: number,
  position: number,
  fields: any,
  filter_id: number[]
  filters: Array<object>
}

const route = useRoute();
const {categories, filters, showComponent} = defineProps({
  categories: Array as any,
  filters: Array,
  showComponent: Object,
});

const cats:any = reactive(categories);
for(let i=0;i<cats.length;i++) {
  cats[i].filters = filters.filter((f:any) => cats[i].filter_id.indexOf(f.id) !== -1);
}

const filterCategories = computed(() => {
  return cats.filter((f:any) => {
    if(showComponent.id && f.parent_id === showComponent.id) return f;
    else if(!showComponent.id && f.parent_id === 0) return f; 
  });
});
const showCreateItem = ref(false);
const expandedRows = ref([]);
const errorMessage = settings().uploader.error;
const successMessage = settings().uploader.success;
const newData:NewData = reactive({
  name_uk: '',
  name_ru: '',
  status: 1,
  url: '',
  image: '',
  parent_id: 0,
  position: 0,
  fields: {
    description_uk: '',
    description_ru: '',
  },
  filter_id: [],
  filters: []
});
const status = [
  'Удален',
  'Активен'
]
const save = async (payload) => {
  const selectedFilters = payload.filters;
  const filterIds = [];
  for(let i=0;i<selectedFilters.length;i++) {
    filterIds.push(selectedFilters[i].id);
  }
  payload.filter_id = filterIds;
  delete payload.filters;
  await $fetch('/api/v1/update/category', {method: 'POST', body: payload});
  cats.map(f => {
    if(f.id === payload.id) {
      f = payload;
    }
  });
  expandedRows.value = [];
}
const create = async (payload:any) => {
  const selectedFilters = payload.filters;
  const filterIds = [];
  for(let i=0;i<selectedFilters.length;i++) {
    filterIds.push(selectedFilters[i].id);
  }
  payload.filter_id = filterIds;
  delete payload.filters;
  showCreateItem.value = false;
  const newCategory = await $fetch('/api/v1/create/category', {method: 'POST', body: payload});
  categories.push(newCategory)
}
const onRowExpand = ($event) => {
  if(!$event.data.fields) {
    $event.data.fields = {
      description_uk: '',
      description_ru: ''
    }
  }
  clearMSG();
}
const onRowCollapse = () => {
  clearMSG();
}
const clearMSG = () => {
  settings().uploader.error = '';
  settings().uploader.success = '';
}
</script>