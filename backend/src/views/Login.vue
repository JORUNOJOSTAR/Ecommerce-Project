<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <GuestLayout title="Sign in to your account">
            <form class="space-y-3" action="#" method="POST" @submit.prevent="login">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input placeholder="Email Address" type="email" name="email" id="email" v-model="user.email" autocomplete="email" required="" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                        <div class="text-sm">
                            <router-link :to="{name: 'requestPassword' }" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</router-link>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input placeholder="Sign in Password" type="password" name="password" id="password" autocomplete="current-password" required="" v-model="user.password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>

                    <div class="pt-2 flex items-center">
                        <input id="remember-me" name="remember-me" v-model="user.remember" type="checkbox"
                               class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                        <label for="remember-me" class="ml-2 block text-sm font-medium text-gray-500"> Remember me </label>
                    </div>
                </div>


                <div class="pt-3">
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
            </form>
        </GuestLayout>
    </div>
</template>


<script setup>
import {ref} from "vue";
import GuestLayout from "../components/GuestLayout.vue";
import store from "../store/index.js";
import router from "../router/index.js";
const loading = ref(false);
const errorMsg = ref('');

const user = {
    email: '',
    password: '',
    remember: false,
};

function login(){
    loading.value = true;
    store.dispatch('login',user)
        .then(
            ()=> router.push({name:'app.dashboard'})
        )
        .catch(
            ({response})=> errorMsg.value = response.data.message
        )
        .finally(
            loading.value = false
        );

}

</script>

<style scoped>
</style>
