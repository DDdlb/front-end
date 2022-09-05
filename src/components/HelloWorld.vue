<script setup>
import { ref } from 'vue'

const props = defineProps({
  msg: String,
  isShow: Boolean
})

const count = ref(0)

const handleDiv = ()=>{
  props.msg = 'msg'
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="handleDiv">div</button>
  <h1 v-if="isShow">show</h1>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
