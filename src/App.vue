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
import B1Template from './views/Btap1/B1Template.vue';
</script>

<template>
  <B1Template />
</template>

<style scoped></style>
