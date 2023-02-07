<template>
  <DataTable
    :value="suppliers"
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
    <Column field="name_ru" header="Название" :sortable="true"></Column>
    <template #expansion="slotProps">
    <div class="max-w-3xl mx-auto">
      <h3 class="text-md text-center border-b pb-4 mb-4">Редактирование товара</h3>
      <div class="w-full px-2 text-center mb-4">
        <img 
          v-if="slotProps.data.temporaryImg || slotProps.data.image" :src="slotProps.data.temporaryImg || `/images/suppliers/${slotProps.data.image}`"
          class="border-slate-200 max-w-xs border rounded shadow-md p-2 w-auto mx-auto mb-4"
        >
        <FileUpload 
          mode="basic"
          name="supplier"
          :auto="true"
          :customUpload="true"
          @uploader="uploadImg($event, slotProps.data, '/api/upload?itemType=suppliers&fileType=images', 'image')"
          :chooseLabel="slotProps.data.image ? 'Изменить изображение' : 'Загрузить изображение'"
        />
        <span v-if="errorMessage" class="inline-block mt-4 text-center bg-red-600/75 text-sm p-2 rounded text-white">{{errorMessage}}</span>
      </div>
      <div class="flex">
        <div class="md:w-1/2 sm:w-full px-2">
          <div class="text-sm">
            Название:
            <input class="w-full mt-1 px-3 py-2 bg-slate-50 rounded border border-slate-400" type="text" name="name" v-model="slotProps.data.name">
          </div>
        </div>
        <div class="md:w-1/2 sm:w-full px-2">
          <div class="text-sm">
            Тип <small>(к какой категории относится)</small>
            <MultiSelect 
                v-model="slotProps.data.categories"
                :options="categories"
                :optionLabel="`name_${route.params.locale}`"
                class="w-full bg-slate-50 mt-1 rounded border border-slate-400"
              >
              <template #value="suppliersSelected">
                <div class="p-multiselect-car-token bg-slate-200 inline p-1 mr-2 rounded" v-for="option of carsSelected.value" :key="option">
                  <span>
                    {{option.name}}
                  </span>
                </div>
                <template v-if="!suppliersSelected">
                  Выбор категорий
                </template>
              </template>
              <template #option="suppliersOptions">
                <div class="p-multiselect-car-option">
                  <!-- <template v-if="carsOptions.option.image">
                    <img :alt="carsOptions.option[`name_${route.params.locale}`]" :src="'/images/cars/' + carsOptions.option.image" />
                  </template> -->
                  <span>
                    {{suppliersOptions.option.name}}
                  </span>
                </div>
              </template>
            </MultiSelect>
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
import FileUpload from 'primevue/fileupload';
import { uploadImg } from '@/helpers/upload-image';
import { settings } from '@/stores/settings';
const expandedRows = ref([]);
const suppliers = reactive([]);
const categories = reactive([]);
const errorMessage = settings().uploader.error;
const successMessage = settings().uploader.success;

const onRowExpand = () => {
  clearMSG();
}
const onRowCollapse = () => {
  clearMSG();
}
const save = (payload:any) => {
  // const { data, fileName, open, file } = useFileSystemAccess({ dataType: 'Blob' });
  const data = {
    name: payload.name,
    image: payload.image,
    categories: payload.categories,
    id: +payload.id
  }
  $fetch('/api/update/supplier', {
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
const clearMSG = () => {
  settings().uploader.error = '';
  settings().uploader.success = '';
}
const getData = async () => {
  const data = await $fetch('/api/suppliers', {method: "GET"});
  suppliers.push(...JSON.parse(data));
}
onMounted(() => {
  getData()
});
</script>
