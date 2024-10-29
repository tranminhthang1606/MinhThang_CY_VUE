<script setup>
import { reactive, ref, watch } from 'vue';


let num1 = ref();
let num2 = ref();

let operations = reactive({
    total: 0,
    minus: 0,
    multiply: 0,
    divide: 0
})
watch(() => [num1, num2], () => {
    if (!isNaN(num1.value) && !isNaN(num2.value)) {
        operations.total = Number(num1.value) + Number(num2.value);
        operations.minus = num1.value - num2.value;
        operations.multiply = num1.value * num2.value;
        operations.divide = num1.value / num2.value;
    }
}, {
    deep: true
})
</script>
<template>
    <div>
        <div>
            <label for="num1">Số thứ nhất: </label>
            <input type="text" v-model="num1">
        </div>
        <div>
            <label for="num2">Số thứ hai: </label>
            <input type="text" v-model="num2">
        </div>
        <p>
            Tổng là : {{ operations.total }},
            Hiệu là : {{ operations.minus }},
            Tích là : {{ operations.multiply }},
            Thương là : {{ operations.divide }},
        </p>

    </div>
</template>
<style></style>