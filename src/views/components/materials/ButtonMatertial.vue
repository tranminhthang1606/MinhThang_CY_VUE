<!-- eslint-disable no-unused-vars -->
<script setup>

const props = defineProps({
    text: {
        type: String,
        default: 'Click Me'
    },
    callMethod: {
        type: Function,
    },
    color: {
        type: String,
        default: 'blue'
    }
})
</script>

<template>
    <button @click="callMethod"
        :class="'flex items-center w-full px-4 py-2 bg-' + color + '-50 text-' + color + '-600 rounded-lg border border-' + color + '-200 hover:bg-' + color + '-100'">
        {{ props.text }}
    </button>
</template>

<style scoped></style>
