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
// import B1Template from './views/Btap1/B1Template.vue';
</script>

<template>
  <div class="container">
    <nav>
      <li><router-link :to="{ name: 'buoi2_1' }">Bài 1</router-link></li>
      <li><router-link :to="{ name: 'buoi2_2' }">Bài 2</router-link></li>
      <li><router-link :to="{ name: 'buoi2_3' }">Bài 3</router-link></li>
    </nav>
    <router-view></router-view>

  </div>

</template>

<style scoped>
.container {
  margin: auto;
  max-width: 700px;
  text-align: center;
}

nav {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: 20px;
  justify-content: center;
  margin-bottom: 50px;
}

nav a {
  text-decoration: none;
  font-size: 20px;
}
</style>
