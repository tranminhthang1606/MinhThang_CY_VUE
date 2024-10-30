<script setup>
import { computed, ref, reactive, watch } from 'vue';
import product1 from '@/assets/images/product-1.jpg'
import product2 from '@/assets/images/product-2.webp'
import product3 from '@/assets/images/product-3.jpg'
import FormatYen from '@/stores/FormatYen'
import CartComp from './CartComp.vue';
let products = reactive(localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [
    {
        id: 1,
        name: "CLEAR MEN DEEP OCEAN",
        price: 200000,
        releaseDate: "2023-01-15",
        isBestSeller: true,
        brand: "Clear Men",
        description: "Dầu gội đặc biệt dành cho nam giúp làm sạch sâu và mát lạnh.",
        image: product1,
        colorVariants: [{ color: "Red", qty: 0, img: product2 }, { color: "Amber", qty: 7, img: product3 }],
    },
    {
        id: 2,
        name: "CLEAR MEN COOL SPORT",
        price: 180000,
        releaseDate: "2022-11-10",
        isBestSeller: false,
        brand: "Clear Men",
        description: "Dầu gội mát lạnh giúp giữ da đầu khô thoáng cả ngày.",
        image: product2,
        colorVariants: [{ color: "Yellow", qty: 5, img: product3 }, { color: "Emerald", qty: 3, img: product1 }],
    },
    {
        id: 3,
        name: "CLEAR MEN WARM FOREST",
        price: 190000,
        releaseDate: "2023-05-05",
        isBestSeller: true,
        brand: "Clear Men",
        description: "Hương thơm từ rừng già giúp thư giãn và làm dịu da đầu.",
        image: product3,
        colorVariants: [{ color: "Cyan", qty: 0, img: product1 }, { color: "Indigo", qty: 12, img: product2 }],
    }
])
let cart = reactive(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
let selectedItem = ref({});
let chosen = ref(false)
function chooseProduct(item, variant) {
    if (chosen.value == false) {
        selectedItem.value = { ...item, 'colorVariants': variant };
        chosen.value = true
    } else {
        selectedItem.value = {};
        chosen.value = false;
    }
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `ngày ${day} tháng ${month} năm ${year}`;
}
const checkValidProduct = computed(() => {
    if (selectedItem.value != {}) {
        return selectedItem.value.colorVariants.qty > 0
    } else {
        return true;
    }
})

let currentImg = ref({});
const changeImgProduct = (e) => {
    let hoverItem = {
        id: e.target.dataset.item,
        img: e.target.dataset.img
    }
    currentImg.value = hoverItem;
}
const isCartOpen = ref(false);
const toggleCartFromB31 = () => {
    isCartOpen.value = !isCartOpen.value;
};
function addToCart() {
    chosen.value = !chosen.value;
    if (selectedItem.value != {}) {
        let existItem = cart.find((item) => item.id == selectedItem.value.id);
        if (existItem) {
            existItem.sl += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            cart.push({ ...selectedItem.value, sl: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        products.find((item) => {
            if (item.id == selectedItem.value.id) {
                item.colorVariants.forEach(e => {
                    if (e.color == selectedItem.value.colorVariants.color) {
                        e.qty -= 1;
                    }
                });
            }
        });
        localStorage.setItem('products', JSON.stringify(products));
        toggleCartFromB31();
        selectedItem.value = {}
        console.log(cart);
    } else {
        console.log('hehe');
    }

}
watch(() => [isCartOpen, selectedItem], () => {
    products = reactive(localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [
        {
            id: 1,
            name: "CLEAR MEN DEEP OCEAN",
            price: 200000,
            releaseDate: "2023-01-15",
            isBestSeller: true,
            brand: "Clear Men",
            description: "Dầu gội đặc biệt dành cho nam giúp làm sạch sâu và mát lạnh.",
            image: product1,
            colorVariants: [{ color: "Red", qty: 0, img: product2 }, { color: "Amber", qty: 7, img: product3 }],
        },
        {
            id: 2,
            name: "CLEAR MEN COOL SPORT",
            price: 180000,
            releaseDate: "2022-11-10",
            isBestSeller: false,
            brand: "Clear Men",
            description: "Dầu gội mát lạnh giúp giữ da đầu khô thoáng cả ngày.",
            image: product2,
            colorVariants: [{ color: "Yellow", qty: 5, img: product3 }, { color: "Emerald", qty: 3, img: product1 }],
        },
        {
            id: 3,
            name: "CLEAR MEN WARM FOREST",
            price: 190000,
            releaseDate: "2023-05-05",
            isBestSeller: true,
            brand: "Clear Men",
            description: "Hương thơm từ rừng già giúp thư giãn và làm dịu da đầu.",
            image: product3,
            colorVariants: [{ color: "Cyan", qty: 0, img: product1 }, { color: "Indigo", qty: 12, img: product2 }],
        }
    ])
}, {
    deep: true,
})

</script>
<template>
    <div class="m-auto h-auto flex justify-center">
        <div v-for="item in products" :key="item.id" class="overflow-hidden">
            <div
                :class="((selectedItem.id == item.id && selectedItem.colorVariants) ? 'bg-' + selectedItem.colorVariants.color.toLowerCase() + '-500' : '') + ' relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 shadow-md'">
                <a class="relative mx-3 mt-3 flex h-60 rounded-xl" href="#">
                    <img class="object-cover" :src="item.id == currentImg.id ? currentImg.img : item.image"
                        alt="product image" />
                </a>
                <div class="mt-4 px-5 pb-5">
                    <a href="#">
                        <h5 class="text-lg tracking-tight text-slate-900">{{ item.name }}</h5>
                    </a>
                    <div class="mt-2 mb-5 flex items-center justify-between">
                        <p>
                            <span class="text-2xl font-bold text-slate-900">{{ FormatYen(item.price) }}</span>
                        </p>
                        <div class="flex items-center">
                            <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                                {{ item.isBestSeller ? 'Bán chạy' : 'Bán không chạy' }}</span>
                        </div>
                    </div>
                    <i>Brand: {{ item.brand }}</i>
                    <div class="flex gap-3 my-2">
                        Color:
                        <div @mouseover="(e) => changeImgProduct(e)" @click="chooseProduct(item, sku)"
                            v-for="sku, index in item.colorVariants" :key="index"
                            :class="'bg-' + sku.color.toLowerCase() + '-500 w-[50px] h-5 rounded-md cursor-pointer border-2'"
                            :data-img="sku.img" :data-item="item.id">
                        </div>
                    </div>
                    <div v-show="selectedItem.id == item.id" class="flex gap-3 my-2">
                        Số lượng: <i v-if="selectedItem.colorVariants">{{ selectedItem.colorVariants.qty != 0 ?
                            selectedItem.colorVariants.qty : 'Hết hàng' }}</i>
                    </div>
                    <div class="flex gap-3 my-2">
                        Ra mắt: {{ formatDate(item.releaseDate) }}
                    </div>
                    <p>
                        {{ item.description }}
                    </p>
                    <button @click="() => addToCart()" href="#"
                        :disabled="selectedItem.id == item.id ? !checkValidProduct : false"
                        :class="((selectedItem.id == item.id && checkValidProduct) ? '' : 'btn-disabled') + ' flex mt-2 items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart</button>
                </div>
            </div>
        </div>

    </div>
    <CartComp :cart="cart" :open="isCartOpen" @update:open="toggleCartFromB31" />
</template>
<style scoped>
.btn-disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: visibleStroke;
}
</style>