<template>
    <div class="min-h-full flex bg-gray-200">
        <!--        Sidebar-->
        <Sidebar :class="{'-ml-[200px]': !sideBarOpened}"/>
        <!--        Sidebar-->
        <div class="flex-1 ">
            <TopHeader @toggle-sidebar="toggleSidebar"/>
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
import TopHeader from "./TopHeader.vue";
import {ref} from "vue";

const sideBarOpened = ref(true);
function toggleSidebar() {
    sideBarOpened.value = !sideBarOpened.value;
}
</script>

<style scoped>
</style>
