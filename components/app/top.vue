<template>
  <div class="w-full flex justify-between bg-slate-600 px-5 py-1">
    <div class="flex item-center text-xs text-slate-100">
      <NuxtLink class="py-1 px-2 hover:text-slate-900" :to="`/${$route.params.locale}`">{{ $t('mainPage') }}</NuxtLink>
      <NuxtLink class="py-1 px-2 hover:text-slate-900" :to="`/${$route.params.locale}/pages/about_us`">{{ $t('pages.about_us') }}</NuxtLink>
      <NuxtLink class="py-1 px-2 hover:text-slate-900" :to="`/${$route.params.locale}/pages/delivery`">{{ $t('pages.delivery') }}</NuxtLink>
      <NuxtLink class="py-1 px-2 hover:text-slate-900" :to="`/${$route.params.locale}/pages/contacts`">{{ $t('pages.contacts') }}</NuxtLink>
    </div>
    <div class="block-lang text-xs text-slate-100">
      <client-only>
      <template v-if="!currentuser">
        <button type="button" class="py-1 px-2 hover:text-slate-100" @click="openSignIn()">{{ $t('come_in') }}</button>
      </template>
      <template v-else>
        <button type="button" class="py-1 px-2" v-if="isAdmin" @click.prevent="openCockpit()"><i class="pi pi-cog"></i></button>
        <button type="button" class="py-1 px-2 hover:text-slate-100" @click="clikLogout()">{{ $t('logout') }}</button>
      </template>
      </client-only>
      <NuxtLink class="py-1 px-2 hover:text-slate-100 active:bg-slate-100" :to="{params: {locale: 'uk'}}">UK</NuxtLink>
      <NuxtLink class="py-1 px-2 hover:text-slate-100" :to="{params: {locale: 'ru'}}">RU</NuxtLink>
    </div>
  </div>
  <div class="w-full bg-slate-0 mb-5 px-5 border-t border-b border-gray-200 shadow-md">
    <div class="h-32 flex items-center justify-between">
      <NuxtLink :to="`/${$route.params.locale}`" class="w-1/4 px-8">
        <img src="/images/logo-6.png" class="w-full">
      </NuxtLink>
      <form class="md:w-2/4 sm:w-2/3 px-5" @submit.prevent="search()">
        <div class="flex w-full shadow-md">
          <input type="text" name="search" v-model="searchText" class="w-full form-input px-4 py-3 rounded-l-md outline-0" :placeholder="$t('search_pl')">
          <button type="submit" class="w-20 px-4 py-3 bg-slate-600 text-gray-100 rounded-r-md outline-0 transition-all hover:bg-slate-400">{{ $t('search_btn') }}</button>
        </div>
      </form>
      <div class="w-1/4 flex justify-end">
        <client-only>
          <Cart />
        </client-only>
      </div>
    </div>
  </div>
  <Auth :openSignIn="openSignIn" v-if="showModal" />
  <client-only>
    <Cockpit v-if="isAdmin && isOpen" @closeCockpit="closeCockpit()" />
  </client-only>
</template>

<script lang="ts" setup>
  import Cart from "@/components/app/cart.vue";
  import Auth from "@/components/app/auth.vue";
  import Cockpit from "@/components/cockpit/index.vue";
  const route = useRoute();
  const router = useRouter();
  const { logout } = useAuth();
  const currentuser = useAuthUser();
  const isAdmin = useAdmin();
  const isOpen = ref(false);
  const showModal = ref(false);
  const searchText = ref(route.params.request || '');

  const search = async () => {
    if((searchText.value as string).trim().length > 0) {
      router.push(`/${route.params.locale}/search/${(searchText.value as string).trim().toLowerCase()}`);
    }
  }

  const openSignIn = () => {
    showModal.value = !showModal.value;
  }
  const openCockpit = async () => {
    document.body.classList.add('overflow-hidden');
    isOpen.value = true;
  }
  const closeCockpit = () => {
    document.body.classList.remove('overflow-hidden');
    isOpen.value = false;
  }
  const clikLogout = async () => {
    await logout()
  }
</script>

<style>
  .block-lang .router-link-active {
    @apply bg-slate-900;
  }
</style>