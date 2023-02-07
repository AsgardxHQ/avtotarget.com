import { defineStore } from 'pinia';

export const settings = defineStore({
  id: 'settings',
  state: () => {
    return {
      uploader: {
        error: null,
        success: null
      }
    }
  }
})