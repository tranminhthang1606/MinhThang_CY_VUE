<script setup>
import { useTodoStore } from '@/stores/counter';
let todoList = useTodoStore();
const props = defineProps({
    item: {
        type: null,
        required: false
    },
    checkAll: {
        type: Boolean,
        required: false
    }
})
const emit = defineEmits(['toggleCheckAll']);
function handleCheck(item) {
    if (!item) {
        console.log(item);
        emit('toggleCheckAll', !props.checkAll);
    } else {     
        item.isChecked =!item.isChecked;
        todoList.updateTodo(item);    
    }
}

</script>

<template>
    <div class="flex items-center space-x-3">
        <input type="checkbox" :checked="item ? item.isChecked : false" @change="handleCheck(props.item)"
            class="form-checkbox h-5 w-5 text-pink-500">
    </div>
</template>

<style scoped></style>