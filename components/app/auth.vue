<template>
  <div class="fixed top-0 left-0 w-full h-full bg-slate-800/50 flex items-center justify-center">
    <div class="rounded w-96 p-8 bg-white shadow-2xl">
      <div class="relative pt-6 flex">
        <a class="absolute -right-2 -top-2 text-gray-400 hover:text-gray-700" @click.prevent="openSignIn()" href=""><i
            class="pi pi-times"></i></a>
        <div class="w-1/2 text-center rounded-t py-2 cursor-pointer hover:bg-gray-200"
          :class="typeAuth === 0 ? 'bg-gray-200' : ''" @click="changeTypeAuth(0)">
          <h3 class="uppercase">{{ $t("sign_in") }}</h3>
        </div>
        <div class="w-1/2 text-center rounded-t py-2 cursor-pointer hover:bg-gray-200"
          :class="typeAuth === 1 ? 'bg-gray-200' : ''" @click="changeTypeAuth(1)">
          <h3 class="uppercase">{{ $t("reg_in") }}</h3>
        </div>
      </div>
      <template v-if="typeAuth === 0">
        <div class="border-y py-4">
          <div class="py-2 flex items-center">
            <input class="w-full form-input px-4 py-3 rounded outline-0 border" type="email" placeholder="Email"
              v-model="form.email">
            {{ error.email }}
          </div>
          <div class="py-2 flex items-center">
            <input class="w-full form-input px-4 py-3 rounded outline-0 border" type="password" placeholder="Пароль"
              v-model="form.password">
            {{ error.password }}
          </div>
        </div>
        <div class="pt-4 flex justify-end">
          <button class="bg-green-700 hover:bg-green-900 mt-2 py-3 px-6 rounded text-white uppercase text-xs font-bold"
            @click.prevent="sign_in()">{{ $t('come_in') }}</button>
        </div>
      </template>
      <template v-else>
        <div class="border-y py-4">
          <div class="py-2 flex items-center">
            <input class="w-full form-input px-4 py-3 rounded outline-0 border" type="email" placeholder="Email"
              v-model="form.email">
            {{ error.email }}
          </div>
          <div class="py-2 flex items-center">
            <input class="w-full form-input px-4 py-3 rounded outline-0 border" type="password" placeholder="Пароль"
              v-model="form.password">
            {{ error.password }}
          </div>
          <div class="py-2 flex items-center">
            <input class="w-full form-input px-4 py-3 rounded outline-0 border" type="password"
              placeholder="Подтвердить пароль" v-model="form.password_confirm">
            {{ error.password_confirm }}
          </div>
        </div>
        <div class="pt-4 flex justify-end">
          <button class="bg-green-700 hover:bg-green-900 mt-2 py-3 px-6 rounded text-white uppercase text-xs font-bold"
            @click.prevent="registration()">{{ $t('come_in') }}</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { openSignIn } = defineProps({
  openSignIn: Function
});
const typeAuth = ref(0);
const changeTypeAuth = (type: number) => {
  typeAuth.value = type
};

const error = ref({
  email: null,
  password: null,
  password_confirm: null,

});
const form = ref({
  email: '',
  password: '',
  password_confirm: ''
});

const registration = async () => {
  const reg = form.value;
  if (reg.password === reg.password_confirm) {
    const user = await useFetch('/api/auth/registration', { method: 'POST', body: reg });
    if (!user.error) {
      openSignIn();
    } else {
      error.value.email = true;
    }
  } else {
    error.value.password_confirm = true;
  }
};
const sign_in = async () => {
  const { email, password } = form.value;
  const user = await useAuth().login(email, password, null);
  if(user) {
    openSignIn();
  }
}

</script>