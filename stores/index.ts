import { defineStore } from 'pinia';

export const getAllData = defineStore({
  id: 'getAllData',
  state: () => {
    return {
      items: [],
      count_items: 0,
      firstLoad: true,
      categories: <any>[],
      filters: <any>[]
    }
  },
  actions: {
    queryToString(query:any) {
      let str = ""
      for(let key in query) {
        if(query[key]) {
          str += `${key}=${query[key]}&`;
        }
      }
      return str;
    },
    setData(data:any) {
      if(Object.keys(data).length > 0) {
        const {items, count} = data;
        this.count_items = count;
        this.items = items;
      } else {
        this.items = [];
        this.count_items = 0;
      }
    },
    async filteringItems(query:any) {
      const data = await $fetch(`/api/items?${this.queryToString(query)}`, { method: 'GET'});
      this.setData(data);
      return { items:this.items, count_items:this.count_items };
    },
    async getItems(params:any, query:any):Promise<any> {
      const {refresh, data } = await useAsyncData(
        'category',
        () => $fetch(`/api/v1/items?${this.queryToString(params)}&${this.queryToString(query)}`)
      );
      await refresh();
      
      return data.value;
    },
    async getItem(id:number) {
      const {refresh, data } = await useAsyncData(
        'cart',
        () => $fetch(`/api/v1/${id}`, { method: 'GET'})
      );
      await refresh();
      
      return data.value;
    },
    async getCategories() {
      const { data } = await useAsyncData(
        'categories',
        () => $fetch(`/api/v1/categories`, { method: 'GET'})
      );
      this.categories = data.value;
    },
    async getFilters() {
      const { data } = await useAsyncData(
        'filters',
        () => $fetch(`/api/v1/filters`, { method: 'GET'})
      );
      this.filters = data.value;
    },
    async getFilterData() {
      await this.getCategories();
      await this.getFilters();
    }
  },
})