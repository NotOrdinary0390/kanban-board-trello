<template>
  <span
    class="material-symbols-outlined font-bold hover:text-yellow-400 cursor-pointer text-xl"
    @click="handleShowPopupEdit()"
  >
    edit
  </span>
  <!-- popup to edit the Task values-->
  <div v-if="showPopupEdit" class="pop-edit show-popup py-3">
    {{ props.idTask }}
    <p class="text-xl font-semibold">Edit the Task</p>
    <div
      class="flex items-center relative left-[410px] top-[-30px] hover:text-red-500 cursor-pointer"
      @click="handleShowPopupEdit()"
    >
      Close
      <span class="material-symbols-outlined font-bold text-[14pt]">
        close
      </span>
    </div>
    <div class="w-full p-1">
      <form @submit.prevent="editTask(props.idTask)" class="">
        <div class="flex flex-col">
          <label
            for="body"
            class="text-lg text-start ml-10 font-semibold mt-3 mb-1"
          >
            Text
          </label>
          <input
            type="text"
            id="body"
            class="w-[400px] px-3 py-2 rounded mx-auto text-black border border-black"
            v-model="newTaskBodyValue"
            :placeholder="props.bodyTask"
          />
          <label
            for="priority"
            class="text-lg text-start ml-10 font-semibold mt-3 mb-1"
          >
            Priority
          </label>
          <select
            name="priority"
            class="w-[400px] px-3 py-2 rounded mx-auto text-black border border-black text-center"
            v-model="newValuePriority"
          >
            <option value="" selected class="mx-auto">{{ props.priority }}</option>
            <option value="low" class="mx-auto">Low</option>
            <option value="medium" class="mx-auto">Medium</option>
            <option value="high" class="mx-auto">High</option>
          </select>
          <button
            type="submit"
            class="bg-green-400 hover:bg-green-600 hover:text-white w-28 py-1 px-3 rounded-xl text-xl mx-auto mt-8"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  </div>
  <div></div>
</template>
<script setup>
import { ref, defineProps } from "vue";
import axios from "axios";
import { useAppStore } from "~/stores/AppStore";

const props = defineProps(["idTask", "bodyTask", "priority"]);

const showPopupEdit = ref(false);
const newTaskBodyValue = ref("");
const newValuePriority = ref("");

//Handle handleShowPopup to edit ove the Task
const handleShowPopupEdit = () => {
  showPopupEdit.value = !showPopupEdit.value;
};

// Call the `changeValueTask` function from the `useTaskStore`
const editTask = () => {
  useAppStore().changeValueTask(
    props.idTask,
    newTaskBodyValue.value,
    newValuePriority.value
  );
  //console.log(props.idTask);
};
</script>
<style scoped>
.pop-edit {
  border: 0.5px solid #000;
  width: 500px;
  height: 410px;
  background-color: #fffffff4;
  border-radius: 10px;
  position: absolute;
  left: auto;
  top: 15%;
  z-index: 10;
  opacity: 0;
  transform: scale(0.5);
  animation: openPopup 0.3s forwards;
}

@keyframes openPopup {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
