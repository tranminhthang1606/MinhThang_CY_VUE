<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    text: {
        type: String,
        default: "New"
    },
    color: {
        type: String,
        default: "green"
    },
})
</script>

<template>
    <span :class="'bg-' + color + '-100 text-' + color + '-700 text-xs px-2 py-1 rounded-full'">{{ text }}</span>
</template>

<style scoped></style>