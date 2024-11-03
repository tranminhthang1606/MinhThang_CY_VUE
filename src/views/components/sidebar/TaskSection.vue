<script setup>
import { ref } from 'vue';
import ButtonMatertial from '../materials/ButtonMatertial.vue';

const emit = defineEmits(['changeTab'])
const activeTab = ref('all');
function getTab(tab) {
    activeTab.value = tab;
    emit('changeTab', tab);
}

</script>

<template>
    <div class="mb-4">
        <h2 class="text-xs font-semibold text-gray-500 uppercase mb-2">Tasks</h2>
        <ul class="flex flex-col gap-2">
            <ButtonMatertial :text="'All'" :color="activeTab == 'all' ? 'red' : 'gray'" :callMethod="() => getTab('all')" />
            <!-- <ButtonMatertial :text="'👉 Upcoming'" :color="activeTab == 'upcoming' ? 'red' : 'gray'" :callMethod="() => getTab('upcoming')" />
            <ButtonMatertial :text="'✔️ Today'" :color="activeTab == 'today' ? 'red' : 'gray'" :callMethod="() => getTab('today')" />
            <ButtonMatertial :text="'✔️ Done Job'" :color="activeTab == 'doneJob' ? 'red' : 'gray'" :callMethod="() => getTab('doneJob')" /> -->
            <ButtonMatertial :text="'📅 Calendar'" :color="activeTab == 'calendar' ? 'red' : 'gray'" :callMethod="() => getTab('calendar')" />
        </ul>
    </div>
</template>

<style scoped></style>