<template>
    <div v-for="date in dateRange" :key="date"
        class="p-3.5 flex flex-col sm:flex-row items-center justify-between border-r-[1px]">
        <span class="text-sm font-medium w-[200px] text-gray-900 ">{{ date }}</span>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { format, addDays, subDays } from "date-fns";
import { useTodoStore } from '@/stores/counter';
const props = defineProps({
    markDate: {
        type: Date,
        required: true
    }
})
const todoList = useTodoStore().todoList
const dateRange = ref([]);
console.log(todoList);
const today = props.markDate;
function calculateDateRange() {
    const startDate = subDays(today, 21);
    const endDate = subDays(today, 15);
    const range = [];

    for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
        range.push(format(d, 'EEEE'));
    }

    dateRange.value = range;
}

onMounted(() => {
    calculateDateRange();
});
</script>

<style lang="scss" scoped></style>