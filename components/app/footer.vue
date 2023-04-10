<template>
  <footer class="bg-slate-500 mt-8">
    <div class="w-full py-4 flex item-center justify-center text-xs text-slate-100">
      <NuxtLink class="py-1 px-2 text-lg hover:text-slate-900" :to="`/${$route.params.locale}`">{{ $t('mainPage') }}</NuxtLink>
      <NuxtLink class="py-1 px-2 text-lg hover:text-slate-900" :to="`/${$route.params.locale}/pages/about_us`">{{ $t('pages.about_us') }}</NuxtLink>
      <NuxtLink class="py-1 px-2 text-lg hover:text-slate-900" :to="`/${$route.params.locale}/pages/delivery`">{{ $t('pages.delivery') }}</NuxtLink>
      <NuxtLink class="py-1 px-2 text-lg hover:text-slate-900" :to="`/${$route.params.locale}/pages/contacts`">{{ $t('pages.contacts') }}</NuxtLink>
    </div>
    <div class="w-full flex justify-center text-lg pb-4">&copy; {{ year }} autotarget.com. ALL RIGHTS RESERVED.</div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>