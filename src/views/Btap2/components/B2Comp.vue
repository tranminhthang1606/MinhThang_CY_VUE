<script setup>
import { computed, ref } from 'vue';
let squareEdgeVal = ref(0);
const calculateArea = computed(() => {
    if (isNaN(squareEdgeVal.value)) {
        return 'Vui lòng nhập số';
    }
    return squareEdgeVal.value ** 2 + ' cm';
})
</script>
<template>
    <div>
        <label for="square">Chiều dài cạnh hình vuông</label>
        <input type="text" v-model="squareEdgeVal">
        <p>Diện tích hình vuông: {{ calculateArea }} </p>
    </div>
</template>
<style lang="">

</style>