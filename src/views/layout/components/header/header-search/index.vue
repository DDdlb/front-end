<template>
 <div class="w-full">
   <m-search v-model="modelVal" @update:model-val="modelVal = $event" @clear="handleClear">
      <template #dropdown>
         <div>
            <h1>asdasd</h1>
         </div>
      </template>
   </m-search>
 </div>
 <!-- <h1>{{modelVal}}</h1> -->
</template>

<script setup>
import { ref } from "vue";

const modelVal = ref('')

const handleChange = (val)=>{
   modelVal.value = val
}
const handleClear = ()=>{
   modelVal.value = ''
}
</script>