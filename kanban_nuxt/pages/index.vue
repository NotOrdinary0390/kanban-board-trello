<template>
  <div class="w-fit mt-28 mx-auto p-1">
    <div
      class="px-5 border border-white h-10 my-8 rounded flex justify-center items-center space-x-6 bg-[#df3459]"
    >
      <p
        class="cursor-pointer text-center rounded font-bold px-3 py-1 w-20 hover:bg-black hover:text-[#df3459] underline"
        @click="showLogin"
      >
        LOGIN
      </p>
      <p
        class="cursor-pointer text-center rounded font-bold px-3 py-1 w-28 hover:bg-black hover:text-[#df3459] underline"
        @click="showRegister"
      >
        REGISTER
      </p>
    </div>
    <div v-if="showLoginForm">
      <AccountLoginComponent />
    </div>
    <div v-if="showRegisterForm" class="mt-8">
      <AccountRegisterComponent />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

useHead({
  title: "Kanban-app-board",
  meta: [{ name: "a kanban board Trello style", content: "My amazing board" }],
});

// definePageMeta({
//   middleware: [ "auth" ]
// })

const showLoginForm = ref(true);
const showRegisterForm = ref(false);

const showLogin = () => {
  showLoginForm.value = true;
  showRegisterForm.value = false;
};

const showRegister = () => {
  showLoginForm.value = false;
  showRegisterForm.value = true;
};
</script>

<style></style>
