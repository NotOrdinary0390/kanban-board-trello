<template>
  <div class="header-container flex justify-between items-center">
    <h1 class="text-white font-extrabold text-2xl">Example KanbanBoard</h1>

    <nuxt-link to="/board" class="underline"> Go to Board </nuxt-link>

    <div class="flex mr-2 space-x-4">
      <nuxt-link to="/">
        <span
          class="material-symbols-outlined text-white text-4xl hover:text-black cursor-pointer"
        >
          account_circle
        </span>
      </nuxt-link>

      <span
        class="material-symbols-outlined text-white text-4xl hover:text-black cursor-pointer"
        @click="handleLogout"
      >
        logout
      </span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

//Logout User Icon
const handleLogout = () => {
  localStorage.removeItem("sessionToken");
  router.push({ path: "/" });
};
</script>

<style scoped>
.header-container {
  height: 70px;
  background-color: #f93684aa;
  padding: 1em;
  box-shadow: 0 5px 10px 0px #fff;
}

.div-input {
  width: 250px;
  background-color: #df3459;
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  align-items: center;
  margin-right: 1em;
}
</style>
