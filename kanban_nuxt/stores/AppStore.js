import { defineStore } from 'pinia';
import axios from 'axios';

// Define the store named 'AppStore'
export const useAppStore = defineStore('AppStore', {
  // Define the state of the store
  state: () => {
    return {
      user: [],
      columnList: [], // List to hold columns
      taskList: [],   // List to hold tasks
      successMessage: "", // Messages succes register/login
      errorMessage: ""  // Messages error register/login
    }
  },

  // Define getters (currently empty)
  getters: {
    // ...
  },

  // Define actions
  actions: {
    //Register new user
    async registerUser(email, password) {
      if (email && password) {
        await axios.post('http://localhost:3000/users', {
          email: email,
          password: password
        })
          .then(response => {
            //console.log(response.data);
            this.successMessage = "Registration successfull";
            alert(this.successMessage);
          })
      } else {
        this.errorMessage = "Registration failed"
        alert(this.errorMessage);
      }
    },

    //Login user
    loginUser(email, password) {
      if (email && password) {
        return axios.post('http://localhost:3000/login', {
          email: email,
          password: password
        })
          .then(response => {
            console.log('Login success:', response.data);
            localStorage.setItem('sessionToken', response.data.accessToken)
          })
          .catch(error => {
            console.error('Error during login:', error);
            this.errorMessage = "Login failed";
            alert(this.errorMessage);
          });
      } else {
        this.errorMessage = "Invalid email or password";
        alert(this.errorMessage);
      }
    },

    //Logout user
    logoutUser() {
      localStorage.removeItem('sessionToken');
    },

    // Function to create a new column
    createColumn(newColTitle) {
      // Ensure that a title for the new column is provided
      if (newColTitle) {
        // Create a new column object
        const newCol = {
          title: newColTitle
        };

        // Make a POST request to JSON Server
        return axios.post('http://localhost:3000/columns', newCol)
          .then(response => {
            //console.log('New column created:', response.data);
            // Update the list of columns
            this.columnList.push(response.data);
          })
          .catch(error => {
            //console.error('Error creating column:', error);
          });
      }
    },

    // Delete a column function
    deleteColumn(columnId) {
      // Effettua una richiesta DELETE a JSON Server
      return axios.delete(`http://localhost:3000/columns/${columnId}`)
        .then(response => {
          //console.log('Colomn deleted successfull:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },

    // Function to create a new task
    createTask(newTaskBody, columnId) {
      // Check if 'newTaskBody' and 'columnId' are provided
      if (newTaskBody && columnId) {
        // Create a new task object
        const newTask = {
          columnId: columnId, // Assign the provided 'columnId'
          body: newTaskBody, // Use 'newTaskBody' instead of 'columnId' for the task body
          priority: "", // Assign empty value
          trash: false, // Assign false default
        };

        // Make a POST request to JSON Server
        return axios.post('http://localhost:3000/tasks', newTask)
          .then(response => {
            //console.log('New task created:', response.data);
            // You can update the task list or perform other operations here
          })
          .catch(error => {
            console.error('Error creating task:', error);
          });
      }
    },

    // Change the values of a task function
    async changeValueTask(idTask, newTaskBodyValue, newValuePriority) {
      try {
        // Make a GET request to fetch the task list
        const response = await axios.get('http://localhost:3000/tasks');
        this.taskList = response.data; // Popola la taskList con i dati ottenuti dalla risposta

        // Find the task with the corresponding ID
        const taskToUpdate = this.taskList.find(task => task.id == idTask);
        //console.log("Task List:", this.taskList);

        if (taskToUpdate) {
          // Update the task's values
          taskToUpdate.body = newTaskBodyValue;
          taskToUpdate.priority = newValuePriority;

          // Make a PUT request to update the task in JSON Server
          const putResponse = await axios.put(`http://localhost:3000/tasks/${idTask}`, taskToUpdate);

          //console.log(`Task with ID ${idTask} updated successfully:`, putResponse.data);
        } else {
          console.error(`Task with ID ${idTask} not found`);
        }
      } catch (error) {
        console.error(`Error updating task with ID ${idTask}:`, error);
      }
    },

    // Function to update the 'columnId' of a task in JSON Server based on the 'onDrop' event
    updateTaskColumnId(taskId, newColumnId) {
      // Retrieve the list of tasks from JSON Server
      axios.get('http://localhost:3000/tasks')
        .then(response => {
          const taskList = response.data;

          // Find the task with the matching 'taskId'
          const taskToUpdate = taskList.find(task => task.id === taskId);

          if (taskToUpdate) {
            // Update the 'columnId' of the task
            taskToUpdate.columnId = newColumnId;

            // Make a PUT request to update the task in JSON Server
            axios.put(`http://localhost:3000/tasks/${taskId}`, taskToUpdate)
              .then(response => {
                //console.log('Task updated successfully:', response.data);
              })
              .catch(error => {
                console.error('Error updating task:', error);
              });
          }
        })
        .catch(error => {
          console.error('Error retrieving task list:', error);
        });
    },

    //Move the Task to the Trash
    moveToTrash(taskId, taskBody) {
      return axios.put(`http://localhost:3000/tasks/${taskId}`, {
        id: taskId,
        columnId: "",
        priority: "none",
        body: taskBody,
        trash: true
      })
        .then(response => {
          alert(`Task with ID ${taskId} moved to trash successfully`);
        })
        .catch(error => {
          alert(`Error moving task with ID ${taskId} to trash:`, error);
        });
    },

    // Define a function called deleteTask that takes a taskId as a parameter
    deleteTask(taskId) {
      return axios.delete(`http://localhost:3000/tasks/${taskId}`)
        .then(response => {
          // If the request is successful, log a message confirming the deletion
          console.log(`Task with ID ${taskId} successfully deleted`);
          // update the local state after deletion
          this.taskList = this.taskList.filter(task => task.id !== taskId);
          // console.log(response)
        })
        .catch(error => {
          // If an error occurs during the deletion, log an error message
          console.error(`Error deleting task with ID ${taskId}:`, error);
        });
    }

  }
});
