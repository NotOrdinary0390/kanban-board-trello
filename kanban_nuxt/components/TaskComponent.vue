<template>
  <!-- Add newTask to column-->
  <div class="border border-black p-1 my-1 rounded-2xl">
    <form @submit.prevent="addTask" class="flex items-center">
      <input
        type="text"
        class="w-full px-3 py-1 rounded-xl mr-1"
        v-model="newTaskbody"
        placeholder="text task"
      />
      <button type="submit" class="">
        <span class="material-symbols-outlined text-2xl hover:text-white">
          add_circle
        </span>
      </button>
    </form>
  </div>

  <!-- Tasks -->
  <draggable :list="tasks" group="tasks" item-key="task">
    <div v-for="element in tasks" :key="element.name">
      {{ element.name }}
    </div>

    <template #item="{ element: task }" :key="task.id">
      <div
        class="my-3 bg-white rounded w-full h-fit px-1 py-2 mx-auto"
        draggable="true"
        @dragstart="onDragStart($event, task.id)"
      >
        <div class="flex justify-between">
          <div class="w-[90%] px-2 h-fit mr-1">
            <p class="tracking-widest">
              {{ task.body }}
            </p>
            <!-- {{ "idColumnTask: " + this.columnId }}<br />
            {{ "idTask: " + task.id }} -->
          </div>
          <div class="flex text-center mr-1">
            <!-- Btn To open popup Trash -->
              <span
                class="material-symbols-outlined font-bold hover:text-red-500 cursor-pointer text-xl mr-1"
                @click="handleShowPopupTrash()"
              >
                close
              </span>
            <!-- Popup Move To Trash -->
            <div v-if="showPopupTrash" class="pop-trash show-popup py-3">
              <p>Are you sure to move the task to Trash?</p>
              <div class="flex w-full p-2 my-3 justify-center space-x-8">
                <button
                  class="bg-red-400 hover:bg-red-600 w-14 h-14 p-3 rounded-full text-xl"
                  @click="handleMoveToTrash(task.id, task.body)"
                >
                  Yes
                </button>
                <button
                  class="bg-green-400 hover:bg-green-600 w-14 h-14 p-3 rounded-full text-xl"
                  @click="handleShowPopupTrash()"
                >
                  No
                </button>
              </div>
            </div>
            <!-- icon Component To Edit the Task -->
            <ChangeValueTaskComponent :idTask="task.id" :bodyTask="task.body" :priority="task.priority"/>
          </div>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script setup>
import { ref, defineProps } from "vue";
import axios from "axios";
import draggable from "vuedraggable";
import { useAppStore } from "~/stores/AppStore";

const props = defineProps(["columnId"]);
const columnId = props.columnId;

const tasks = ref([]);
const newTaskbody = ref("");
const showPopupTrash = ref(false);

onMounted(() => {
  loadTasks();
});

const loadTasks = () => {
  axios
    .get("http://localhost:3000/tasks")
    .then((response) => {
      // Filter tasks based on columnId and task.trash === false
      tasks.value = response.data.filter((task) => {
        return task.columnId === columnId && task.trash === false;
      });
      //console.log(tasks.value);
    })
    .catch((error) => {
      console.error("Error in fetching columns:", error);
    });
};
//function from useTaskStore to add new task
const addTask = () => {
  useAppStore()
    .createTask(newTaskbody.value, columnId)
    .then(() => {
      loadTasks();
    });
  newTaskbody.value = "";
};

//Handle handleShowPopup to move the Task to Trash
const handleShowPopupTrash = () => {
  showPopupTrash.value = !showPopupTrash.value;
};

//Handle to move the Task to Trash
const handleMoveToTrash = (taskId, taskBody) => {
  //console.log(taskId)
  useAppStore()
    .moveToTrash(taskId, taskBody)
    .then(() => {
      loadTasks();
      emit('refreshTrash');
    });
  showPopupTrash.value = !showPopupTrash.value;
};

const onDragStart = (event, taskId) => {
  // Create a data object containing the taskId
  const data = { taskId };

  // Set the data transfer format as JSON and stringify the data
  event.dataTransfer.setData("application/json", JSON.stringify(data));
  //console.log("idTaskStart: " + taskId);
  //console.log("idColStart: " + columnId);
};

const emit = defineEmits(['refreshTrash']);
</script>

<style scoped>
.pop-trash {
  border: 0.5px solid #000;
  width: 320px;
  height: 140px;
  background-color: #ffffffef;
  border-radius: 10px;
  position: absolute;
  left: 40%;
  top: 10%;
  transform: translate(-50%);
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
