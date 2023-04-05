<template>
  <DataTable
    v-if="orders.length > 0"
    :value="orders"
    :paginator="true"
    :rows="10"
    dataKey="id" 
    stripedRows
    showGridlines
    responsiveLayout="scroll"
    class="pt-4"
    v-model:expandedRows="expandedRows"
  >
    <Column :expander="true" headerStyle="width: 3rem" />
    <Column field="id" header="ID" :sortable="true"></Column>
    <Column field="fullItems" header="Товар">
      <template #body="slotProps">
        <div v-for="item in slotProps.data.fullItems" :key="item.id">
          <span>{{ item.code_vendor }} - {{ slotProps.data.items[item.id] }} шт.</span>
        </div>
      </template>
    </Column>
    <Column field="status" header="Статус заказа" :sortable="true">
      <template #body="slotProps">
        <span>{{ setStatus(slotProps.data.status) }}</span>
      </template>
    </Column>
    <Column field="ts" header="Дата создания" :sortable="true">
      <template #body="slotProps">
         <span>{{ convertData(slotProps.data.ts) }}</span>
      </template>
    </Column>

    <template #expansion="slotProps">
      <div class="max-w-3xl mx-auto">
        <h3 class="text-md text-center border-b pb-4 mb-4">Заказ - №{{ slotProps.data.id }}</h3>
      </div>
        <div class="w-full">
          <h4>Информация пользователя</h4>
          <ul>
            <li><span>Ф.И.О: </span> {{ slotProps.data.fields.fullname }}</li>
            <li><span>Email: </span> {{ slotProps.data.fields.email }}</li>
            <li><span>Телефон: </span> {{ slotProps.data.fields.phone }}</li>
            <li><span>Город: </span> {{ slotProps.data.fields.city }}</li>
            <li><span>Тип доставки: </span> {{ slotProps.data.fields.delivery }}</li>
            <li v-if="slotProps.data.fields.post_office"><span>Почтовое отделение: </span> {{ slotProps.data.fields.post_office }}</li>
            <li><span>Примечания: </span> {{ slotProps.data.fields.description }}</li>
            <li><span>Дата заказа: </span> {{ convertData(slotProps.data.ts) }}</li>
          </ul>
        </div>
        <div class="w-full">
          <div class="flex pt-4 bg-white" v-for="item in slotProps.data.fullItems" :key="item.id">
            <div class="w-1/4">
              <img :src="`https://cdn.autotarget.com.ua/products/${item.images[0]}`">
            </div>
            <div class="w-3/4">
              <div>
                <p>{{ item[`name_${route.params.locale}`] }}</p>
                <small class="font-bold">{{ item.code_vendor }}</small>
              </div>
              <div class="flex">
                <div class="w-1/3">
                  <span class="font-bold">Цена: </span> {{ item.price_retail / 100 }} грн.
                </div>
                <div class="w-1/3">
                  <span class="font-bold">Кол-во: </span> {{ slotProps.data.items[item.id] }} шт.
                </div>
                <div class="w-1/3">
                  <span class="font-bold">Итого: </span> {{ (item.price_retail * slotProps.data.items[item.id]) / 100 }} грн.
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <span class="font-bold">Сумма заказа: </span> {{ calcTotal(slotProps.data) }} грн.
          </div>
        </div>
    </template>

  </DataTable>
</template>

<script lang="ts" setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  const route = useRoute();
  const expandedRows = ref([]);
  const orders = ref((await $fetch('/api/v1/orders', {method: 'GET'}) as any));
  const setStatus = (status:number) => {
    let s = '';
    switch(status) {
      case 0:
        s = 'Удален';
        break;
      case 1:
        s = 'Выполненый';
        break;
      case 2:
        s = 'В обработке';
        break;
      case 3:
        s = 'Новый';
        break;
    }
    return s;
  }
  const convertData = (ts:string) => {
    const date = new Date(ts);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + (date.getHours() >= 10 ? date.getHours() : '0'+date.getHours()) + ':'+ (date.getMinutes() >= 10 ? date.getMinutes() : '0'+date.getMinutes() ) + ':'+ (date.getSeconds() >= 10 ? date.getSeconds() : '0'+date.getSeconds());
  }
  const calcTotal = (data) => {
    let total = 0;
    data.fullItems.map(item => {
      total += (item.price_retail * data.items[item.id]) / 100;
    });
    return total;
  }
</script>