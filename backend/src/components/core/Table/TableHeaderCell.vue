<template>
    <th @click="$emit('click',field)" class="border-b-2 p-2 text-left cursor-pointer "
        :class="field===sortField ? 'bg-blue-50':''">
        <div class="flex justify-between">
            <slot></slot>
            <div v-if="field===sortField" class="ml-2">
                <BarsArrowUpIcon class="text-gray-600 size-6" v-if="sortDirection==='asc'"/>
                <BarsArrowDownIcon class="text-gray-600 size-6"v-else/>
            </div>
        </div>
    </th>
</template>
<script setup>
import { BarsArrowUpIcon } from '@heroicons/vue/24/outline';
import { BarsArrowDownIcon } from '@heroicons/vue/20/solid';

const {field,sortField,sortDirection} = defineProps({
    field: String,
    sortField: String,
    sortDirection: String
})

const emit = defineEmits(['click']);
</script>