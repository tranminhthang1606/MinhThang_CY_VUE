<template>
    <div class="h-screen mx-auto mt-12 max-w-md bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 text-white rounded-lg shadow-xl p-8">
        <h2 class="text-3xl font-semibold text-center mb-6">Đăng Nhập</h2>
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
           
            <div>
                <label for="email" class="block text-sm font-semibold mb-1">Email</label>
                <div class="relative">
                    <input type="email" id="email" v-model="email"
                        class="w-full mt-2 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 placeholder-gray-500"
                        placeholder="you@example.com" required>
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 8h3v7h6V8h3z"></path>
                    </svg>
                </div>
            </div>

            
            <div>
                <label for="name" class="block text-sm font-semibold mb-1">Tên</label>
                <div class="relative">
                    <input type="text" id="name" v-model="name"
                        class="w-full mt-2 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 placeholder-gray-500"
                        placeholder="Trần Minh Thắng" required>
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 8h3v7h6V8h3z"></path>
                    </svg>
                </div>
            </div>

            
            <div>
                <label for="password" class="block text-sm font-semibold mb-1">Mật Khẩu</label>
                <div class="relative">
                    <input type="password" id="password" v-model="password"
                        class="w-full mt-2 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 placeholder-gray-500"
                        placeholder="••••••••" required>
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1C8.69 1 5.8 2.58 4.24 5.14L2.69 3.59C1.09 5.93 0 8.68 0 12s1.09 6.07 2.69 8.41l1.55-1.55C5.8 21.42 8.69 23 12 23c3.31 0 6.2-1.58 7.76-4.14l1.55 1.55C22.91 18.07 24 15.32 24 12s-1.09-6.07-2.69-8.41L19.76 5.14C18.2 2.58 15.31 1 12 1z"></path>
                    </svg>
                </div>
            </div>

           
            <div>
                <button type="submit"
                    class="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105">Đăng Nhập</button>
            </div>

            <p class="text-center text-sm mt-4">
                Đã Có Tài Khoản? <NuxtLink class="font-semibold text-blue-200 hover:text-white" :to="{ name: 'Login' }">
                    Đăng Nhập
                </NuxtLink>
            </p>
        </form>
    </div>
</template>


<script setup>
import { useUserStore } from '~/stores/store';
const config = useRuntimeConfig()
const email = ref('');
const password = ref('');
const name = ref('');
const userStoreRef = useUserStore();
const tokenCookie = useCookie('token')
const userCookie = useCookie('user')
const handleLogin = async () => {
    let res = await callSignup(config, {
        email: email.value,
        password: password.value,
        name: name.value,
    })
    if (res.data.value.token && res.data.value.user) {
        tokenCookie.value = res.data.value.token
        userCookie.value = JSON.stringify({ name: res.data.value.user.name, email: res.data.value.user.email })
        userStoreRef.login();
        navigateTo('/')
        useNuxtApp().$toast('Đăng ký thành công');
    }

}


</script>

<style scoped>
    

    input:focus {
        border-color: #4f81e1;
    }

    svg {
        transition: all 0.3s ease;
    }

    svg:hover {
        transform: scale(1.1);
    }

    /* Gradient Animation */
    .bg-gradient-to-r {
        background-size: 400% 400%;
        animation: gradientAnimation 10s ease infinite;
    }

    @keyframes gradientAnimation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>