<script setup>
import AddTask from '../components/mainside/AddTask.vue';
import TaskItem from '../components/mainside/TaskItem.vue';
import { useTodoStore } from '@/stores/counter';
import ButtonMatertial from '../components/materials/ButtonMatertial.vue';
import Calendar from '../components/mainside/Calendar.vue';
import html2pdf from 'html2pdf.js';
import DateMaterial from '../components/materials/DateMaterial.vue';
import TagComp from '../components/TagComp.vue';
import { computed, ref } from 'vue';
const props = defineProps({
    currentTab: {
        type: String,
        required: false
    }
})
console.log(props.currentTab);

let todoHandler = useTodoStore();
let list = todoHandler.todoList;

const printList = computed(() => {
    return list.filter(item => item.isChecked);
})
function deleteAll() {
    todoHandler.deleteAllTodo(props.currentTab)

}

function deleteSelected() {
    todoHandler.deleteSelectedTodo()
}
const printContent = ref(null);

const handlePDF = () => {
    printContent.value.classList.remove('hidden');

    const options = {
        margin: 1,
        filename: 'bao_cao.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };

    html2pdf()
        .set(options)
        .from(printContent.value)
        .save()
        .then(() => {
            printContent.value.classList.add('hidden');
        });
}

</script>

<template>
    <div v-if="props.currentTab == 'all' || props.currentTab == 'today' || props.currentTab == 'upcoming' || props.currentTab == 'doneJob'" class="max-w-2xl w-full mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col gap-2">
        <div>
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-bold text-gray-800">{{ props.currentTab.toUpperCase() }}</h1>
                <span class="text-lg bg-gray-100 text-gray-700 px-3 py-1 rounded-lg">Đang có tất cả {{ list.length }}
                    jobs</span>
            </div>
            <AddTask />
            <div class="flex mb-2 gap-2 justify-end">
                <ButtonMatertial :text="'Delete Selected'" :color="'blue'" :callMethod="deleteSelected" />
                <ButtonMatertial :text="'Delete All'" :color="'red'" :callMethod="deleteAll" />
                <ButtonMatertial :text="'Export Data'" :color="'green'" :callMethod="handlePDF" />
            </div>
            <TaskItem :currentTab="props.currentTab" />
        </div>
        <div ref="printContent" class="content-to-print hidden">
            <table class="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr class="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left">
                            ID
                        </th>
                        <th class="py-3 px-6 text-left">Name</th>
                        <th class="py-3 px-6 text-center">Tag</th>
                        <th class="py-3 px-6 text-center">Date</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <tr v-for="item in printList" :key="item.id" class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-center">
                            {{ item.id }}
                        </td>
                        <td class="py-3 px-6 text-left">{{ item.title }}</td>
                        <td class="py-3 px-6 text-center">
                            <TagComp :text="item.tags.text" :color="item.tags.color" />
                        </td>
                        <td class="py-3 px-6 text-center">
                            <DateMaterial :item="item" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="max-w-5xl w-full mx-auto bg-white rounded-lg shadow-lg p-6" v-if="props.currentTab == 'calendar'">
        <Calendar />
    </div>
</template>

<style scoped></style>