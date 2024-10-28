<script setup>
import { computed, reactive, watch, ref } from 'vue';
const form = reactive({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    rePassword: '',
});

let isFullfiled = ref(false)
let checkPassword = computed(() => {
    return form.password.length < 8;
})
function alertNofi() {
    alert('Form đã hoàn tất')
}
const isValidForm = (...form) => form.every(field => field.length >= 8);
watch(() => form, () => {
    if (isValidForm() && form.password == form.rePassword) {
        isFullfiled.value = true;
    } else {
        isFullfiled.value = false;
    }
}, { deep: true })
</script>
<template>
    <div class="form-container">
        <h2>Registration Form</h2>
        <form @submit.prevent>
            <div class="form-group">
                <label for="fullName">Full Name</label>
                <input type="text" id="fullName" v-model="form.fullName" required>
            </div>


            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="form.email" required>
            </div>


            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" v-model="form.phone" required>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="form.password" required>
            </div>


            <div class="form-group">
                <label for="rePassword">Re-enter Password</label>
                <input type="password" id="rePassword" v-model="form.rePassword" required>
            </div>

            <button type="submit" :disabled="checkPassword" :class="!checkPassword ? 'enabled' : 'disabled'"
                @click="isFullfiled ? alertNofi() : ''">Register</button>
        </form>
    </div>
</template>
<style>
.form-container {
    max-width: 400px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

button {
    padding: 10px 15px;
    color: white;
    background-color: blue;
    border: none;
    cursor: pointer;
}

.enabled {
    background: blue;
    cursor: pointer;
}

.disabled {
    background: gray;
    cursor: not-allowed;
}
</style>