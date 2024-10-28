<script setup>
// import { ref, onMounted, reactive, computed, watch } from 'vue'
// const message = ref('Vua dep trai');
// const obj = reactive({
//   name: 'Thang',
//   age: 18
// })
// onMounted(() => {
//   // setTimeout(() => {
//   //   message.value = ' Hello World!';
//   // }, 3000);
// })

// function changeObj() {
//   obj.name = 'Tuan';
//   obj.age = 20;
// }

// const yearObj = computed(() => {
//   return obj.age + ' years old'
// })
// watch(() => obj.age, (newVal, oldVal) => {
//   message.value = "Is Watching: " + oldVal + '-' + newVal+''
// })
import index from './views/Btap1/index.vue';
</script>

<template>
  <index />
</template>

<style scoped></style>
