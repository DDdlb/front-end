<template>
<div class=" bg-white sticky top-0 left-0 z-10">
  <ul 
    class=" relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    ref="ulTarget"
  >
    <!-- 滑块 -->
    <li :style="slideBarStyle" class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200">

    </li>
    <!-- 汉堡按钮 -->
    <li 
      class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white"
      @click="handlePopup"
      >
      <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
    </li>
    <!-- 菜单 通过 setItemRef 获取v-for中所有元素 -->
    <li v-for="(item, index) in categories" :key="item.id" 
      class=" shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-3"
      :ref="setItemRef"
      @click="onItemClick(index)"
      :class="{
        'text-zinc-100': currentCategoryIndex === index
      }"
    >
    {{item.name}}
    </li>
  </ul>
  <!-- 弹窗 -->
  <m-popup :modelShow="isVisable" @changeVisible="changeVisible">
    <div class=" py-2 h-[80vh] flex flex-col">
      <h2 class=" text-xl text-zinc-900 font-bold mb-2 px-1">所有分类</h2>
      <ul class=" overflow-y-scroll ">
        <li 
          class=" text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100"
          v-for="(item, index) in categories"
          :key="item.id"
          @click="onItemClick(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </m-popup> 
  <!-- <Popup :modelShow="isVisable" @changeVisible="changeVisible" /> -->
</div>
  
</template>

<script setup>
import { ref } from "@vue/reactivity"
import { onBeforeUpdate, watch } from "@vue/runtime-core"
import { useScroll } from '@vueuse/core'
import Popup from '@/libs/popup/index.vue'

// vite 中可以直接使用defineProps
defineProps({
    categories: {
        type: Array,
        required: true
    }
})
// 滑块样式
const slideBarStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})
// 当前滑块下标 
const currentCategoryIndex = ref(0)
let itemRefs = []
// 每次DOM变化时都会执行，需要在变化前重置itemRefs
const setItemRef = (el)=>{
  // console.log(el);
  if(el){
    itemRefs.push(el)
  }
}
// 数据改变后，DOM变化前
onBeforeUpdate(()=>{
  itemRefs = []
})
// ul元素
const ulTarget = ref(null)
// 滚动宽度
const { x:ulScroll } = useScroll(ulTarget)
// watch 监听, val为新下标
watch(currentCategoryIndex, (val)=>{
  // getBoundingClientRect(), 获取DOM元素宽高和位置
  const { left, width } = itemRefs[val].getBoundingClientRect()
  // 滑块位置 = ul横向滚动位置 + 当前元素left - ul的padding
  slideBarStyle.value = {
    transform: `translateX(${ulScroll.value + left - 10}px)`,
    width: width + 'px'
  }
})
// 是否展示蒙版
const isVisable = ref(false)

const onItemClick = (index)=>{
  currentCategoryIndex.value = index
  isVisable.value = false
}


const handlePopup = ()=>{
  console.log(isVisable.value);
  isVisable.value = true
}

const changeVisible = ()=>{
  console.log("false  asdasd");
  isVisable.value = false
}
</script>

<style>

</style>