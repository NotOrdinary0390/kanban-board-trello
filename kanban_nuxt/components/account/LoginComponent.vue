<template>
  <form @submit.prevent="handleLogin">
    <div class="form-container">
      <p class="text-white text-2xl my-3">Login</p>
      <input
        type="email"
        class="input-form"
        placeholder="enter email"
        v-model="email"
        required
      />
      <input
        type="password"
        class="input-form mt-6"
        placeholder="enter password"
        v-model="password"
        required
      />
      <button
        type="submit"
        class="btn-form mt-8 tracking-wider font-bold bg-black hover:bg-[#282328] text-[#df3459] p-2 w-full rounded-md"
      >
        Login
      </button>
    </div>
  </form>
</template>
<script setup>
import { ref } from "vue";
import { useAppStore } from "@/stores/AppStore";
import { useRouter } from 'vue-router';

const router = useRouter();

// Refs
const email = ref("");
const password = ref("");

const handleLogin = () => {
    useAppStore().loginUser(email.value, password.value).then(() =>{
        setTimeout(() => {
            router.push( { path: "/board" })
            }, 2000 )
    })
    //console.log(email.value, password.value);
}
</script>
<style></style>
