<template>
  <mobile-navigation-vue :categories="categories" v-if="isMobile" />
</template>

<script setup>
import { isMobile } from '@/utils/flexible.js';
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'

import { getCategory } from '@/api/category.js';
import { onMounted, ref } from '@vue/runtime-core';
import { ALL_CATEGORY_ITEM } from '@/config'

const categories = ref([])

onMounted(async()=>{
    const res = await getCategory()
    console.log(res);
    categories.value = res.categories
    categories.value.unshift(ALL_CATEGORY_ITEM)
})
</script>

<style>

</style>