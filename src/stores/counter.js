import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { toast } from 'vue3-toastify';
export const useTodoStore = defineStore('todoList', () => {
  let todoList = reactive(localStorage.getItem('todolist') ? JSON.parse(localStorage.getItem('todolist')) : []);
  let openForm = ref(false);
  let editData = reactive({});
  let isEditing = ref(false);
  const tags = reactive([
    { id: 1, text: 'Tag 1', color: 'green' },
    { id: 2, text: 'Tag 2', color: 'yellow' }
  ]);

  function openFormEdit(item) {
    if (openForm.value == true && !isEditing.value) {
      isEditing.value = true;
      editData = item;
    } else {
      openForm.value = !openForm.value;
      editData = item;
      isEditing.value = !isEditing.value;
    }

  }

  function addTodo(todo) {
    todoList.push(todo);
    localStorage.setItem('todolist', JSON.stringify(todoList));
    toast('Thêm Task thành công', {
      position: "top-center",
      transition: "flip",
      autoClose: 3000
    });
  }

  function removeTodo(index) {
    todoList.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(todoList));
    toast('Xoá Task thành công', {
      position: "top-right",
      transition: "slide",
      autoClose: 3000
    });
  }

  function updateTodo(item) {
    todoList.forEach((todo) => {
      if (item.id === todo.id) {
        Object.assign(todo, item)
      }
    })
    localStorage.setItem('todolist', JSON.stringify(todoList));
    toast('Cập nhập Task thành công', {
      position: "top-right",
      transition: "slide",
      autoClose: 3000
    });
  }

  function deleteAllTodo(tab) {
    if (tab == 'all') {
      todoList.splice(0, todoList.length)
    }
    if (tab == 'doneJob') {
      todoList.forEach((todo) => {
        if (todo.isCompleted) {
          todoList.splice(todoList.indexOf(todo), 1)
        }
      })
      console.log(todoList);

    }
    if (tab == 'today') {
      todoList.forEach((todo) => {
        if (new Date(todo.endDate).toDateString() == new Date().toDateString()) {
          todoList.splice(todoList.indexOf(todo), 1)
        }
      })

    }
    if (tab == 'upcoming') {
      todoList.forEach((todo) => {
        if (new Date(todo.endDate).toDateString() < new Date().toDateString()) {
          todoList.splice(todoList.indexOf(todo), 1)
        }
      })
    }
    localStorage.setItem('todolist', JSON.stringify(todoList));
    toast(`Xoá tất cả Task ${tab} thành công`, {
      position: "top-right",
      transition: "slide",
      autoClose: 3000
    });
  }

  function deleteSelectedTodo() {
    todoList.forEach((todo) => {
      if (todo.isChecked) {
        todoList.splice(todoList.indexOf(todo), 1)
      }
    })
    localStorage.setItem('todolist', JSON.stringify(todoList));
    toast('Xoá Task đã chọn thành công', {
      position: "top-right",
      transition: "slide",
      autoClose: 3000
    });
  }

  return {
    todoList,
    tags,
    openForm,
    editData,
    isEditing,
    openFormEdit,
    addTodo,
    removeTodo,
    updateTodo,
    deleteAllTodo,
    deleteSelectedTodo
  }
})

