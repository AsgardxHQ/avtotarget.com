<template>
  <div class="max-w-screen-xl mx-auto">
    <Top></Top>
    <NuxtLoadingBar :duration="3000" />
    <NuxtPage class="m-auto md:w-full md:px-4 md:w-full xl:max-w-5xl" />
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Top from "@/components/app/top.vue";
import NuxtLoadingBar from "@/components/app/NuxtLoadingBar.vue";
import Footer from "@/components/app/footer.vue";
import { cartStore } from "@/stores/cart";
import { getAllData } from "@/stores/index";

export default {
  data() {
    return {
      categories: [],
      filters: []
    }
  },
  head () {
    return {
      bodyAttrs: {
        class: "bg-slate-100"
      }
    }
  },
  components: {
    Top,
    NuxtLoadingBar,
    Footer
  },
  created() {
    getAllData().getFilters();
    getAllData().getCategories();
  },
  mounted() {
    cartStore().initCart();
  }
}
</script>
<style>

html {
  line-height: 1;
}
.pi {
  font-size: inherit;
}
</style>