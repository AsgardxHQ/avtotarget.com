
export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      toPrice: (price: number, count = 1) => {
        const p = price / 100 * count;
        return p.toFixed(2);
      }
    }
  }
})