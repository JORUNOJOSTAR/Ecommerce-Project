<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <GuestLayout title="Set new password">
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <div class="flex items-center justify-between">
                        <label for="new-password" class="block text-sm/6 font-medium text-gray-900">New Password</label>
                    </div>
                    <div class="mt-2">
                        <input placeholder="New Password" type="password" name="password" id="new-password"  required="" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="password-repeat" class="block text-sm/6 font-medium text-gray-900">Repeat Password</label>
                    </div>
                    <div class="mt-2">
                        <input placeholder="Repeat Password" type="password" name="password_repeat" id="password-repeat"  required="" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
                <div class="text-sm">
                    <router-link :to="{name:'login'}" class="font-semibold text-indigo-600 hover:text-indigo-500">
                        Go back to login
                    </router-link>
                </div>

                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                </div>
            </form>
        </GuestLayout>
    </div>
</template>


<script setup>
import GuestLayout from "@/components/GuestLayout.vue";
</script>

<style scoped>
</style>
