<script setup>
import { computed, reactive } from 'vue';
import CurrencyFormatter from '../stores/CurrencyFormatter';
const objRect = reactive({
    image: 'https://cdn.vjshop.vn/hightech/may-choi-game/ps5/sony-ps-5-1.jpg',
    imageAlt: 'ps5 alt',
    product: 'ps5',
    productLink: 'https://bachtungps.com.vn/may-sony-playstation-5-ps5-1',
    quantity: 10,
    price: 10000,
    discount: 0.2,
    inStock: true,
    classObject: {
        'bg-green': true,
        'bg-blue': false
    }
})

function changeColor(flag) {
    if (flag) {
        return 'bg-green'
    } else {
        return 'bg-blue'
    }
}

function changeInstock(inStock) {
    objRect.inStock = !inStock
}
const discountPrice = computed(() => {
    return objRect.price - (objRect.price * objRect.discount);
})

const changeDescription = computed(() => {
    if (objRect.inStock) {
        return `Sản phẩm đang có hàng. Bạn có thể mua ngay tại ${objRect.productLink}`
    } else {
        return `Sản phẩm đang hết hàng. Bạn vui lòng đặt hàng trước khi mua. Liên hệ: 0987654321`
    }
})



</script>
<template>
    <div>
        <h2>
            Tên Sản Phẩm:
            <span
                :class="objRect.inStock ? changeColor(objRect.classObject['bg-green']) : changeColor(objRect.classObject['bg-blue'])">
                {{ objRect.product }}
            </span>
        </h2>
        <h3>Current Price: <span :class="{ inStock: objRect.inStock }">{{ CurrencyFormatter(objRect.price) }}</span>
        </h3>
        <h3>Discounted Price: {{ CurrencyFormatter(discountPrice) }}</h3>
        <p>{{ changeDescription }}</p>
        <img :src="objRect.image" alt="">
        <br>
        <button @click="changeInstock(objRect.inStock)">Change Name Color</button>
    </div>
</template>
<style scoped>
.bg-green {
    color: green;
}

.bg-blue {
    color: blue;
}

img {
    max-width: 200px;
}

.inStock {
    color: green;
}
</style>