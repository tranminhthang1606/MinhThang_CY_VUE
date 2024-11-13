<template>
    <div class="container mx-auto px-6 py-12">
        <div class="text-center mb-8">
            <h1 class="text-4xl font-extrabold text-gray-800 mb-2">{{ product.name }}</h1>
            <div class="flex justify-center items-center space-x-3">
                <span class="text-lg text-gray-600">Category:</span>
                <span class="text-lg text-blue-600 font-semibold">{{ product.category.name }}</span>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="relative">
                <img :src="product.preview_img_path" :alt="product.name"
                    class="w-full h-80 object-cover rounded-lg shadow-lg">
                <span class="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 text-sm rounded-full">Stock: {{
                    product.stock > 0 ? 'In Stock' : 'Out of Stock' }}</span>
            </div>

            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-2xl font-semibold text-gray-800">{{ formatCurrency(product.price) }}</span>
                        <span class="text-sm text-gray-500 block mt-1">Price</span>
                    </div>
                    <div>
                        <button @click="product.stock > 0 ? addToCart(product, config, token, cartItem) : ''"
                            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                            :disabled="product.stock === 0">
                            {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
                        </button>
                    </div>
                </div>
                <div>
                    <h3 class="text-xl font-semibold text-gray-800">Description</h3>
                    <p class="text-gray-700">{{ product.description }}</p>
                </div>
                <div class="flex space-x-6 text-gray-600">
                    <div>
                        <span class="font-semibold">Created: </span>
                        <span>{{ formatDate(product.created_at) }}</span>
                    </div>
                    <div>
                        <span class="font-semibold">Updated: </span>
                        <span>{{ formatDate(product.updated_at) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-12">
        <h3 class="text-2xl font-semibold text-center text-gray-800 mb-4">More from {{ product.category.name }}</h3>
        <img :src="product.category.preview_img_path" :alt="product.category.name"
            class="w-full h-96 object-cover rounded-lg shadow-lg">
    </div>
</template>

<script setup>
const config = useRuntimeConfig()
const token = useCookie('token');
const { id } = useRoute().params;
let cartItem;
console.log(id);

onMounted(() => {
    cartItem = reactive(sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : []);
})

let { data: product } = await useAsyncData('fetchDetailProducts', async () => {
    const response = await fetchDetailProduct(config, token.value, id)
    return response
})

console.log(product.value);


</script>

<style lang="scss" scoped></style>