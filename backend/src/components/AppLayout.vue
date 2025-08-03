<template>
    <div class="min-h-full flex bg-gray-200">
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
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import {ref,onMounted,onUnmounted} from "vue";

const sideBarOpened = ref(true);
function toggleSidebar() {
    sideBarOpened.value = !sideBarOpened.value;
    window.addEventListener('resize',handleSideBarOpened);
}

onMounted(()=>{
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
