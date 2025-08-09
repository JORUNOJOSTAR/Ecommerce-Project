<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <GuestLayout title="Sign in to your account">
            <div v-if="errorMsg" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded">
                {{errorMsg}}
                <span @click="errorMsg = '' " class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-black/20">
                    <XMarkIcon/>
                </span>
            </div>
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
                    <button type="submit"
                            :disabled="loading"
                            class="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            :class="{
                                'cursor-not-allowed': loading,
                                'hover:bg-indigo-500': loading
                            }">
                        <svg v-if="loading" class="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span>Sign in</span>
                    </button>
                </div>
            </form>
        </GuestLayout>
    </div>
</template>


<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import {ref} from "vue";
import GuestLayout from "../components/GuestLayout.vue";
import store from "../store/index.js";
import {useRouter} from "vue-router";

const router = useRouter();
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
            ({response})=> {
                errorMsg.value = response.data.message;
            }
        )
        .finally(
            loading.value = false
        );
}

</script>

<style scoped>
</style>
