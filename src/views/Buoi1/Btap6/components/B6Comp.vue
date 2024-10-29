<script setup>
import { computed, reactive } from 'vue';
import CurrencyFormatter from '@/stores/CurrencyFormatter';
let cart = reactive([
    { name: 'SP1', price: '1000', 'qty': 4 },
    { name: 'SP2', price: '10000', 'qty': 3 },
    { name: 'SP3', price: '20000', 'qty': 1 },
])

let calculateTotalItem = (item) => {
    return CurrencyFormatter(item.price * item.qty)
}

let totalCart = computed(()=>{
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0)
})

</script>
<template>
    <div id="shopping_cart">
        <h1>Shopping Cart</h1>
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in cart" :key="index">
                    <td>{{ item.name }}</td>
                    <td>
                        <input type="number" v-model.number="item.qty">
                    </td>
                    <td>{{ CurrencyFormatter(item.price) }}</td>
                    <td>{{ calculateTotalItem(item) }}</td>
                </tr>
                <tr class="total-row">
                    <td colspan="3">Grand Total</td>
                    <td colspan="2">{{ CurrencyFormatter(totalCart)}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style>
table {
    width: 100%;
    border-collapse: collapse;
}

table,
th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
    text-align: left;
}

.total-row {
    font-weight: bold;
}

button {
    padding: 5px 10px;
    color: white;
    background-color: red;
    border: none;
    cursor: pointer;
}
</style>