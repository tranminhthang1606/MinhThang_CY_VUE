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
    <div class="bg-gray-100 min-h-screen flex items-center justify-center p-3">
        <SideBar @changeTab="changeTab" />
        <MainSide :currentTab="currentTab" />
    </div>
</template>

<style scoped></style>