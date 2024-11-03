<!-- eslint-disable no-unused-vars -->
<script setup>
const binding = defineModel();
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
})

</script>

<template>
    <label v-if="title!=''" class="p-2" for="">{{ title }}</label>
    <input :type="props.type" class="w-full px-4 py-2 my-2 border border-gray-200 rounded-lg" v-model="binding" />
</template>

<style scoped></style>