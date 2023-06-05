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
        <h3 class="text-xl text-center border-b pb-4 mb-4">Заказ - №{{ slotProps.data.id }}</h3>
      </div>
        <div class="w-full mb-2">
          <h3 class="text-sm pb-2 mb-2 border-b">Информация пользователя</h3>
          <ul>
            <li><span class="font-bold">Ф.И.О: </span> {{ slotProps.data.fields.fullname }}</li>
            <li><span class="font-bold">Email: </span> {{ slotProps.data.fields.email }}</li>
            <li><span class="font-bold">Телефон: </span> {{ slotProps.data.fields.phone }}</li>
            <li><span class="font-bold">Город: </span> {{ slotProps.data.fields.city }}</li>
            <li><span class="font-bold">Тип доставки: </span> {{ slotProps.data.fields.delivery }}</li>
            <li v-if="slotProps.data.fields.post_office"><span class="font-bold">Почтовое отделение: </span> {{ slotProps.data.fields.post_office }}</li>
            <li><span class="font-bold">Примечания: </span> {{ slotProps.data.fields.description }}</li>
            <li><span class="font-bold">Дата заказа: </span> {{ convertData(slotProps.data.ts) }}</li>
          </ul>
        </div>
        <div class="w-full">
          <div class="flex pt-4 bg-white shadow-md mb-2 p-2" v-for="item in slotProps.data.fullItems" :key="item.id">
            <div class="w-1/4">
              <img :src="`https://cdn.autotarget.com.ua/products/${item.images[0]}`">
            </div>
            <div class="w-3/4">
              <div>
                <p>{{ item[`name_${route.params.locale}`] }}</p>
                <p><span class="font-bold">Код производителя: </span> {{ item.code_vendor }}</p>
                <p><span class="font-bold">Код товара: </span> {{ item.code_wholesale }}</p>
              </div>
              <div class="flex justify-between mb-2">
                <span class="font-bold">Цена: </span> {{ $toPrice(item.price_retail) }} грн.
                <span class="font-bold">Кол-во: </span> {{ slotProps.data.items[item.id] }} шт.
                <span class="font-bold">Итого: </span> {{ $toPrice(item.price_retail, slotProps.data.items[item.id]) }} грн.
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <select class="w-1/2 form-input px-4 py-3 outline-0 border" name="status" @change="changeStatus($event, slotProps.data.id)">
              <option v-for="s in statusArray" :key="s.id" :value="s.id" :selected="slotProps.data.status === s.id">{{ s.text }}</option>
            </select>
            <span><span class="font-bold">Сумма заказа: </span> {{ calcTotal(slotProps.data) }} грн.</span>
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
  const statusArray = [
    {
      id: 0,
      text: "Удален"
    },
    {
      id: 3,
      text: "Новый"
    },
    {
      id: 2,
      text: "В обработке"
    },
    {
      id: 1,
      text: "Выполненын"
    },
  ];
  const setStatus = (status:number) => {
    let s = '';
    switch(status) {
      case 0:
        s = 'Удален';
        break;
      case 1:
        s = 'Выполненын';
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
  const changeStatus = async ($event:any, id:number) => {
    await $fetch('/api/v1/update/order', {method: 'POST', body: {id, status: +$event.target.value}});
    orders.value.find((f:any) => {
      if(f.id === id) f.status = +$event.target.value;
    });
    expandedRows.value = [];
  }
  const convertData = (ts:string) => {
    const date = new Date(ts);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + (date.getHours() >= 10 ? date.getHours() : '0'+date.getHours()) + ':'+ (date.getMinutes() >= 10 ? date.getMinutes() : '0'+date.getMinutes() ) + ':'+ (date.getSeconds() >= 10 ? date.getSeconds() : '0'+date.getSeconds());
  }
  const calcTotal = (data:any) => {
    let total = 0;
    data.fullItems.map((item:any) => {
      total += (item.price_retail * data.items[item.id]) / 100;
    });
    return total;
  }
</script>