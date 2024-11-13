<template>
    <div class="container mx-auto py-12 px-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Giỏ Hàng Của Bạn</h1>

        <h2 v-if="cart.length == 0" class="text-3xl font-bold text-red-800 mb-8 text-center">Giỏ hàng trống</h2>
        <div v-if="cart.length > 0" class="bg-white rounded-lg shadow-md p-6">
            <div class="grid grid-cols-6 gap-4 font-semibold text-gray-600 border-b pb-4">
                <p>Sản phẩm</p>
                <p>Số lượng</p>
                <p>Tồn kho</p>
                <p>Đơn giá</p>
                <p>Tổng cộng</p>
                <p>Hành động</p>
            </div>
            <div v-for="item in cart" class="grid grid-cols-6 gap-4 items-center py-4 border-b">
                <div class="flex items-center flex-col">
                    <img :src="item.preview_img_path" alt="Product Image" class="w-20 h-20 rounded-md">
                    <p class="ml-4 truncate w-full text-gray-800">{{ item.name }}</p>
                </div>

                <div class="flex items-center space-x-2">
                    <button @click="decreaseQuantity(item)"
                        class="px-2 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">-</button>
                    <span>{{ item.sl }}</span>
                    <button @click="increaseQuantity(item)"
                        class="px-2 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">+</button>
                </div>

                <div class="text-gray-800">Còn: {{ item.stock }}sp</div>

                <p class="text-gray-800">{{ formatCurrency(item.price) }}</p>

                <p class="text-gray-800 font-semibold">{{ formatCurrency(item.price * item.sl) }}</p>

                <button @click="removeItem(item.id)"
                    class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Xóa</button>
            </div>

            <div class="mt-8 text-right">
                <p class="text-lg font-bold text-gray-800 mb-8">Tổng cộng: {{ formatCurrency(totalPrice) }}</p>

                <NuxtLink class="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700" :to="{
                    name: 'Checkout'
                }">
                    Tiến hành thanh toán
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const config = useRuntimeConfig()
const tokenCookie = useCookie('token')
const cart = ref([]);
onMounted(() => {
    cart.value = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : []
})
const totalPrice = computed(() => {
    return cart.value.length > 0 ? cart.value.reduce((total, item) => total + (item.price * item.sl), 0) : 0
})

const checkStocksFunc = async (itemId) => {
    console.log(itemId);

    let res = await checkStocks(config, tokenCookie.value, itemId)
    if (res.message == 'In stock') {
        sessionStorage.setItem('cart', JSON.stringify(cart.value));
    } else {
        useNuxtApp().$toast('Sản phẩm đã hết hàng !!');
        removeItem(itemId)
    }
}
const increaseQuantity = async (cartItem) => {
    let itemData = await fetchDetailProduct(config, tokenCookie.value, cartItem.id);
    let productItem = itemData;
    console.log(cart);
    
    if (productItem.stock - 1 >= cartItem.sl) {
        cartItem.sl++;
        cartItem = { ...productItem, sl: cartItem.sl }
        let index = cart.value.findIndex(item => item.id === cartItem.id);
        cart.value[index] = cartItem;
        sessionStorage.setItem('cart', JSON.stringify(cart.value));
    } else {
        useNuxtApp().$toast('Đã tối đa số lượng tồn kho !!');
    }
    console.log(cart);
    
    checkStocksFunc(cartItem.id)
}

const decreaseQuantity = async (cartItem) => {
    let itemData = await fetchDetailProduct(config, tokenCookie.value, cartItem.id);
    let productItem = itemData;
    if (cartItem.sl > 1) {
        cartItem.sl--;
        cartItem = { ...productItem, sl: cartItem.sl }
        let index = cart.value.findIndex(item => item.id === cartItem.id);
        cart.value[index] = cartItem;
        sessionStorage.setItem('cart', JSON.stringify(cart.value));
    }
    checkStocksFunc(cartItem.id)
}

const removeItem = (itemId) => {
    cart.value = cart.value.filter(item => item.id !== itemId);
    useNuxtApp().$toast('Đã xoá sản phẩm khỏi giỏ hàng');
    sessionStorage.setItem('cart', JSON.stringify(cart.value));
}



console.log(cart);

</script>

<style lang="scss" scoped></style>