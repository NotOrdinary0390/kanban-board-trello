<template>
  <TrashComponent ref="trash"/>

  <div class="div-input px-1 py-3 ml-8 mt-5">
    <form @submit.prevent="addColumn" class="flex px-2">
      <input
        type="text"
        class="px-3 py-[0.3em] rounded-md mr-2 w-[300px]"
        placeholder="Add Colum"
        v-model="newColTitle"
        required
      />
      <button
        type="submit"
        class="border border-white w-8 flex items-center rounded-full hover:bg-black flex justify-center"
      >
        <span class="material-symbols-outlined text-white"> add </span>
      </button>
    </form>
  </div>

  <div class="flex mt-12 mx-8 space-x-4">
    <draggable
      v-if="columnsLoaded"
      :list="columns"
      group="column"
      class="flex flex-wrap"
      item-key="column"
    >
      <template #item="{ element: column }" :key="column.id">
        <ColumnComponent
          :title="column.title"
          :id="column.id"
          :loadColumns="loadColumns"
          @refreshTrash="refreshTrash"
        />
      </template>
    </draggable>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useAppStore } from "@/stores/AppStore";
import axios from "axios";
import draggable from "vuedraggable";

definePageMeta({
  middleware: ["auth"],
});

const newColTitle = ref("");
const columns = ref([]);
const trash = ref(null)
let columnsLoaded = ref(false);

onMounted(() => {
  loadColumns();
});

//function from useTaskStore to add new column
const addColumn = () => {
  useAppStore()
    .createColumn(newColTitle.value)
    .then(() => {
      loadColumns();
    });
  //console.log(newColTitle.value);
  newColTitle.value = "";
};

const loadColumns = () => {
  axios
    .get("http://localhost:3000/columns")
    .then((response) => {
      columns.value = response.data;
      columnsLoaded.value = true;
      //console.log(columns.value);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const refreshTrash = () => {
  trash.value.loadTrashTasks();
};
</script>
<style scoped>
.div-input {
  width: 370px;
  background-color: #df3459;
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  align-items: center;
  margin-right: 1em;
}
</style>
