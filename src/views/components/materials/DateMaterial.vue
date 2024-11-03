<script setup>

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">📅 {{ item.endDate }}</span>
</template>

<style lang="scss" scoped></style>