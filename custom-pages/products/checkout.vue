<template>
    <div class="container mx-auto py-12 px-6 mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Thanh Toán</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Billing Details -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Thông Tin Giao Hàng</h2>

                <form @submit.prevent="handleOrder" class="space-y-4">
                    <div>
                        <label for="address" class="block text-gray-700">Địa Chỉ</label>
                        <input v-model="order.address" type="text" id="address"
                            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required>
                    </div>

                    <div>
                        <label for="phone" class="block text-gray-700">Số Điện Thoại</label>
                        <input v-model="order.phone" type="tel" id="phone"
                            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required>
                    </div>
                </form>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Tóm Tắt Đơn Hàng</h2>

                <div class="space-y-4">
                    <div v-for="item in cart" class="flex justify-between items-center border-b pb-2">
                        <p class="text-gray-700">{{ item.name }}</p>
                        <p class="text-gray-800 font-semibold">{{ item.price * item.sl }}</p>
                    </div>
                    <!-- Total -->
                    <div class="flex justify-between items-center font-bold text-xl">
                        <p>Tổng Cộng</p>
                        <p>{{ totalPrice }}</p>
                    </div>
                </div>

                <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">Phương Thức Thanh Toán</h2>
                <form @submit.prevent="handleOrder">
                    <div class="space-y-4">
                        <div class="flex items-center">
                            <input type="radio" id="cod" name="paymentMethod" class="mr-2" checked>
                            <label for="cod" class="text-gray-700">Thanh Toán Khi Nhận Hàng (COD)</label>
                        </div>
                        <div class="flex items-center">
                            <input type="radio" id="creditCard" name="paymentMethod" class="mr-2">
                            <label for="creditCard" class="text-gray-700">Thẻ Tín Dụng</label>
                        </div>
                        <div class="flex items-center">
                            <input type="radio" id="bankTransfer" name="paymentMethod" class="mr-2">
                            <label for="bankTransfer" class="text-gray-700">Chuyển Khoản Ngân Hàng</label>
                        </div>
                    </div>

                    <button type="submit"
                        class="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Đặt
                        Hàng</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
const config = useRuntimeConfig()
const cart = ref([]);
const token = useCookie('token');
const order = reactive({
    'address': '',
    'phone': "",
    'cart_item': []
})

const handleOrder = async () => {
    console.log(order);
    try {
        let res = await sendOrder(config, token.value, order)
        console.log(res);
        useNuxtApp().$toast('Tạo Order Thành Công');
        sessionStorage.removeItem('cart');
        navigateTo('/')
    } catch (error) {
        console.log(error);
        useNuxtApp().$toast('Tạo Order Không Thành Công');
    }
}

onMounted(() => {
    cart.value = JSON.parse(sessionStorage.getItem('cart'))
    cart.value.forEach((item) => {
        let orderItem = {
            'product_id': item.id,
            'name': item.name,
            'price': item.price,
            'quantity': item.sl,
        }
        order.cart_item.push(orderItem);
    })
})

const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.sl), 0)
})

</script>

<style lang="scss" scoped></style>