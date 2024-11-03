<script setup>
import TagComp from '../TagComp.vue';
import { useTodoStore } from '@/stores/counter';
import { computed } from 'vue';
const todoList = useTodoStore();

const tags = computed(() => {
    return todoList.tags;
});
</script>
<template>
    <div class="mb-4">
        <h2 class="text-xs font-semibold text-gray-500 uppercase mb-2">Tags</h2>
        <div class="flex flex-wrap gap-2">
            <div v-for="item in tags" :key="item.id">
                <TagComp :text="item.text" :color="item.color" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>