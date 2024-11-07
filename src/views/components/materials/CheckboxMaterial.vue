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
        item.isChecked = !item.isChecked;        
        todoList.updateTodo(item);
    }
}

</script>

<template>
    <div class="flex items-center space-x-3">
        <label class="form-checkbox h-5 w-5">
            <input type="checkbox" :checked="item ? item.isChecked : checkAll" @change="handleCheck(props.item)">
            <span>
                <span class="checked">
                    <span class="text-green-500 cursor-pointer">✔️</span>
                </span>
            </span>
        </label>
    </div>
</template>

<style scoped>
.form-checkbox input {
    display: none;
}

.form-checkbox input+span {
   
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    border: 1px solid green;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
}

.checked {
    display: none;
}

.form-checkbox input:checked + span > .checked {
    display: inline-block;
}
</style>