export default defineNuxtRouteMiddleware((to, from) => {
    const exceptionPage = [
        "/login",
        "/signup",
    ]
    if (process.client && !useCookie('token').value) {
        if (exceptionPage.includes(to.path)) return
        return window.location.href = "/login"
    }
})