<template>
  <div class="w-full bg-white border-b border-b-zinc-200 px-2 py-1">
    <div class="flex items-center">
      <img 
        src="@/assets/logo.png" 
        alt="" 
        class="h-4 cursor-pointer mr-2"
        @click="onToHome"
      />
      <header-search-vue class="mr-1"></header-search-vue>
      <header-theme-vue class="mr-1"></header-theme-vue>
      <header-user-vue></header-user-vue>
    </div>
  </div>
</template>
<script setup>
import headerThemeVue from './header-theme.vue'
import headerUserVue from './header-user.vue'
import headerSearchVue from './header-search/index.vue'
import { useRouter } from 'vue-router'
// router === this.$router
const router = useRouter()
const onToHome = ()=>{
  router.push('/')
}
</script>
