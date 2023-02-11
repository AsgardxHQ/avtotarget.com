<template>
  <div class="flex">
    <div class="w-full">
      <div class="w-full px-2 py-3">
        <h3 class="text-slate-600 border-b-2 border-zinc-500 flex justify-between items-center"><span class="text-2xl">{{ $t('search_hl') }}</span> <span class="text-sm">{{ $t('found') }}: {{ count }}</span></h3>
      </div>
      <div v-if="currentItems && currentItems.length > 0"
        class="w-full min-h-80 grid grid-flow-row-dense grid-cols-4 mb-12">
        <Item :items="currentItems" />
        <button 
          v-if="count > 19"
          type="button"
          class="group m-2 relative btn-load-next flex items-start"
          @click.prevent="getNextItems()"
        >
          <div class="group-hover:shadow-lg z-50 bg-zinc-100 rounded-md shadow-md flex items-center justify-center w-full">
            <span class="text-xl uppercase font-bold">{{ $t('show_more') }}</span>
          </div>
        </button>
      </div>
    </div>
    <div v-if="isLoader" class="fixed inset-0 w-full h-full bg-slate-200/50 flex justify-center items-center">
      <span class="text-2xl text-slate-800">LOADING</span>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
  import Item from "@/components/app/item.vue";
  const currentItems = ref([]);
  const route = useRoute();
  const isLoader = ref(false);
  const page = ref(1);
  const count = ref(0);
  onUnmounted(() => {
    delete useNuxtApp().payload.data['search']
  });
  onMounted(() => {
    delete useNuxtApp().payload.data['search']
  });
  const { data } = await useAsyncData('search', () => 
    $fetch(
      `/api/v1/search/${route.params.request}`,
    )
  );
  currentItems.value = data.value.items;
  count.value = data.value.count;
  const getNextItems = () => {
    page.value += 1;
    console.log(page);
  }
</script>

<style>
  .min-h-80 {
    min-height: 360px;
  }
  .btn-load-next > div {
    height: 296px;
  }
</style>