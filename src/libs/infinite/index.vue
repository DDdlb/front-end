<template>
  <div>
    <!-- 内容 -->
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon 
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin" 
        name="infinite-load"
      ></m-svg-icon>
      
      <!-- 没有更多数据 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">已经没有更多数据啦！</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useVModel, useIntersectionObserver } from '@vueuse/core';

const props = defineProps({
  // 是否处于加载状态
  modeValue: {
    type: Boolean,
    required: true
  },
  // 数据是否加载完成
  isFinished: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['onLoad', 'update:modelValue'])

const loading = useVModel(props.modeValue, emits)

const loadingTarget = ref(null)
// isIntersecting表示是否元素可见
useIntersectionObserver(loadingTarget, ([{ isIntersecting }])=>{
  // 当加载更多视图可见时，处理加载更多的逻辑
  if(isIntersecting && !loading.value && !props.isFinished){
    // 修改加载数据标记
    loading.value = true
    emits('onLoad')
  }
})
</script>