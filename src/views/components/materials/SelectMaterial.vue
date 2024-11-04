<!-- eslint-disable no-unused-vars -->
<script setup>
const binding = defineModel()
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    lists: {
        type: Array,
        required: true
    },
})




</script>

<template>
    <label for="" class="p-2">{{ title }}</label>
    <select class="w-full px-4 py-2 my-2 border border-gray-200 rounded-lg" v-model="binding">
        <option value="" disabled>-- Chọn Tag --</option>
        <option v-for="item in props.lists" :key="item.id" :value="item">{{ item.text }}</option>
    </select>
</template>

<style scoped></style>