<template>
    <div v-for="date in dateRange" :key="date"
        class="p-3.5  border-b border-r border-gray-200   xl:aspect-auto  lg:h-28 flex justify-between flex-col max-lg:items-center min-h-[70px] transition-all duration-300 hover:bg-gray-100">
        <span
            :class="((date.date.getFullYear() == today.getFullYear() && date.date.getMonth() == today.getMonth() && date.date.getDate() == today.getDate() ) ? 'bg-red-600 text-white' : '') + ' text-xs font-semibold text-gray-900 flex items-center justify-center w-7 h-7 rounded-full'">{{
                format(date.date, 'dd/MM')
            }}</span>
        <span v-for="todo in date.todoInDay" :key="todo.id" class="hidden lg:block text-xs font-medium text-gray-500">- {{
            todo.title }}</span>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
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
const markDate = ref(props.markDate);
const today = ref(new Date());
watch(()=>props.markDate,()=>{
    markDate.value = props.markDate;
    console.log(markDate.value);
    calculateDateRange()
    
})
function calculateDateRange() {
    const startDate = subDays(markDate.value, 14);
    const endDate = addDays(markDate.value, 13);
    const range = [];

    for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
        let todoInDay = []
        todoList.forEach(item => {
            if (format(d, 'yyyy-MM-dd') == item.endDate) {
                todoInDay.push(item);
            }
        });
        range.push({ date: d, todoInDay: todoInDay });
    }

    dateRange.value = range;
}

onMounted(() => {
    calculateDateRange();
});

</script>

<style lang="scss" scoped></style>