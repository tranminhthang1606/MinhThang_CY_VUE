<script setup>
import { useTodoStore } from '@/stores/counter';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import CheckboxMaterial from '../materials/CheckboxMaterial.vue';
import DateMaterial from './DateMaterial.vue';
import TagComp from '../TagComp.vue';
import { ref, watch, reactive,computed } from 'vue';
import { toast } from 'vue3-toastify';
const props = defineProps({
    currentTab: {
        type: String,
        default: 'all'
    }
})

let todoList = useTodoStore();
let list = reactive(todoList.todoList);
const checkAll = ref(false)
function toggleCheckAll(status) {
    list.forEach(item => {
        item.isChecked = status
    });
    checkAll.value = status;
}

function openEditForm(item) {
    todoList.openFormEdit(item);
    todoList.editData = item
    console.log(todoList.editData, todoList.openForm);

}

function changeComplete(item) {
    item.isCompleted = true;
    todoList.updateTodo(item);
    toast('Đã cập nhập trạng thái của task', {
        position: "top-center",
        transition: "flip",
        autoClose: 3000
    });
}

const currentPage = ref(1);
const itemsPerPage = ref(5); 
const totalPages = computed(() => Math.ceil(list.length / itemsPerPage.value));


const paginatedTodos = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return list.slice(start, end);
});



// Chuyển sang trang trước
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

// Chuyển sang trang sau
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};


watch(() => [props.currentTab, todoList.openForm, todoList.todoList], () => {
    console.log('watch');
    console.log(todoList.todoList);

    switch (props.currentTab) {
        case 'all':
            list = todoList.todoList;
            break;
        case 'today':
            list = todoList.todoList.filter(item => item.endDate === new Date().toISOString().split('T')[0]);
            break;
        case 'upcoming':
            list = todoList.todoList.filter(item => item.endDate > new Date().toISOString());
            break;
        case 'doneJob':
            list = todoList.todoList.filter(item => item.isCompleted);
            break;
        default:
            break;
    }
}, {
    deep: true, immediate: true
})
</script>

<template>
    <table class="min-w-full bg-white border border-gray-200">
        <thead>
            <tr class="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                <th class="py-3 px-6 text-left">
                    <CheckboxMaterial :checkAll="checkAll" @toggleCheckAll="toggleCheckAll" />
                </th>
                <th class="py-3 px-6 text-left">Name</th>
                <th class="py-3 px-6 text-center">Tag</th>
                <th class="py-3 px-6 text-center">Date</th>
                <th class="py-3 px-6 text-center">Actions</th>
            </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
            <tr v-for="item in paginatedTodos" :key="item.id" class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-6 text-center">
                    <CheckboxMaterial :item="item" />
                </td>
                <td class="py-3 px-6 text-left">{{ item.title }}</td>
                <td class="py-3 px-6 text-center">
                    <TagComp :text="item.tags.text" :color="item.tags.color" />
                </td>
                <td class="py-3 px-6 text-center">
                    <DateMaterial :item="item" />
                </td>
                <td v-if="!item.isCompleted" class="py-3 px-6 text-center">
                    <font-awesome-icon class="text-yellow-700 cursor-pointer" :icon="faEdit"
                        @click="openEditForm(item)" /> |
                    <font-awesome-icon @click="changeComplete(item)" class="text-green-600 cursor-pointer"
                        :icon="faCheck" />
                </td>
                <td v-if="item.isCompleted" class="py-3 px-6 text-center">
                    Completed !
                </td>
            </tr>
        </tbody>
    </table>

    <div class="flex justify-center items-center space-x-4 mt-4">
        <button @click="prevPage" :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-300 text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400">
            Trước
        </button>
        <span class="text-gray-700">Trang {{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-300 text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400">
            Sau
        </button>
    </div>
</template>

<style lang="scss" scoped></style>