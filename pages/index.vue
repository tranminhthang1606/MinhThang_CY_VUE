<template>
   
    <section class="bg-blue-600 text-white py-20">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight">Welcome to Our Website</h1>
            <p class="mt-6 mb-10 text-lg md:text-xl font-medium">Your one-stop solution for all things digital.</p>
            <NuxtLink
                class="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 hover:bg-gray-100"
                :to="{ name: 'Products' }"
            >
                Xem Sản Phẩm
            </NuxtLink>
        </div>
    </section>

    
    <section class="container mx-auto px-6 py-20">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
        <div class="flex flex-wrap justify-center gap-8">
            <div class="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-8 text-center transform hover:-translate-y-2 transition duration-300">
                <h3 class="text-2xl font-semibold text-gray-700 mb-4">Service One</h3>
                <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div class="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-8 text-center transform hover:-translate-y-2 transition duration-300">
                <h3 class="text-2xl font-semibold text-gray-700 mb-4">Service Two</h3>
                <p class="text-gray-600">Pellentesque efficitur lacus quis nulla rutrum.</p>
            </div>
            <div class="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-8 text-center transform hover:-translate-y-2 transition duration-300">
                <h3 class="text-2xl font-semibold text-gray-700 mb-4">Service Three</h3>
                <p class="text-gray-600">Vivamus ut sem at libero cursus aliquet.</p>
            </div>
        </div>
    </section>

    
    <section class="bg-gray-50 py-20">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-12">What Our Clients Say</h2>
            <div class="flex flex-wrap justify-center gap-8">
                <div class="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-8 transform hover:-translate-y-2 transition duration-300">
                    <p class="text-gray-600 italic">"The best experience I've ever had with a company. Amazing service!"</p>
                    <h4 class="mt-6 text-blue-600 font-semibold">- Client Name</h4>
                </div>
                <div class="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-8 transform hover:-translate-y-2 transition duration-300">
                    <p class="text-gray-600 italic">"Their team is super responsive and skilled. Highly recommend."</p>
                    <h4 class="mt-6 text-blue-600 font-semibold">- Client Name</h4>
                </div>
                <div class="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-8 transform hover:-translate-y-2 transition duration-300">
                    <p class="text-gray-600 italic">"Excellent quality and great customer service!"</p>
                    <h4 class="mt-6 text-blue-600 font-semibold">- Client Name</h4>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>

</script>

<style lang="scss" scoped></style>