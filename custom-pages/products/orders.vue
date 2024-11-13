<template>
    <div class="container mx-auto py-12 px-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Đơn Hàng Của Bạn</h1>


        <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="grid grid-cols-5 gap-4 font-semibold text-gray-600 border-b pb-4">
                <p>Mã Đơn Hàng</p>
                <p>Ngày Đặt</p>
                <p>Trạng Thái</p>
                <p>Tổng Tiền</p>
                <p>Hành Động</p>
            </div>


            <div v-for="item in orders" class="grid grid-cols-5 gap-4 items-center py-4 border-b">
                <p class="text-gray-800">#{{ item.id }}</p>
                <p class="text-gray-600">{{ formatDate(item.created_at) }}</p>
                <span
                    :class="store.orderStatus[item.status] + ' px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full'">{{
                        item.status }}</span>
                <p class="text-gray-800 font-semibold">{{ formatCurrency(item.total) }}</p>
                <button @click="togglePopup(true, item)"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Xem chi tiết</button>
            </div>
        </div>
    </div>

    <div id="popup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50 "
        @click="togglePopup(false)">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative overflow-auto max-h-[90vh]" @click.stop>
            <button @click="togglePopup(false)"
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-semibold">
                &times;
            </button>
            <h2 class="text-2xl font-semibold text-center text-gray-800 mb-4">Chi Tiết Đơn Hàng</h2>

            <div class="space-y-4">
                <div class="flex justify-between">
                    <span class="text-gray-600 font-semibold">ID Đơn Hàng:</span>
                    <span class="text-gray-800">{{ popupItem.id }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600 font-semibold">Địa Chỉ:</span>
                    <span class="text-gray-800">{{ popupItem.address }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600 font-semibold">Số Điện Thoại:</span>
                    <span class="text-gray-800">{{ popupItem.phone }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600 font-semibold">Ngày Tạo:</span>
                    <span class="text-gray-800">{{ formatDate(popupItem.created_at) }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600 font-semibold">Trạng Thái:</span>
                    <span :class="'text-' + store.orderStatus[popupItem.status] + ' font-semibold'">{{ popupItem.status
                        }}</span>
                </div>
            </div>

            <h3 class="text-lg font-semibold text-gray-800 mt-6 mb-2">Sản Phẩm:</h3>
            <ul class="space-y-4">
                <li v-for="item in popupItem.order_items"
                    class="flex items-center justify-between py-4 px-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex flex-col sm:flex-row sm:space-x-4 w-full">
                        <div class="flex-1">
                            <span class="text-sm text-gray-600">Sản phẩm ID: </span>
                            <span class="font-semibold text-gray-800">{{ item.id }}</span>
                        </div>
                        <div class="flex-1">
                            <span class="text-sm text-gray-600">Tên sản phẩm: </span>
                            <span class="font-semibold text-gray-800 line-clamp-2">{{ item.name }}</span>
                        </div>
                        <div class="flex-1 mt-2 sm:mt-0">
                            <span class="text-sm text-gray-600">SL: </span>
                            <span class="font-semibold text-gray-800">{{ item.quantity }}</span>
                        </div>
                        <div class="flex-1 mt-2 sm:mt-0">
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-600">Giá / sp: </span>
                                <span class="font-semibold text-gray-800">{{ formatCurrency(item.price) }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-600">Tổng: </span>
                                <span class="font-semibold text-lg text-blue-600">{{ formatCurrency(item.total)
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <div class="mt-6 space-y-2 border-t pt-4">
                <div class="flex justify-between text-gray-800">
                    <span>Tạm Tính: </span>
                    <span>{{ formatCurrency(popupItem.sub_total) }}</span>
                </div>
                <div class="flex justify-between text-gray-800">
                    <span>Thuế: </span>
                    <span>{{ formatCurrency(popupItem.tax) }}</span>
                </div>
                <div class="flex justify-between text-lg font-semibold text-gray-800">
                    <span>Tổng Cộng: </span>
                    <span>{{ formatCurrency(popupItem.total) }}</span>
                </div>
            </div>

            <div class="mt-6 flex justify-end">
                <button @click="togglePopup(false)" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    Đóng
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/store';

const store = useUserStore();
const orders = ref([])
const config = useRuntimeConfig()
const token = useCookie('token');
const popupItem = ref({});
onMounted(async () => {
    let data = await fetchOrder(config, token.value)
    orders.value = data
    console.log(orders.value);

})

const togglePopup = (show, item) => {
    const popup = document.getElementById('popup');
    popup.style.display = show ? 'flex' : 'none';
    if (item) {
        popupItem.value = item;
    }
}

</script>

<style scoped>
#popup {
    transition: opacity 0.3s ease;
}
</style>