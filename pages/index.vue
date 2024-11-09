<template>
    <div @scroll="handleScroll" class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">

        <div class="mb-6 flex justify-between gap-2">
            <input v-model="searchQuery" type="text" placeholder="Search posts..."
                class="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <input @click="searchSbumit" class="cursor-pointer border-2 rounded-md p-2" type="button" value="Search">
        </div>

        <div class="space-y-4">
            <div v-for="item in products.articles"
                class="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
                <h2 class="text-lg font-semibold text-gray-800">{{ item.title }}</h2>
                <p class="text-sm text-gray-600">{{ item.description }}
                </p>
            </div>

        </div>

    </div>
    <NuxtLink :to="{
        name: 'Product__Index'
    }">
        Go To Product Page
    </NuxtLink>
</template>

<script setup>

definePageMeta({
    layout: "nonav-layout"
})
const searchQuery = ref('apple');
const page = ref(1)
const pageSize = ref(5)
const loading = ref(false)
const { data: products } = useAsyncData(async () => {
    const res = await $fetch('/api/v1/post');
    return res;
})
const searchSbumit = async () => {
    loading.value = true
    const { data } = await useFetch('/api/v1/post', {
        params: {
            q: searchQuery.value,
            page: page.value,
            pageSize: pageSize.value
        }
    })
    products.value.articles = data.value.articles;
    loading.value = false
}

const handleScroll = async () => {
    console.log(window.scrollY);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading.value) {
        page.value++
        const { data } = await useFetch('/api/v1/post', {
            params: {
                q: searchQuery.value,
                page: page.value,
                pageSize: pageSize.value
            }
        })
        data.value.articles.forEach(element => {
            products.value.articles.push(element)
        });

        loading.value = false
    }
}

// Gọi API lần đầu tiên khi component mount
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

// Xóa sự kiện scroll khi component unmount
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

</script>

<style lang="scss" scoped></style>