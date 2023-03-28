<template>
  <div class="pagination flex items-center justify-center">
    <button 
      type="button"
      v-if="currentPage > 1" 
      @click="goToPage(1)" 
      class="text-2xl py-2 px-4 mx-1 border border-slate-200 cursor-pointer">
        <i class="pi pi-angle-double-left"></i>
    </button>
    <span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200" v-else>
      <i class="pi pi-angle-double-left"></i>
    </span>

    <button 
      v-if="currentPage > 1" 
      @click="goToPage(currentPage - 1)" 
      class="text-2xl py-2 px-4 mx-1 border border-slate-200 cursor-pointer"
    >
        <i class="pi pi-angle-left"></i>
    </button>
    <span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200" v-else><i class="pi pi-angle-left"></i></span>

    <div class="pagination-pages overflow-hidden flex items-center">
      <template 
        v-for="index in Math.ceil(pagination.count / 20)"
        :key="index">
        <button 
          @click="goToPage(index)" 
          class="text-2xl py-2 px-4 mx-1 border border-slate-200"
          :class="currentPage === index ? 'active' : ''"
          v-if="getPages.min <= index && getPages.max >= index"
        >
        {{ index }}
        </button>
      </template>
    </div>

    <button 
      v-if="currentPage < Math.ceil(pagination.count / 20)" 
      @click="goToPage(currentPage+1)" 
      class="text-2xl py-2 px-4 mx-1 border border-slate-200 cursor-pointer"
    >
      <i class="pi pi-angle-right"></i>
    </button>
    <span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200" v-else><i class="pi pi-angle-right"></i></span>

    <button 
      v-if="currentPage < Math.ceil(pagination.count / 20)" 
      @click="goToPage(Math.ceil(pagination.count / 20))" 
      class="text-2xl py-2 px-4 mx-1 border border-slate-200 cursor-pointer"
    >
      <i class="pi pi-angle-double-right"></i>
    </button>
    <span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200" v-else><i class="pi pi-angle-double-right"></i></span>
  </div>
</template>

<script setup lang="ts">
  const { pagination } = defineProps(['pagination']);
  const emit = defineEmits(['changePage'])
  const currentPage = ref(1);
  const getPages = computed(() => {
    const obj = {
      min: 0,
      max: 0
    }
    if(currentPage.value < 3) {
      obj.min = 0;
      obj.max = 6;
    } else {
      obj.min = currentPage.value - 3;
      obj.max = currentPage.value + 2;
    }
    return obj;
  });
  const goToPage = (page) => {
    currentPage.value = page;
    emit('changePage', page);
  }
</script>

<style>
  .pagination-pages .active {
    @apply border-sky-500;
    @apply text-sky-900;
  }
</style>