<template>
  <div class="pagination flex items-center justify-center">
    <NuxtLink 
      v-if="+route.params.page > 1" 
      :to="{ params: { page: 1}, query: route.query }" 
      class="text-2xl py-2 px-4 mx-1 border border-slate-200">
        <i class="pi pi-angle-double-left"></i>
    </NuxtLink>
    <span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200" v-else>
      <i class="pi pi-angle-double-left"></i>
    </span>

    <NuxtLink 
      v-if="+route.params.page > 1" 
      :to="{ params: { page: +route.params.page - 1 }, query: route.query }" 
      class="text-2xl py-2 px-4 mx-1 border border-slate-200"
    >
        <i class="pi pi-angle-left"></i>
    </NuxtLink>
    <span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200" v-else><i class="pi pi-angle-left"></i></span>

    <div class="pagination-pages overflow-hidden flex items-center">
      <template 
        v-for="index in Math.ceil(pagination.count / 20)"
        :key="index">
        <NuxtLink 
          :to="{ params: { page: index }, query: route.query }" 
          class="text-2xl py-2 px-4 mx-1 border border-slate-200"
          :class="+route.params.page === index ? 'active' : ''"
          v-if="getPages.min <= index && getPages.max >= index"
        >
        {{ index }}
        </NuxtLink>
      </template>
    </div>

    <NuxtLink 
      v-if="+route.params.page < Math.ceil(pagination.count / 20)" 
      :to="{ params: { page: +route.params.page + 1 }, query: route.query }" 
      class="text-2xl py-2 px-4 mx-1 border border-slate-200"
    >
      <i class="pi pi-angle-right"></i>
    </NuxtLink>
    <span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200" v-else><i class="pi pi-angle-right"></i></span>

    <NuxtLink 
      v-if="+route.params.page < Math.ceil(pagination.count / 20)" 
      :to="{ params: { page: Math.ceil(pagination.count / 20)}, query: route.query }" 
      class="text-2xl py-2 px-4 mx-1 border border-slate-200"
    >
      <i class="pi pi-angle-double-right"></i>
    </NuxtLink>
    <span class="text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200" v-else><i class="pi pi-angle-double-right"></i></span>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const { pagination, refresh } = defineProps(['pagination', 'refresh']);
  const getPages = computed(() => {
    const page = +route.params.page;
    const obj = {
      min: 0,
      max: 0
    }
    if(page < 3) {
      obj.min = 0;
      obj.max = 6;
    } else {
      obj.min = page - 3;
      obj.max = page + 2;
    }
    return obj;
  });
</script>

<style>
  .pagination-pages .active {
    @apply border-sky-500;
    @apply text-sky-900;
  }
</style>