<template>
  <div class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10 duration-500">
    <ul 
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto 
      px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']"
    >
      <!-- 箭头 -->
      <div 
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="triggleState"
      >
        <m-svg-icon 
          :name="isOpenCategory?'fold':'unfold'" 
          class="w-1 h-1" 
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
      </div>
      <li 
        v-for="(item, index) in $store.getters.categories" 
        :key="item.id" 
        class=" shrink-0 px-1.5 py-0 z-10 duration-200 text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 text-sm 
        font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
        @click="onItemClick(index)"
        :class="[currentIndex === index? 'text-zinc-900 bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-900': '']"
      >
      {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/**
 * 卡片展开处理
 */
const isOpenCategory = ref(false)
const triggleState = ()=>{
  isOpenCategory.value = !isOpenCategory.value
}

/**
 * 选中处理
 */
const currentIndex = ref(0)
const onItemClick = (index)=>{
  currentIndex.value = index
}
</script>