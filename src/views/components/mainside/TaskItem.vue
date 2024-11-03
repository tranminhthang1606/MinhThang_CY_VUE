<script setup>
import TableMaterial from '../materials/TableMaterial.vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    currentTab: {
        type: String,
        required: false
    },
})
</script>

<template>
    <TableMaterial :currentTab="currentTab" />
</template>

<style lang="scss" scoped></style>