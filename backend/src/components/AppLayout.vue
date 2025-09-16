<template>
    <div v-if="currentUser.id" class="min-h-full flex bg-gray-200">
        <!--        Sidebar-->
        <Sidebar :class="{'-ml-[200px]': !sideBarOpened}"/>
        <!--        Sidebar-->
        <div class="flex-1 ">
            <Navbar @toggle-sidebar="toggleSidebar"/>
<!--            Content-->
            <main class="p-6">
                <router-view></router-view>
            </main>
<!--            Content-->
        </div>


    </div>
    <div v-else class="min-h-full bg-gray-200 flex items-center justify-center">
        <Spinner></Spinner>
    </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import {ref,onMounted,onUnmounted,computed} from "vue";
import store from "@/store/index.js";
import Spinner from '@/components/core/Spinner.vue';
const sideBarOpened = ref(true);

const currentUser = computed(()=>store.state.user.data);
function toggleSidebar() {
    sideBarOpened.value = !sideBarOpened.value;
    window.addEventListener('resize',handleSideBarOpened);
}

onMounted(()=>{
    store.dispatch('getUser');
    handleSideBarOpened();
    window.addEventListener('resize',handleSideBarOpened);
});

onUnmounted(()=>{
    window.removeEventListener('resize',handleSideBarOpened);
})



function handleSideBarOpened(){
    sideBarOpened.value = window.outerWidth > 768;
}

</script>

<style scoped>
</style>
