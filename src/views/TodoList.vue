<script setup>
import SideBar from './layouts/SideBar.vue';
import MainSide from './layouts/MainSide.vue';
import { ref } from 'vue';

const currentTab = ref('all');

function changeTab(tab) {
    currentTab.value = tab;
}



</script>

<template>
    <div class="bg-gray-100 main min-h-screen flex items-center justify-center p-3">
        <SideBar @changeTab="changeTab" />
        <MainSide :currentTab="currentTab" />
    </div>
</template>

<style scoped>
@keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.main {
    background: linear-gradient(270deg, #ff6f91, #ff9671, #ffc75f, #f9f871);
    background-size: 400% 400%;
    animation: gradientAnimation 8s ease infinite;
}

</style>