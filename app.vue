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

export default {
  data() {
    return {}
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
    if(!this.$route.params.locale) {
      this.$router.replace('/uk');
    }
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