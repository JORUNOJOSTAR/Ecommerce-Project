<template>

    <div class="flex justify-center items-center min-w-full w-full min-h-full">
        <div class="flex">
            <div class="text-indigo-600 self-start text-5xl px-8 pb-8 font-bold border-r">404</div>
            <div class="px-8">
                <h1 class="font-bold text-5xl mb-2">Page Not Found</h1>
                <p class="text-gray-400 mb-12">Please check the url and try again</p>
                <div class="mt-8">
                    <router-link :to="{name:'app.dashboard'}" class=" rounded-md bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Go back home
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
<script setup>
</script>
