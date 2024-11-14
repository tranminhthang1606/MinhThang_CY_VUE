<template>
    <nav class="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 shadow-lg">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <NuxtLink class="font-bold text-2xl text-white tracking-wide hover:text-yellow-300 transition duration-200"
                :to="{ name: 'Home' }">
                YourLogo
            </NuxtLink>

            <div v-show="tokenCookie" class="user-menu hidden md:flex items-center space-x-6 relative">
                <h2
                    class="text-lg font-bold text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg p-2 rounded-lg">
                    Hello: {{ name }}
                </h2>
                <NuxtLink class="text-white hover:text-yellow-300 transition duration-200" :to="{ name: 'Products' }">
                    Sản Phẩm
                </NuxtLink>
                <div class="dropdown relative">
                    <button class="text-white hover:text-yellow-300 transition duration-200">Menu</button>
                    <div
                        class="dropdown-menu absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 hidden group-hover:block">
                        <NuxtLink class="block px-4 py-2 text-gray-700 hover:bg-blue-100" :to="{ name: 'Profile' }">
                            Profile
                        </NuxtLink>
                        <NuxtLink class="block px-4 py-2 text-gray-700 hover:bg-blue-100" :to="{ name: 'Cart' }">
                            Cart
                        </NuxtLink>
                        <NuxtLink class="block px-4 py-2 text-gray-700 hover:bg-blue-100" :to="{ name: 'Orders' }">
                            Orders
                        </NuxtLink>
                        <button @click="handleLogout"
                            class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div v-show="!tokenCookie" class="hidden md:flex space-x-6">
                <NuxtLink class="text-white hover:text-yellow-300 transition duration-200" :to="{ name: 'Login' }">
                    Login
                </NuxtLink>
                <NuxtLink class="text-white hover:text-yellow-300 transition duration-200" :to="{ name: 'Signup' }">
                    Register
                </NuxtLink>
            </div>

            <button class="md:hidden text-white focus:outline-none">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
    </nav>
    <slot></slot>
    <footer class="bg-blue-900 text-white py-6 relative bottom-0 w-full">
        <div class="container mx-auto px-6 text-center">
            <p class="text-sm">
                &copy; 2024 <span class="font-bold">Your Company</span>. All rights reserved.
                <br>
                <a href="#" class="text-yellow-300 hover:text-yellow-400 transition duration-200">Privacy Policy</a> |
                <a href="#" class="text-yellow-300 hover:text-yellow-400 transition duration-200">Terms of Service</a>
            </p>
        </div>
    </footer>

    <NuxtLink v-if="tokenCookie" class="empty-cart-icon mb-6 fixed right-4 bottom-4" :to="{ name: 'Cart' }">
        🛒
    </NuxtLink>
</template>

<script setup>
const tokenCookie = useCookie('token');
const userCookie = useCookie('user');
const config = useRuntimeConfig();
const name = ref(userCookie.value ? userCookie.value.name : '');
watch(() => userCookie.value, () => {
    name.value = userCookie.value.name
})

const handleLogout = async () => {
    let res = await callLogout(config, tokenCookie.value);
    console.log(res);

    if (res.message == 'Successfully logged out') {
        tokenCookie.value = null;
        userCookie.value = null;
        sessionStorage.clear();
        window.location.reload();
    }
}
</script>

<style scoped>
.dropdown:hover .dropdown-menu {
    display: block;
}

.dropdown-menu {
    display: none;
}

.dropdown-menu a,
.dropdown-menu button {
    display: block;
    padding: 8px 16px;
    color: #4B5563;
    text-decoration: none;
    border-bottom: 1px solid #E5E7EB;
}

.dropdown-menu a:hover,
.dropdown-menu button:hover {
    background-color: #BFDBFE;
}

.empty-cart-icon {
    font-size: 3rem;
    color: #9ca3af;
    animation: bounce 1s infinite;
    cursor: pointer;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }
}
</style>