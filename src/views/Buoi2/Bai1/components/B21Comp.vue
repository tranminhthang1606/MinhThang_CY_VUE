<script setup>
import { computed, reactive, ref } from 'vue';

const cart = reactive([]);

const products = reactive([
    {
        id: 1,
        name: "PS5",
        price: 5555,
        publicDate: "05-05-2021",
        image:
            "https://cdn.vjshop.vn/hightech/may-choi-game/ps5/sony-ps-5-1.jpg",
        hot: true,
    }, {
        id: 2,
        name: "PS4",
        price: 4444,
        publicDate: "04-04-2021",
        image:
            "https://gmedia.playstation.com/is/image/SIEPDC/ps4-slim-image-block-01-en-24jul20?$native--t$",
        hot: true,
    }, {
        id: 3,
        name: "PS3",
        price: 3333,
        publicDate: "03-03-2021",
        image:
            "https://game.haloshop.vn/image/catalog/blogs/ps3-co-con-dang-mua/ps3-co-con-dang-mua-21.jpg",
        hot: false,
    },
])
const paymentMethods = reactive([
    { text: "COD", value: 1 },
    { text: "Banking", value: 2 },
    { text: "Ứng dụng bên thứ 3", value: 3 },
])
const selectedPayment = ref(2)

const hotProducts = computed(() => {
    return products.filter(p => p.hot);
})

const highLowFlag = ref(false);
const lowestProduct = computed(() => {
    return products.reduce((prev, current) => {
        return (prev.price < current.price) ? prev : current;
    });
})
const highestProduct = computed(() => {
    return products.reduce((prev, current) => {
        return (prev.price > current.price) ? prev : current;
    })
})
const addToCart = (product) => {
    cart.push(product);
}
const removeFromCart = (product) => {
    const index = cart.indexOf(product);
    if (index > -1) {
        cart.splice(index, 1);
    }
}

const changeMethod = (item) => {
    selectedPayment.value = item.value;
    alert('Bạn đã chuyển PTTT sang ' + item.text);

}
</script>
<template>
    <table class="product-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Public Date</th>
                <th>Image</th>
                <th>Hot</th>
                <th>Hot</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in products" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>${{ item.price }}</td>
                <td>{{ item.publicDate }}</td>
                <td><img :src=item.image :alt='item.name'></td>
                <td class="hot">{{ item.hot ? 'Yes' : 'No' }}</td>
                <td><button @click="addToCart(item)">Add card</button></td>
            </tr>
            <tr>
                <td colspan="7">
                    <h3>Sản phẩm hot</h3>
                </td>
            </tr>
            <tr v-for="item in hotProducts" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>${{ item.price }}</td>
                <td>{{ item.publicDate }}</td>
                <td><img :src=item.image :alt='item.name'></td>
                <td class="hot">{{ item.hot ? 'Yes' : 'No' }}</td>
                <td><button @click="addToCart(item)">Add card</button></td>
            </tr>
            <tr>
                <td colspan="7">
                    <button @click="highLowFlag = !highLowFlag">
                        {{ highLowFlag ? 'Hiện sản phẩm đắt nhất' : 'Hiện sản phẩm rẻ nhất' }}
                    </button>
                </td>
            </tr>
            <tr v-if="highLowFlag">
                <td>{{ lowestProduct.id }}</td>
                <td>{{ lowestProduct.name }}</td>
                <td>${{ lowestProduct.price }}</td>
                <td>{{ lowestProduct.publicDate }}</td>
                <td colspan="3"><img :src=lowestProduct.image :alt='lowestProduct.name'></td>
            </tr>
            <tr v-else>
                <td>{{ highestProduct.id }}</td>
                <td>{{ highestProduct.name }}</td>
                <td>${{ highestProduct.price }}</td>
                <td>{{ highestProduct.publicDate }}</td>
                <td colspan="3"><img :src=highestProduct.image :alt='highestProduct.name'></td>
            </tr>
            <tr>
                <td colspan="7">
                    <h3>Giỏ hàng</h3>
                </td>
            </tr>
            <tr v-for="item in cart" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>${{ item.price }}</td>
                <td>{{ item.publicDate }}</td>
                <td colspan="2"><img :src=item.image :alt='item.name'></td>
                <td><button @click="removeFromCart(item)">X</button></td>
            </tr>

            <tr>
                <td colspan="7">
                    <h3>Phương thức thanh toán</h3>
                </td>
            </tr>
            <tr v-for="(item, index) in paymentMethods" :key="index">
                <td colspan="6">{{ item.text }}</td>
                <td><input type="radio" :value="item.value" v-model="selectedPayment" @change="changeMethod(item)"></td>
            </tr>

        </tbody>
    </table>
</template>
<style>
.product-table {
    width: 80%;
    border-collapse: collapse;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.product-table th,
.product-table td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
}

.product-table th {
    background-color: #4CAF50;
    color: white;
}

.product-table td img {
    width: 50px;
    height: auto;
}

.product-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.product-table tr:hover {
    background-color: #f1f1f1;
}

.product-table .hot {
    color: red;
    font-weight: bold;
}
</style>