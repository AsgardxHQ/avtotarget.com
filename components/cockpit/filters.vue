<template>
    <div class="w-full">
      <div class="flex justify-end">
        <button type="button" class="px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white" @click="showCreateItem = !showCreateItem">Создать</button>
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
              Принадлежит к:
              <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" v-model="newData.parent_id">
                <option value="0">Основной фильтр</option>
                <option v-for="filter in filters" :key="filter.id" :value="filter.id">{{filter[`name_${route.params.locale}`]}}</option>
              </select>
            </div>
          </div>
          <div class="md:w-1/2 sm:w-full px-2">
            <div class="text-sm mb-4">
              Название (рус):
              <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="newData.name_ru">
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
      v-if="filterFilters.length > 0"
      :value="filterFilters"
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
      <Column field="parent_id" header="Входит в"></Column>
      <Column field="name_uk" header="Название (укр)"></Column>
      <Column field="name_ru" header="Название (рус)"></Column>
      <Column field="status" header="Статус"></Column>
      <template #expansion="slotProps">
        <div class="max-w-3xl mx-auto">
          <h3 class="text-md text-center border-b pb-4 mb-4">Редактирование Фильтра</h3>
          <div class="flex">
            <div class="md:w-1/2 sm:w-full px-2">
              <div class="text-sm mb-4">
                Название (укр):
                <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="slotProps.data.name_uk">
              </div>
              <div class="text-sm mb-4">
                Принадлежит к:
                <select class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" v-model="slotProps.data.parent_id">
                  <option value="0">Основной фильтр</option>
                  <option v-for="filter in filters" :key="filter.id" :value="filter.id">{{filter[`name_${route.params.locale}`]}}</option>
                </select>
              </div>
            </div>
            <div class="md:w-1/2 sm:w-full px-2">
              <div class="text-sm mb-4">
                Название (рус):
                <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" v-model="slotProps.data.name_ru">
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
  import { settings } from '@/stores/settings';
  
  interface NewData {
    name_uk: string,
    name_ru: string,
    status: number,
    parent_id: number,
    image: string,
    fields: Object
  }
  
  const route = useRoute();
  const { filters, showComponent } = defineProps({
    filters: Array,
    showComponent: Object,
  });

  const filterFilters = computed(() => {
    return filters.filter((f:any) => {
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
    image: '',
    parent_id: 0,
    fields: {},
  });
  const status = [
    'Удален',
    'Активен'
  ]
  const save = (payload) => {
    console.log(payload);
  }
  const create = async (payload:any) => {
    showCreateItem.value = false;
    const newFilter = await $fetch('/api/v1/create/filter', {method: 'POST', body: payload});
    filters.push(newFilter);
  }
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
  </script>