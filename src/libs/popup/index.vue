<template>
  <!-- teleport将内容渲染到指定元素下 -->
  <!-- <teleport to="body" > -->
    <h1>{{modelShow}}</h1>
    <!-- 蒙版 -->
    <transition name="fade">
      <!-- /80表示透明度80% -->
      <div 
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0" 
        v-bind="$attrs"
        v-if="modelShow"
        @click="emits('changeVisible')"
      ></div>
    </transition>

    <!-- 弹窗 -->
    <transition name="popup-down-up">
      <!-- v-bing="$attrs": 使用时绑定的属性会绑定到div上 -->
      <div class="w-screen bg-white z-50 fixed bottom-0" v-if="modelShow">
        <slot />
      </div>
    </transition>
  <!-- </teleport> -->
</template>

<script setup>
import { watch } from '@vue/runtime-core';
import { useScrollLock } from '@vueuse/core';
const props = defineProps({
  modelShow: Boolean
})
// 关闭蒙版事件
const emits = defineEmits(['changeVisible'])
// 锁定滚动
// isLocked动态控制是否锁定滚动
const isLocked = useScrollLock(document.body)
// 监听窗口显示状态和isLocked同步
watch(
  () => props.modelShow,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
// 过度前 和 离开时
.fade-enter-active, .fade-leave-active{
  transition: all 0.3s;
}
// 准备进入和离开完成
.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}

.popup-down-up-enter-active, .popup-down-up-leave-active{
  transition: all 0.3s; 
}
.popup-down-up-enter-from, .popup-down-up-leave-to{
  transform: translateY(100%);
}
</style>