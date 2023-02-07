import { defineStore } from 'pinia';
import { getAllData } from './index';
import type { Item } from '~~/types';
let cart:Array<Object> = [];
if(process.client) {
  const cartStorage:string|null = localStorage.getItem('cart');
  cart = cartStorage ? JSON.parse(cartStorage) : [];
}
export const cartStore = defineStore({
  id: "cartStore",
  state: () => {
    return {
      cart: cart,
    }
  },
  actions: {
    async set(id:number, count:number) {
      const isItem = this.cart.find((f:any) => f.id === id);
      if(isItem) {
        isItem.count += count;
      } else {
        const { item } = await getAllData().getItem(id);
        item.count = count;
        this.cart.push(item);
      }
      this.setToStorage();
    },
    get():object[] {
      return this.cart;
    },
    delete(id:number) {
      this.cart = this.cart.filter((item:Item) => item.id !== id);
      this.setToStorage();
    },
    setToStorage() {
      if(process.client) {
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    }
  }
});