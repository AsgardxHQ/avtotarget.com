<template>
  <div class="fixed top-0 left-0 bg-white w-full h-full overflow-auto">
    <a href="#" class="absolute right-2 top-2" @click.prevent="$emit('closeCockpit')"><i class="pi pi-times"></i></a>
    <div class="flex">
      <div class="w-64 border-r shadow-md">
        <h1 class="px-3 py-2 text-sm border-b">Админ панель</h1>
        <ul>
          <li v-for="(elem, index) in menu" :key="index">
            <a class="nav-link" href="#" @click.prevent="goToPage(elem, null)">{{elem.name}}</a>
            <ul class="max-h-80 overflow-auto border-y shadow-inner" v-if="elem.child">
              <template
                v-for="(subelem, subindex) in elem.child"
                :key="subindex"
              >
                <li 
                  v-if="subelem && subelem.parent_id === 0"
                >
                  <a class="nav-link" href="#" @click.prevent="goToPage(elem, subelem.id)">
                    {{subelem[`name_${route.params.locale}`] || subelem.name}}
                  </a>
                </li>
              </template>
            </ul>
          </li>
        </ul>
      </div>
      <div class="w-full p-6">
        <h1>{{showComponent.name}}</h1>
        <template v-if="showComponent.url === 'main'">
        <div>
          <label class="block">
            <span class="sr-only">Импорт товара</span>
            <input 
              @change="uploadFile($event)" 
              type="file" 
              class="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
              multiple="true"
              />
          </label>
        </div>
        </template>
        <template v-if="showComponent.url === 'main'">
          <ul class="border-b mb-4 py-2">
            <li v-for="cat in xmlCategories" :key="cat.id">
              <span :data-id="cat.id" :data.parent="cat.parent_id">{{cat}}</span>
            </li>
          </ul>
          <div v-html="xmlData"></div>
        </template>
        <CategoriesComponent :filters="filters" :categories="categories" :showComponent="showComponent" v-if="showComponent.url === 'categories'" />
        <FiltersComponent :filters="filters" :showComponent="showComponent" v-if="showComponent.url === 'filters'" />
        <Products  :showComponent="showComponent" :filters="filters" :categories="categories" v-if="showComponent.url === 'products'" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CategoriesComponent from "@/components/cockpit/categories.vue";
import FiltersComponent from "@/components/cockpit/filters.vue";
import Products from "@/components/cockpit/products.vue";
// import { read, utils } from "xlsx";
// import Suppliers from "@/components/cockpit/suppliers.vue";
// import Parts from "@/components/cockpit/parts.vue";
// import Cars from "@/components/cockpit/cars.vue";
const route = useRoute();
const categories = ref([]);
const filters = ref([]);
const filterSupp = ref([]);
const filterCars = ref([]);
const getCockpitData = async () => {
  categories.value = await $fetch('/api/v1/categories');
  filters.value = await $fetch('/api/v1/filters');
  filterSupp.value = filters.value.filter(f => f.parent_id === 2);
  filterCars.value = filters.value.filter(f => f.parent_id !== 2);
}
await getCockpitData();
const menu:any = [
  {name: 'Главная', url: 'main'},
  {name: 'Продукты', url: 'products'},
  {name: 'Категории', url: 'categories', child: categories.value},
  {name: 'Фильтры', url:'filters', child: filters.value},
  {name: 'Пользователи', url:'users'},
  {name: 'Заказы', url:'orders'}
]

const user = useAuthUser();
const showComponent = ref({
  name: 'Главная',
  url: 'main',
  id: null
});
const goToPage = async (elem:any, id:number|null) => {
  showComponent.value = elem;
  showComponent.value.id = id;
}
const xmlCategories = ref([]);
let xmlData = '';

const uploadFile = async ($event) => {
  const files = $event.target.files;
  let index = 0;
  const rec = () => {
    const data = {
      categories: {},
      suppliers: {},
      make: {},
      model: {},
      items: [],
      analogs: []
    };
    var reader = new FileReader();
    reader.onload = async function(e) {
        let readXml:any = e.target.result;
        console.group(files[index].name);
        console.log('onload xml file - ', files[index].name);
        const parser = new DOMParser();
        const doc = parser.parseFromString(readXml, "application/xml");
        const xmlCats:NodeListOf<HTMLElement> = doc.querySelectorAll('category');
        const xmlItems:NodeListOf<HTMLElement> = doc.querySelectorAll('offers offer');
        const xmlSupp:NodeListOf<HTMLElement> = doc.querySelectorAll('cross');
        const xmlMake:NodeListOf<HTMLElement> = doc.querySelectorAll('car'); //.getAttribute('brand');
        
        for(let i=0;i<xmlCats.length;i++) {
          if(!categories.value.find(f => +f.id === +xmlCats[i].getAttribute('id'))) {
            data.categories[xmlCats[i].getAttribute('id')] = {
              id: +xmlCats[i].getAttribute('id'),
              parent_id: +xmlCats[i].getAttribute('parentId'),
              name_uk: xmlCats[i].getAttribute('nameUA'),
              name_ru: xmlCats[i].getAttribute('name'),
              url: "",
              image: "",
              position: 0,
              fields: "",
              status: 1,
              filter_id: [2,3]
            };
          }
        }
  
        console.log('Parsed categories', data.categories);
        if(Object.keys(data.categories).length > 0) {
          // await $fetch('/api/v1/import/categories', {method: 'POST', body: data.categories});
          console.log('Created categories', Object.keys(data.categories).length);
        }

        console.log('Start parse suppliers', xmlSupp.length);
        for(let i=0;i<xmlSupp.length;i++) {
          // if(!filterSupp.value.find(f => f.parent_id === 2 && f.name_uk === xmlSupp[i].getAttribute('brand'))) {
            if(!data.suppliers[xmlSupp[i].getAttribute('brand')]) {
              data.suppliers[xmlSupp[i].getAttribute('brand')] = {
                parent_id: 2,
                name_uk: xmlSupp[i].getAttribute('brand'),
                name_ru: xmlSupp[i].getAttribute('brand'),
                image: '',
                status: 1,
                fields: {
                  articles: [xmlSupp[i].getAttribute('article')]
                }
              };
            } else {
              data.suppliers[xmlSupp[i].getAttribute('brand')].fields.articles.push(xmlSupp[i].getAttribute('article'));
            }
          // }
        }
        console.log('Parsed suppliers', Object.keys(data.suppliers).length);
        if(Object.keys(data.suppliers).length > 0) {
          // await $fetch('/api/v1/import/filters', {method: 'POST', body: {suppliers: data.suppliers}});
          console.log('Created suppliers', Object.keys(data.suppliers).length);
        }
  
        console.log('Start parse makes', xmlMake.length);
        for(let i=0;i<xmlMake.length;i++){
          // if(xmlMake[i].getAttribute('brand') && !filterCars.value.find(f => f.parent_id === 3 && f.name_uk === xmlMake[i].getAttribute('brand'))) {
            if(!data.make[xmlMake[i].getAttribute('brand')]) {
              data.make[xmlMake[i].getAttribute('brand')] = {
                parent_id: 3,
                name_uk: xmlMake[i].getAttribute('brand'),
                name_ru: xmlMake[i].getAttribute('brand'),
                image: '',
                status: 1,
                child: {
                  [xmlMake[i].getAttribute('model')]: {
                    name_uk: xmlMake[i].getAttribute('model'),
                    name_ru: xmlMake[i].getAttribute('model'),
                    image: '',
                    status: 1,
                  }
                }
              };
            } else {
              data.make[xmlMake[i].getAttribute('brand')].child[xmlMake[i].getAttribute('model')] = {
                name_uk: xmlMake[i].getAttribute('model'),
                name_ru: xmlMake[i].getAttribute('model'),
                image: '',
                status: 1,
              };
            }
          // }
        }
        console.log('Parsed makes', Object.keys(data.make).length);
        if(Object.keys(data.make).length > 0) {
          // await $fetch('/api/v1/import/filters', {method: 'POST', body: {cars: data.make}});
          console.log('Created makes', Object.keys(data.make).length);
        }
  
        
        console.log('Get all filters');
        const allFilters:any = await $fetch('/api/v1/filters');
        console.log('Start parse items');
        for(let i=0;i<1;i++){
          const paramsArr = [];
          let filters_id = [];
          const analogs = [];
          const xmlAnalogs = xmlItems[i].querySelectorAll('Analogs analog');
          const xmlParams = xmlItems[i].querySelectorAll('params param');
          const xmlFilters = xmlItems[i].querySelectorAll('crosses cross, applicability car');
          let test = [];
          // const xmlFilters = 
          for(let i=0;i<xmlAnalogs.length;i++) {
            analogs.push(xmlAnalogs[i].getAttribute('id'));
          }
          for(let i = 0;i<xmlParams.length;i++) {
            paramsArr.push({
              key: xmlParams[i].getAttribute('name'),
              value: xmlParams[i].getAttribute('text')
            });
          }
          for(let i=0;i<xmlFilters.length;i++) {
            if(xmlFilters[i].getAttribute('brand')) {
              if(test.indexOf(xmlFilters[i].getAttribute('brand')) === -1) {
                test.push(xmlFilters[i].getAttribute('brand'));
              }
            } 
            
            if(xmlFilters[i].getAttribute('model')) {
              if(test.indexOf(xmlFilters[i].getAttribute('model')) === -1) {
                test.push(xmlFilters[i].getAttribute('model'));
              }
            }
          }
          allFilters.find(f => {
            if(test.indexOf(f.name_uk) !== -1) {
              filters_id.push(f.id);
            }
          });
          console.log(xmlItems[i].querySelector('vendorCode').innerHTML.split('-')[0], filters_id, test);
          return;
          const img = xmlItems[i].querySelector('picture').innerHTML.indexOf('/') !== -1 ? 
                      xmlItems[i].querySelector('picture').innerHTML.split('/') : 
                      [xmlItems[i].querySelector('picture').innerHTML];
          data.items.push({
            name_uk: xmlItems[i].querySelector('name_ua').innerHTML,
            name_ru: xmlItems[i].querySelector('name').innerHTML,
            url: '',
            images: [img[img.length-1]],
            code_wholesale: '',
            code_vendor: xmlItems[i].querySelector('vendorCode').innerHTML.split('-')[0],
            price_retail: Math.round(100 * parseFloat(xmlItems[i].querySelector('price').innerHTML)),
            remains: 9999,
            status: 1,
            fields: {
              provider: 'Omega',
              description_uk: xmlItems[i].querySelector('description').innerHTML,
              description_ru: xmlItems[i].querySelector('description_ua').innerHTML,
              params: paramsArr,
              keywords: xmlItems[i].querySelector('keywords').innerHTML
            },
            category_id: +xmlItems[i].querySelector('categoryId').innerHTML,
            filters_id: filters_id,
            analogs: analogs
          });
        }
        console.log('Parsed items', data.items.length);
        // if(data.items.length > 0) {
        //   await $fetch('/api/v1/import/items', {method: 'POST', body: data.items});
        //   console.log('Created items', data.items.length);
        // }

        console.log('Finished parse file - ', files[index].name);
        console.groupEnd();
        if(index < files.length-1) {
          console.log('Go to next file');
          await getCockpitData();
          index++;
          rec();
        }
    }
    reader.readAsText(files[index]);
  }
  rec();
  // const {body:xml} = await fetch("/temp/file_import_test.xml");
  // console.log(xml);
}

// onMounted(() => {
//   $fetch('/api/v1/import_xml').then((res:any) => {
//     console.log(res);
//   }).catch((err:any) => {
//     console.log(err);
//   });
// })

// const uploadFile = async () => {
//   const workbook = read(await (await fetch("/temp/210822.xlsx")).arrayBuffer());
//   const data:any = utils.sheet_to_json(workbook.Sheets['Dates'], {header:"A"});
//   const updateItems = [];
//   for(let i=1;i<data.length;i++) {
//     let catId = 0;
//     let fil = [];
//     let filterId = 0;
//     if(categories.value.find(f => f.name_ru === data[i]['G'])) {
//       catId = categories.value.find(f => f.name_ru === data[i]['G']).id;
//     }
//     if(categories.value.find(f => f.name_ru === data[i]['I'])) {
//       catId = categories.value.find(f => f.name_ru === data[i]['I']).id
//     }
//     if(filters.value.find(f => f.name_ru === data[i]['F'])) {
//       filterId = filters.value.find(f => f.name_ru === data[i]['F']).id;
//       fil.push(filterId);
//     }
//     if(filters.value.find(f => f.name_ru === data[i]['G'])) {
//       filterId = filters.value.find(f => f.name_ru === data[i]['G']).id;
//       fil.push(filterId);
//     }
//     updateItems.push({
//       name_uk: data[i]['C'],
//       name_ru: data[i]['D'],
//       code_vendor: data[i]['A'],
//       code_wholesale: data[i]['B'],
//       images: [],
//       url: '',
//       category_id: catId,
//       filters_id: fil,
//       price_retail: Math.round(100 * parseFloat(data[i]['E'])),
//       fields: {
//         provider: data[i]['K'],
//         description_uk: data[i]['J'],
//         description_ru: ''
//       }
//     });
//   }
//   // const newItems = [];
//   // items.map(item => {
//   //   updateItems.map(async upItem => {
//   //     if(upItem.code_wholesale === item.code_wholesale) {
//   //       newItems.push({
//   //         id: item.id,
//   //         category_id: upItem.category_id
//   //       })
//   //     }
//   //   });
//   // })

//   await $fetch('/api/v1/import', {method: 'POST', body: {updateItems}});
//   /*
//     F = Suppliers
//     G,H = Parts
//     I = Cars
//   */
// } 

</script>

<style>
@import '@/public/cockpit/style.css';
</style>