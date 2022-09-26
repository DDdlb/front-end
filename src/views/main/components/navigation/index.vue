<template>
  <mobile-navigation-vue v-if="isMobile" />
  <pc-navigation-vue v-else />
</template>

<script setup>
import { isMobile } from '@/utils/flexible.js';
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'
import { useStore } from 'vuex';

const store = useStore()
// 获取categories数据，存入vuex
store.dispatch('categories/useCategoriesData')

</script>

<style>

</style>