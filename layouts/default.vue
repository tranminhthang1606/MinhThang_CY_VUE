<template>
    <nav class="bg-white shadow-md">
        <div class="container mx-auto px-6 py-3 flex justify-between items-center">
            <NuxtLink class="font-bold text-xl text-blue-600" :to="{
                name: 'Home'
            }">
                YourLogo
            </NuxtLink>
            <div v-show="tokenCookie" class="user-menu hidden md:flex items-center space-x-6 relative">
                <h2
                    class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg p-2 rounded-lg">
                    Hello: {{ name }}
                </h2>
                <NuxtLink class="block px-4 py-2 text-gray-700 hover:bg-blue-100" :to="{ name: 'Products' }">
                    Sản Phẩm
                </NuxtLink>
                <div class="dropdown relative">
                    <button class="text-gray-700 hover:text-blue-600">Menu</button>
                    <div
                        class="dropdown-menu absolute right-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10 hidden group-hover:block">
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

                <NuxtLink class="text-gray-700 hover:text-blue-600" :to="{
                    name: 'Login'
                }">
                    Login
                </NuxtLink>
                <NuxtLink class="text-gray-700 hover:text-blue-600" :to="{
                    name: 'Signup'
                }">
                    Register
                </NuxtLink>
            </div>
            <button class="md:hidden text-gray-700 focus:outline-none">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
    </nav>
    <slot></slot>
    <footer class="bg-blue-600 text-white fixed bottom-0 py-6 w-full">
        <div class="container mx-auto px-6 text-center">
            <p class="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </footer>
</template>

<script setup>
const tokenCookie = useCookie('token');
const userCookie = useCookie('user');
const name = ref(userCookie.value ? userCookie.value.name : '');
watch(() => userCookie.value, () => {
    name.value = userCookie.value.name
})

function handleLogout() {
    tokenCookie.value = null;
    userCookie.value = null;
    window.location.reload();
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
</style>