import { defineStore } from 'pinia';

export const getAllData = defineStore({
  id: 'getAllData',
  state: () => {
    return {
      items: [],
      count_items: 0,
      refresh: null
    }
  },
  actions: {
    queryToString(query) {
      let str = ""
      for(let key in query) {
        if(query[key]) {
          str += `${key}=${query[key]}&`;
        }
      }
      return str;
    },
    setData(data) {
      if(Object.keys(data).length > 0) {
        const {items, count} = data;
        this.count_items = count;
        this.items = items;
      } else {
        this.items = [];
        this.count_items = 0;
      }
    },
    async filteringItems(query) {
      const data = await $fetch(`/api/items?${this.queryToString(query)}`, { method: 'GET'});
      this.setData(data);
      return { items:this.items, count_items:this.count_items };
    },
    async getItems(params, query):Promise<any> {
      const {refresh, data } = await useAsyncData(
        'category',
        () => $fetch(`/api/v1/items?${this.queryToString(params)}&${this.queryToString(query)}`)
      );
      await refresh();
      
      return data.value;
    },
    async getItem(id) {
      const {refresh, data } = await useAsyncData(
        'cart',
        () => $fetch(`/api/v1/${id}`, { method: 'GET'})
      );
      await refresh();
      
      return data.value;
    },
    async getCategories() {
      const { data } = await useFetch('/api/v1/categories');
      return data.value;
    }
  },
})