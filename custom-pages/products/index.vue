<template>
    <div @scroll="handleScroll" class="container mx-auto py-12 px-6 mb-16">
        <h1
            class="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 mb-12 tracking-tight">
            Danh Sách Sản Phẩm</h1>

        <div class="bg-white shadow-xl rounded-xl p-8 mb-12 border border-gray-200">
            <div class="mb-6">
                <label for="keyword" class="block text-lg font-semibold text-gray-800 mb-2">Tìm kiếm từ khóa:</label>
                <input v-model="querySearch.name" id="keyword" type="text" placeholder="Nhập từ khóa..."
                    class="mt-2 block w-full px-6 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-200 ease-in-out" />
            </div>
            <div class="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <label for="priceMin" class="block text-lg font-semibold text-gray-800 mb-2">Giá tối thiểu:</label>
                    <input v-model="querySearch.min_price" id="priceMin" type="number" placeholder="Min"
                        class="mt-2 block w-full px-6 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-200 ease-in-out" />
                </div>
                <div>
                    <label for="priceMax" class="block text-lg font-semibold text-gray-800 mb-2">Giá tối đa:</label>
                    <input v-model="querySearch.max_price" id="priceMax" type="number" placeholder="Max"
                        class="mt-2 block w-full px-6 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-200 ease-in-out" />
                </div>
            </div>
            <div>
                <label for="category" class="block text-lg font-semibold text-gray-800 mb-2">Chọn danh mục:</label>
                <div class="flex items-center gap-3">
                    <select id="category" v-model="querySearch.category_slug"
                        class="block w-full px-6 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-200 ease-in-out">
                        <option disabled selected value="">Chọn một danh mục</option>
                        <option v-for="item in categories" :value="item.slug">{{ item.name }}</option>
                    </select>
                    <button @click="clearFilter"
                        class=" bg-purple-600 px-6 py-3 text-white rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ease-in-out">Clear</button>
                </div>
            </div>
        </div>


        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div v-for="item in products" :key="item.id"
                class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                <NuxtLink :to="{ name: 'ProductDetail', params: { id: item.id } }">
                    <img :src="item.preview_img_path" alt="Product Image" class="w-full h-64 object-cover rounded-t-xl">
                </NuxtLink>
                <div class="p-6">
                    <NuxtLink :to="{ name: 'ProductDetail', params: { id: item.id } }">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ item.name }}</h2>
                    </NuxtLink>

                    <p class="text-gray-600 text-sm mb-4">{{ item.description }}</p>
                    <div class="flex justify-between text-gray-700 mb-4">
                        <span class="font-bold text-lg text-purple-600">{{ formatCurrency(item.price) }}</span>
                        <span class="font-bold text-lg text-purple-600">{{ item.stock }} sản phẩm</span>
                    </div>
                    <button @click="addToCart(item, config, token, cartItem)" :disabled="item.stock == 0"
                        :class="(item.stock == 0 ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500') + ' w-full text-white py-3 rounded-xl focus:outline-none focus:ring-2 transition duration-200 ease-in-out'">{{
                            item.stock
                                == 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng' }}</button>
                </div>
            </div>
        </div>


        <div v-if="isLoading" class="flex items-center justify-center mt-12 -translate-y-40">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-solid"></div>
        </div>
    </div>
</template>


<script setup>
import debounce from 'lodash.debounce';
const config = useRuntimeConfig()
const currentPage = ref(1);
const token = useCookie('token');
const isLoading = ref(false);
let cartItem;
const querySearch = reactive({
    name: '',
    category_id: 0,
    min_price: 0,
    max_price: 0,
    category_slug: ''
})

const { data: serverCategories } = await useAsyncData('fetchCategories', async () => {
    let res = await fetchCategories(config, token.value)
    return res
})

const categories = ref(serverCategories.value.data)

let { data: serverData } = await useAsyncData('fetchProducts', async () => {
    let res = await fetchProduct(config, token.value, {})
    return res
})

const maxPage = ref(serverData.value.last_page)
const products = ref(serverData.value.data);

const handleScroll = async () => {
    if (currentPage.value == maxPage.value) {
        return;
    }
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        isLoading.value = true
        currentPage.value++
        let res = await fetchProduct(config, token.value, { ...querySearch, page: currentPage.value })
        products.value = products.value.concat(res.data)
        isLoading.value = false
    }
    console.log('scroll');

}

const clearFilter = () => {
    querySearch.name = '';
    querySearch.category_id = 0;
    querySearch.min_price = 0;
    querySearch.max_price = 0;
    querySearch.category_slug = '';
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    cartItem = reactive(sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : []);
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

const debouncedUpdateProducts = debounce(async () => {
    const newData = await fetchProduct(config, token.value, querySearch);
    products.value = newData.data;
}, 500);

watch(() => querySearch, () => {
    console.log('Dữ liệu sản phẩm đã thay đổi');
    currentPage.value = 1;
    debouncedUpdateProducts();
}, { deep: true });

</script>

<style scoped>
h1 {
    background: linear-gradient(to right, #6ee7b7, #3b82f6);
    -webkit-background-clip: text;
    color: transparent;
}


.currency {
    font-size: 1.25rem;
    font-weight: 600;
    color: #6b7280;
}


.hover\:scale-105:hover {
    transform: scale(1.05);
}

.transition-all {
    transition: all 0.3s ease-in-out;
}
</style>