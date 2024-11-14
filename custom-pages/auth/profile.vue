<template>
    <div class="container mx-auto py-12 px-6">
        <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <!-- Profile Header -->
            <div class="flex flex-col items-center">
                <img src="https://via.placeholder.com/150" alt="Profile Picture" class="w-32 h-32 rounded-full mb-4">
                <h1 class="text-2xl font-bold text-gray-800">{{ name }}</h1>
                <p class="text-gray-600 mb-6">Software Developer at XYZ Company</p>
            </div>

            <!-- Profile Details -->
            <div>
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Thông tin cá nhân</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-gray-700">Email:</p>
                        <p class="text-gray-800 font-medium">{{ email }}</p>
                    </div>
                    <div>
                        <p class="text-gray-700">Số điện thoại:</p>
                        <p class="text-gray-800 font-medium">0123-456-789</p>
                    </div>
                    <div>
                        <p class="text-gray-700">Địa chỉ:</p>
                        <p class="text-gray-800 font-medium">123 Đường ABC, Thành Phố XYZ</p>
                    </div>
                    <div>
                        <p class="text-gray-700">Ngày sinh:</p>
                        <p class="text-gray-800 font-medium">01/01/1990</p>
                    </div>
                </div>
            </div>

            <!-- About Me Section -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Giới thiệu</h2>
                <p class="text-gray-700">
                    Tôi là một nhà phát triển phần mềm với hơn 5 năm kinh nghiệm trong ngành. Đam mê tạo ra những ứng
                    dụng hữu ích, tôi luôn tìm kiếm những thách thức mới để phát triển kỹ năng và mang lại giá trị cho
                    người dùng.
                </p>
            </div>

            <!-- Skills Section -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Kỹ Năng</h2>
                <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-blue-200 text-blue-800 rounded-full">JavaScript</span>
                    <span class="px-3 py-1 bg-green-200 text-green-800 rounded-full">React</span>
                    <span class="px-3 py-1 bg-red-200 text-red-800 rounded-full">Node.js</span>
                    <span class="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full">Tailwind CSS</span>
                    <span class="px-3 py-1 bg-purple-200 text-purple-800 rounded-full">Python</span>
                </div>
            </div>

            <!-- Social Media Links -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Liên Kết Mạng Xã Hội</h2>
                <div class="flex space-x-4">
                    <a href="#" class="text-blue-600 hover:text-blue-700">Facebook</a>
                    <a href="#" class="text-blue-400 hover:text-blue-500">Twitter</a>
                    <a href="#" class="text-pink-600 hover:text-pink-700">Instagram</a>
                    <a href="#" class="text-gray-600 hover:text-gray-700">LinkedIn</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const userCookie = useCookie('user');
const name = ref(userCookie.value ? userCookie.value.name : '');
const email = ref(userCookie.value ? userCookie.value.email : '');
watch(() => userCookie.value, () => {
    name.value = userCookie.value.name
    email.value = userCookie.value.email
})
</script>

<style lang="scss" scoped></style>