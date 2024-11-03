<!-- eslint-disable no-unused-vars -->
<script setup>
import { useTodoStore } from '@/stores/counter';
import { ref, watch } from 'vue';
import InputMaterial from '../materials/InputMaterial.vue';
import ButtonMatertial from '../materials/ButtonMatertial.vue';
import SelectMaterial from '../materials/SelectMaterial.vue';
import { toast } from 'vue3-toastify';

const props = defineProps({
    showNewTaskForm: {
        type: Boolean,
        default: true,
    },
})
const emit = defineEmits(['update:showtask']);
const todoHandler = useTodoStore();
const tags = todoHandler.tags;
let isEditing = ref(todoHandler.isEditing);
const newTaskDueDate = ref(todoHandler.isEditing ? todoHandler.editData.endDate : '');
const newTaskTitle = ref(todoHandler.isEditing ? todoHandler.editData.title : '');
const newTaskTag = ref(todoHandler.isEditing ? todoHandler.editData.tags : '');

function addNewTask() {
    if (!newTaskTag.value || !newTaskTitle.value || !newTaskDueDate.value) {
        toast('Vui Lòng Nhập Đủ Thông Tin Của Todo', {
            position: "top-center",
            transition: "flip",
            autoClose: 3000
        });
        return;
    }

    let todo = {
        id: Date.now(),
        title: newTaskTitle.value,
        tags: newTaskTag.value,
        endDate: newTaskDueDate.value,
        isChecked: false,
        isCompleted: false,
    }
    todoHandler.addTodo(todo);
    console.log(todoHandler.todoList);

    newTaskTitle.value = '';
    newTaskDueDate.value = '';
    newTaskTag.value = null;
    emit('update:showtask', false);
}

function updateTask() {
    let todo = {
        id: todoHandler.editData.id,
        title: newTaskTitle.value,
        tags: newTaskTag.value,
        endDate: newTaskDueDate.value,
        isChecked: false
    }
    todoHandler.updateTodo(todo);
    newTaskTitle.value = '';
    newTaskDueDate.value = '';
    newTaskTag.value = null;
    emit('update:showtask', false);
}

function closeNewTask() {
    emit('update:showtask', false);
}

watch(() => todoHandler.isEditing, () => {
    isEditing.value = todoHandler.isEditing;
    if (isEditing.value) {
        newTaskTitle.value = todoHandler.editData.title;
        newTaskDueDate.value = todoHandler.editData.endDate;
        newTaskTag.value = todoHandler.editData.text;
    } else {
        newTaskTitle.value = '';
        newTaskDueDate.value = '';
        newTaskTag.value = null;
    }
    newTaskDueDate.value = newTaskDueDate.value || ''; // Fix bug when editing a task and the due date is empty.  // Fix bug when editing a task and the due date is empty.  // Fix bug when editing a task and the due date is empty.  // Fix bug when editing a task and the due date is empty.  // Fix bug when editing a task and the due date is empty.  // Fix bug when editing a task and the due date is empty.
})
</script>

<template>
    <div v-if="showNewTaskForm" class="p-4 mb-4 border border-gray-200 rounded-lg">
        <InputMaterial :title="'Todo Title'" :type="'text'" v-model="newTaskTitle" />
        <InputMaterial :title="'Ngày Hết Hạn'" :type="'date'" v-model="newTaskDueDate" />
        <SelectMaterial :title="'Tags'" :lists="tags" v-model="newTaskTag" />
        <div class="flex gap-2">
            <ButtonMatertial :text="!isEditing ? 'Add Task' : 'Update Task'" :color="'blue'"
                :callMethod="!isEditing ? addNewTask : updateTask" />
            <ButtonMatertial :text="'Close'" :color="'red'" :callMethod="closeNewTask" />
        </div>
    </div>
</template>


<style scoped></style>