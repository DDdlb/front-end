<template>
  <!-- <HelloWorldVue :msg="msg" :isShow="isShow" /> -->
  <!-- <button @click="handleClick">change</button> -->
  <router-view />
</template>

<script setup>
import { ref } from '@vue/reactivity';
import HelloWorldVue from './components/HelloWorld.vue';
const msg = ref('hello')
const isShow = ref(true)

const handleClick = ()=>{
  isShow.value = !isShow.value
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
