<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, watch } from 'vue';
import AddTaskForm from '../mainside/AddTaskForm.vue';
import ButtonMatertial from '../materials/ButtonMatertial.vue';
import { useTodoStore } from '@/stores/counter';

const todoStore = useTodoStore();
const showNewTaskForm = ref(todoStore.openForm);
function showNewTaskFormFunc() {
    todoStore.openForm = !todoStore.openForm;
    todoStore.isEditing = false
}
console.log(showNewTaskForm);
watch(() => todoStore.openForm, () => {
    showNewTaskForm.value = todoStore.openForm;
});
</script>

<template>
    <!-- Search -->
    <div class="w-full">
        <ButtonMatertial :text="'Add New Task'" :color="'gray'" :callMethod="showNewTaskFormFunc" />
    </div>

    <div>
        <AddTaskForm :showNewTaskForm="showNewTaskForm" @update:showtask="showNewTaskFormFunc" />
    </div>
</template>

<style scoped></style>