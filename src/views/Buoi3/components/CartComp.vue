<template>
    <TransitionRoot as="template" :show="props.open">
        <Dialog class="relative z-10" @click="toggleCart">
            <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template"
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div class="flex items-start justify-between">
                                            <DialogTitle class="text-lg font-medium text-gray-900">Shopping cart
                                            </DialogTitle>
                                            <div class="ml-3 flex h-7 items-center">
                                                <button type="button"
                                                    class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    @click="toggleCart">
                                                    <span class="absolute -inset-0.5" />
                                                    <span class="sr-only">Close panel</span>
                                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>

                                        <div class="mt-8">
                                            <div class="flow-root">
                                                <ul role="list" class="-my-6 divide-y divide-gray-200">
                                                    <li v-for="product in props.cart" :key="product.id" class="flex py-6">
                                                        <div
                                                            class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img :src="product.colorVariants.img"
                                                                class="h-full w-full object-cover object-center" />
                                                        </div>

                                                        <div class="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div
                                                                    class="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a>{{ product.name }}</a>
                                                                    </h3>
                                                                    <p class="ml-4">{{
                                                                        formatYen(product.price * product.sl) }}</p>
                                                                </div>
                                                                <p class="mt-1 text-sm text-gray-500">{{
                                                                    product.colorVariants.color }}</p>
                                                            </div>
                                                            <div class="flex flex-1 items-end justify-between text-sm">
                                                                <p class="text-gray-500">Qty {{ product.sl }}</p>

                                                                <div class="flex">
                                                                    <button @click="removeCartItem(product)"
                                                                        type="button"
                                                                        class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div class="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>{{ formatYen(totalPrice) }}</p>
                                        </div>
                                        
                                       
                                        <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or{{ ' ' }}
                                                <button type="button"
                                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                                    @click="toggleCart">
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import formatYen from '@/stores/FormatYen';

const props = defineProps({
    open: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: Array,
        default: () => []
    }
});
const emit = defineEmits(['update:open']);
function removeCartItem(product) {
    let newCart = props.cart
    newCart.find((item, index) => {
        if (item.id == product.id) {
            newCart.splice(index, 1);
        }
    });
    localStorage.setItem('cart', newCart);
    let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    products.find((item) => {
        if (item.id == product.id) {
            item.colorVariants.forEach(e => {
                if (e.color == product.colorVariants.color) {
                    e.qty += product.sl;
                }
            });
        }
    });
    localStorage.setItem('products', JSON.stringify(products));
}
const totalPrice = computed(() => {
    return props.cart.reduce((sum, item) => sum + item.price * item.sl, 0);
})
const toggleCart = () => {
    emit('update:open', !props.open);
};

</script>