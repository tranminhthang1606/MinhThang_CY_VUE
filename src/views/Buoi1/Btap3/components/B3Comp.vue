<script setup>
import { ref } from 'vue';


let styleFont = ref(16)

</script>
<template>
    <div>
        <label for="fontSize">Giá trị Font Size</label>
        <input type="text" v-model="styleFont">
        <p :style="{ fontSize: styleFont + 'px' }">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe aspernatur
            enim
            vero nemo hic. Dolorem
            quibusdam porro eaque explicabo amet, odio iste! Quibusdam cupiditate ab cumque vero rem assumenda sint!</p>
    </div>
</template>
<style></style>