<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Part of the app
            </h2>
        </div>

        <router-view></router-view>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
});
</script>

<style scoped></style>
