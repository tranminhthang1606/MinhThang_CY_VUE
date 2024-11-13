export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client && !sessionStorage.getItem('cart')) {
        if (to.path == '/checkout') {
            return window.location.href = "/"
        }
    }
})