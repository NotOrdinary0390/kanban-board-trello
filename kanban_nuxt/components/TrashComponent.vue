<template>
  <div
    class="absolute top-40 right-0 bg-[#cec5c5d6] hover:bg-[#d8d9e4] flex justify-center items-center cursor-pointer p-2 w-20 h-16"
    @click="handleShowTrash"
  >
    <span class="material-symbols-outlined text-3xl text-black">delete</span>
    <p class="text-sm">Open Trash</p>
  </div>
  <!-- Hidden Trash Component -->
  <div class="div-trash" :class="{ 'div-trash-show': showTrash }">
    <div class="flex">
      <span
        class="material-symbols-outlined text-[14pt] cursor-pointer"
        @click="handleShowTrash"
      >
        close
      </span>
      <p class="ml-12">Task Trash</p>
    </div>

    <div class="border border-black"></div>
    <div
      v-for="task in tasksT"
      class="my-3 bg-white rounded-xl w-full h-fit px-1 py-2 mx-auto px-2 flex justify-between"
      :key="task.id"
    >
      {{ task.body }}
      <span
        class="material-symbols-outlined cursor-pointer"
        @click="deleteTrashTask(task.id)"
      >
        delete_forever
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useAppStore } from "~/stores/AppStore";

const showTrash = ref(false);
const tasksT = ref([]);

// Handle to show the hidden Trash
const handleShowTrash = () => {
  showTrash.value = !showTrash.value;
};

onMounted(() => {
  loadTrashTasks();
});

const loadTrashTasks = () => {
  axios
    .get("http://localhost:3000/tasks")
    .then((response) => {
      // Filter tasks based on task.trash === false
      tasksT.value = response.data.filter((task) => {
        return task.trash === true;
      });
      console.log(tasksT.value);
    })
    .catch((error) => {
      console.error("Error in fetching columns:", error);
    });
};

//function from useAppStore to delete a task definitively
const deleteTrashTask = (taskId) => {
  console.log(taskId);
  useAppStore()
    .deleteTask(taskId)
    .then(() => {
      loadTrashTasks();
    });
};
</script>

<style scoped>
.div-trash {
  width: 320px;
  height: 100%;
  background-color: #d8d9e4;
  padding: 1em;
  position: absolute;
  top: 160px;
  right: 0;
  display: none;
}

.div-trash-show {
  display: block;
  animation: slideRight 0.8s cubic-bezier(0.42, 0, 0.58, 1);
}

@keyframes slideRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.8s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>
