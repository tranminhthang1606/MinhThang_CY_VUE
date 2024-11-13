

export const routes = [
    {
        path: '/',
        name: 'Home',
        file: '~/pages/index.vue'
    },
    {
        path: '/login',
        name: 'Login',
        file: '~/custom-pages/auth/Login.vue'
    },
    {
        path: '/signup',
        name: 'Signup',
        file: '~/custom-pages/auth/register.vue'
    },
    {
        path: '/products',
        name: 'Products',
        file: '~/custom-pages/products/index.vue'
    },
    {
        path: '/cart',
        name: 'Cart',
        file: '~/custom-pages/products/cart.vue'
    },
    {
        path: '/checkout',
        name: 'Checkout',
        file: '~/custom-pages/products/checkout.vue'
    },
    {
        path: '/orders',
        name: 'Orders',
        file: '~/custom-pages/products/orders.vue'
    },
    {
        path: '/profile',
        name: 'Profile',
        file: '~/custom-pages/auth/profile.vue'
    }
    ,
    {
        path: '/products/:id',
        name: 'ProductDetail',
        file: '~/custom-pages/products/detail.vue'
    }

]