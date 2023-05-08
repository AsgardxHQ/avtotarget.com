<template>
  <div>
      <client-only>
      <h1 class="w-full text-xl text-center uppercase mb-6">
        {{$t('cart')}}
      </h1>
      <div class="flex">
        <div class="w-full px-4">
          <div class="w-full flex mb-2 border-t-2 p-2 relative" v-if="cart.length" v-for="item in cart" :key="item.id">
            <NuxtLink class="w-4/12 pr-2" :to="`/${route.params.locale}/product/${item.id}`">
              <img  v-if="item.images && item.images.length > 0" :src="`https://cdn.autotarget.com.ua/products/${item.images[0]}`">
            </NuxtLink>
            <div class="w-full mr-6">
              <NuxtLink :to="`/${route.params.locale}/product/${item.id}`" class="text-md leading-5 text-sky-800">{{item[`name_${route.params.locale}`]}}</NuxtLink>
              <div class="flex justify-between mt-4">
                <ul class="text-xs">
                  <li><span class="font-bold">{{ $t('items.code_wholesale') }}: </span>{{item.code_wholesale}}</li>
                  <li><span class="font-bold">{{ $t('items.code_vendor') }}: </span>{{item.code_vendor}}</li>
                  <!-- <li v-if="mainCategory"><span class="font-bold">{{mainCategory[`name_${route.params.locale}`]}}: </span>{{item.category[`name_${route.params.locale}`]}}</li>
                  <template v-for="(f, index) in mainFilters" :key="index">
                    <li><span class="font-bold">{{ f[`name_${route.params.locale}`] }}: </span>{{item.filters.find(cur => cur.parent_id === f.id)[`name_${route.params.locale}`]}}</li>
                  </template> -->
                </ul>
                <ul class="text-xs">
                  <li><span class="font-bold">{{$t('items.price')}}: </span>{{item.price_retail / 100}} грн.</li>
                  <li><span class="font-bold">{{$t('count_items')}}: </span>{{item.count}} шт.</li>
                  <li><span class="font-bold">{{$t('items.total_item')}}: </span> {{ (item.price_retail / 100) * item.count }} грн.</li>
                </ul>
              </div>
            </div>
            <a href="#" class="absolute right-2 top-2 hover:rotate-90" @click.prevent="removeItem(item.id)"><i class="pi pi-times"></i></a>
          </div>
        </div>
        <div class="w-52 relative" v-if="cart.length">
          <div class="fixed border rounded p-2 shadow-md">
            <p class="text-md mb-4"><span class="block mb-2">{{ $t('items.total') }}:</span><span class="font-bold">{{ getTotalPrice() }} грн.</span></p>
            <button @click="openModal()" type="button" class="w-full bg-cyan-700 text-white hover:bg-cyan-900 py-2 px-6 text-xs uppercase font-bold rounded">{{$t('order')}}</button>
          </div>
        </div>
      </div>
      <div class="modal fixed top-0 left-0 w-full h-full flex justify-center items-center" v-if="modal">
        <div class="overlay fixed top-0 left-0 w-full h-full bg-slate-200 opacity-50 z-10" @click="closeModal()"></div>
        <div class="w-80 relative z-20 bg-white py-2 px-4 rounded-md shadow-lg">
          <form class="relative" @submit.prevent="sendToOrder()">
            <a href="#" class="absolute -right-7 -top-5 rounded-full bg-white border border-slate-200 p-2" @click.prevent="closeModal()">
              <i class="pi pi-plus rotate-45"></i>
            </a>
            <h2 class="text-2xl border-b border-slate-200">Оформление заказа</h2>
            <div class="mt-2">
              <label class="block mb-2">
                <span class="text-xs mb-1 block">ФИО</span>
                <input class="w-full form-input px-4 py-3 outline-0 border border-slate-200" type="text" name="fullname" placeholder="ФИО" v-model="orderData.fullname" required="true">
              </label>
              <label class="block mb-2">
                <span class="text-xs mb-1 block">Email</span>
                <input class="w-full form-input px-4 py-3 outline-0 border border-slate-200" type="email" name="email" placeholder="Email" v-model="orderData.email" required="true">
              </label>
              <label class="block mb-2">
                <span class="text-xs mb-1 block">Телефон</span>
                <input class="w-full form-input px-4 py-3 outline-0 border border-slate-200" type="tel" name="phone" placeholder="Телефон" v-model="orderData.phone" required="true">
              </label>
              <label class="block mb-2">
                <span class="text-xs mb-1 block">Способ доставки</span>
                <select class="w-full form-input px-4 py-3 outline-0 border border-slate-200" name="delivery" v-model="orderData.delivery" required="true">
                  <option value="">Способ доставки</option>
                  <option value="самовывоз">Самовывоз</option>
                  <option value="новая почта">Новая почта</option>
                </select>
              </label>
              <template v-if="orderData.delivery === 'новая почта'">
                <label class="block mb-2">
                  <span class="text-xs mb-1 block">Город</span>
                  <input @change="searchPostOfficesbyCity()" class="w-full form-input px-4 py-3 outline-0 border border-slate-200" type="text" name="city" placeholder="Город" v-model="orderData.city" required="true">
                </label>
                <label class="block mb-2 relative" v-if="orderData.city.length != 0">
                  <span class="text-xs mb-1 block">Отделение почты</span>
                  <input @input="isShowPostOffices = true;" class="w-full form-input px-4 py-3 outline-0 border border-slate-200" type="text" name="post_office" placeholder="Отделение почты" v-model="orderData.post_office" required="true">
                  <ul 
                    v-show="isShowPostOffices"
                    v-if="postOffices.length > 0 && orderData.post_office.length > 0"
                    class="max-h-40 overflow-auto absolute bg-white border border-slate-200"
                  >
                    <li v-for="(el, index) in filterPostOffices" :key="index" @click="choisePost(el[route.params.locale === 'uk' ? 'Description' : 'DescriptionRu'])" class="px-2 mb-2 text-xs hover:bg-slate-200">
                      {{ el[route.params.locale === 'uk' ? 'Description' : 'DescriptionRu'] }}
                    </li>
                  </ul>
                </label>
              </template>
              <label class="block mb-2">
                <span class="text-xs mb-1 block">Примечание к заказу</span>
                <textarea class="w-full form-input px-4 py-3 outline-0 border border-slate-200" rows="4" v-model="orderData.description"></textarea>
              </label>
              <div class="flex justify-between items-center">
                <button type="button" class="py-2 px-4 border border-slate-200 rounded hover:bg-slate-100" @click="closeModal()">Закрыть</button>
                <button type="submit" class="bg-cyan-700 text-white hover:bg-cyan-900 py-2 px-6 text-xs uppercase font-bold rounded">Купить</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </client-only>
    </div>
</template>
<script setup lang="ts">
import { cartStore } from '~~/stores/cart';
const route = useRoute();
const router = useRouter();
const storeCart = cartStore();
const currentuser = null;

const cart:any = computed(() => {
  return storeCart.cart;
});
const itemsId:any = {};
cart.value.map((m:any) => {
  itemsId[m.id] = m.count
})
const orderData = ref({
  fullname: '',
  phone: '',
  email: '',
  delivery: '',
  description: '',
  post_office: '',
  city: '',
  items: itemsId
});

// if(currentuser.value) {
//   for(let key in currentuser.value) {
//     if(Object.keys(orderData.value).indexOf(key) !== -1) {
//       orderData.value[key] = currentuser.value[key];
//     };
//   }
// }

const modal = ref(false);
const getTotalPrice = ():string => {
  let total = 0;
  cart.value.map((item:any) => {
    total += item.price_retail * item.count;
  });
  const sum:number = total / 100;
  return parseFloat(sum.toString()).toFixed(2);
}

const postOffices = ref([]);
const isShowPostOffices = ref(true);
const searchPostOfficesbyCity = async () => {
  console.log(orderData.value.post_office);
  const { data }:any = await $fetch('https://api.novaposhta.ua/v2.0/json/', {
    method: 'POST',
    body: {
      apiKey: '36546247000dc161cf93d55c035e8f1b',
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityName: orderData.value.city,
      }
    }
  });
  postOffices.value = data;
}
const filterPostOffices = computed(() => {
  const p = orderData.value.post_office;
  if(p.length === 0) {
    return [];
  } else {
    return postOffices.value.filter((f:any) => f[`Description${route.params.locale === 'uk' ? '': 'Ru'}`].indexOf(p.trim()) !== -1);
  }
});

const choisePost = (text:string) => {
  orderData.value.post_office = text;
  isShowPostOffices.value = false;
}

const removeItem = (id:number) => {
  storeCart.delete(id);
}

const openModal = () => {
  document.body.classList.add('overflow-hidden');

  modal.value = true;
}
const closeModal = () => {
  document.body.classList.remove('overflow-hidden');
  modal.value = false;
}
const sendToOrder = async () => {
  try {
    await $fetch('/api/v1/order', {method: 'POST', body: orderData.value});
    localStorage.removeItem('cart');
    storeCart.cart = [];
    router.replace(`/${route.params.locale}`);
  } catch(err) {
    console.log(err);
  }
}

onMounted(() => {
  if(cart.value.length === 0) {
    window.location.href = `/${route.params.locale}`;
  }
});
</script>