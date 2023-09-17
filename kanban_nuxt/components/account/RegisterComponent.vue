<template>

    <form @submit.prevent="handleRegister">
      <div class="form-container">
        <p class="text-white text-2xl my-3">Register</p>
        <input
          type="email"
          v-model="email"
          class="input-form"
          placeholder="enter email"
          required
        />
        <input
          type="password"
          v-model="password"
          class="input-form mt-6"
          placeholder="enter password"
          required
        />
        <button
          type="submit"
          class="btn-form mt-8 tracking-wider font-bold bg-black hover:bg-[#1a191a] text-[#df3459] p-2 w-full rounded-md"
        >
          Register
        </button>
      </div>
    </form>
 
</template>
<script setup>
import { ref } from "vue";
import { useAppStore } from "@/stores/AppStore";


// Refs
const email = ref("");
const password = ref("");

const handleRegister = () => {
    useAppStore().registerUser(email.value, password.value)
    //console.log(email.value, password.value);
    email.value = "";
    password.value = "";
}
</script>
<style></style>
