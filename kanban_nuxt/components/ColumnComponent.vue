<template>
  <div
    class="bg-[#ebb25cbb] mr-3 w-[320px] mt-3 px-2 py-2 rounded-md shadow-col"
    :key="props.id"
    draggable="true"
    @drop="onDrop"
  >
    <div class="h-12 p-1 px-3 flex justify-between">
      <h2 class="ml-3 min-w-[60%] h-10 text-3xl title-colum font-bold">
        {{ props.title }}
      </h2>
      <!-- {{ "idCol: " + props.id }} -->
      <button
        @click="deleteCol(props.id)"
        class="mb-2 border-2 border-black h-7 w-7 rounded-full hover:bg-[#f86d8b] flex items-center justify-center"
      >
        <span class="material-symbols-outlined text-xl text-black">
          delete
        </span>
      </button>
    </div>
    <div class="w-full h-1 border border-black mb-3"></div>
    <TaskComponent :columnId="props.id" @refreshTrash="refreshTrash"/>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { useAppStore } from "~/stores/AppStore";

const props = defineProps(["title", "id", "key", "loadColumns"]);

// Function to delete column by id
const deleteCol = (columnId) => {
  useAppStore()
    .deleteColumn(columnId)
    .then(() => {
      props.loadColumns();
    })
    .catch((error) => {
      console.error(
        `Errore durante l'eliminazione della colonna con ID ${columnId}:`,
        error
      );
    });
};

const onDrop = (event) => {
  event.preventDefault();
  // Parse the JSON data from the event
  const data = JSON.parse(event.dataTransfer.getData("application/json"));
  // Extract the taskId from the data object
  const taskId = data.taskId;
  //console.log("idTask: " + taskId);
  //console.log("idCol. " + props.id);

  // Use the Appstore to update the task's columnId
  useAppStore().updateTaskColumnId(taskId, props.id);
};

const refreshTrash = () => {
  emit('refreshTrash');
}

const emit = defineEmits(['refreshTrash']);
</script>
<style scoped>
.shadow-col {
  box-shadow: 1px 1px 3px 0px #fff;
}
</style>
