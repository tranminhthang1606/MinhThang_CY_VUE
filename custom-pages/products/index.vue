<script setup>
const { data: products } = useAsyncData(async () => {
  const res = await $fetch('/api/v1/post');
  console.log(res);
  return res
})
</script>

<template>
  This is product page {{ products }}
</template>

<style scoped></style>