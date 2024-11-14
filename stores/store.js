import { defineStore } from 'pinia'
import { ref } from 'vue'
import 'vue3-toastify/dist/index.css';
export const useUserStore = defineStore('userStore', () => {
    const isLoggedIn = ref(useCookie('token') ? true : false);
    const orderStatus = {
        'Pending': 'green-500',
        'Rejected': 'red-500',
        'Approved': 'blue-500',
        'Shipped': 'yellow-500',
        'Delivered': 'purple-500',
        'Canceled': 'gray-500'
    };
    const login = () => {
        isLoggedIn.value = true
    }

    const logout = () => {
        isLoggedIn.value = false
    }

    
    return {
        isLoggedIn,
        login,
        logout,
        orderStatus
    }
})