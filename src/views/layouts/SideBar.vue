<script setup>
import TaskSection from '../components/sidebar/TaskSection.vue';
import TagSection from '../components/sidebar/TagSection.vue';

const emit = defineEmits(['changeTab'])
function changeTab(tab) {
    
    emit('changeTab', tab);
}
</script>

<template>
    <div class="w-64 bg-white rounded-lg shadow-lg p-4 fixed top-3 left-3">
        <div class="flex items-center justify-between mb-4">
            <h1 class="text-lg font-semibold text-gray-800">Menu</h1>
        </div>
        <br>
        <TaskSection @changeTab="changeTab" />
        <TagSection />
    </div>
</template>


<style scoped></style>