<template>
    <div>
        Slug/id {{ useRoute().params.slug + ' và ' + useRoute().params.id }}
    </div>
</template>

<script setup>

useSeoMeta({
    title: 'Slug và ID ' + useRoute().params.id,
    description: 'Slug và ID của trang',
})
</script>

<style lang="scss" scoped></style>