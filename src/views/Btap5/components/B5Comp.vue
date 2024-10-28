<script setup>
import { ref, computed } from 'vue';

let isChecked = ref(false);

const conditionalStyle = computed(() => ({
    color: isChecked.value ? 'green' : 'red',
    fontWeight: isChecked.value ? 'bold' : 'normal',
}));


</script>
<template>
    <div>
        <div>
            <label for="checkbox">Kiểm tra văn bản </label>
            <input type="checkbox" id="checkbox" v-model="isChecked">
        </div>
        <p :style="conditionalStyle">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint distinctio quasi voluptates ea itaque
            mollitia! Ex omnis impedit itaque exercitationem, nulla libero ea sequi commodi quam cum nisi vero! Vero?
        </p>
    </div>
</template>
<style></style>