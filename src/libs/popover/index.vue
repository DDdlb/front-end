<template>
<div class="relative" @mouseleave="onMouseLeaveHandler" @mouseenter="onMouseEnterHandler">
  <div ref="referenceTarget">
    <!-- 具名插槽：触发弹层视图 -->
    <slot name="reference" />
  </div>
  <!-- 气泡展示 -->
  <transition name="slide">
    <div 
      v-if="isVisable" 
      class=" absolute p-1 z-20 bg-white border rounded-md dark:bg-zinc-900 dark:border-zinc-700" 
      ref="contentTarget"
      :style="contentStyle"
    >
      <!-- 匿名插槽：展示弹出层视图 -->
      <slot />
    </div>
  </transition>
</div>
</template>
<script>
// 气泡关闭防抖时间
const DELAY_TIME = 100
// 位置常量 
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'

const placementEnum = [
  PROP_TOP_LEFT, PROP_TOP_RIGHT, PROP_BOTTOM_LEFT, PROP_BOTTOM_RIGHT
]
</script>
<script setup>
import { nextTick, ref, watch } from "vue"

// 展示气泡
const isVisable = ref(false)

const props = defineProps({
  // 控制气泡弹出位置， 给出开发者错误提示
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val){
      const res = placementEnum.includes(val)
      if(!res){
        throw new Error('placement 必须在enum中')
      }
    }
  }
})

// 鼠标移入触发
let timeout
const onMouseEnterHandler = ()=>{
  isVisable.value = true
  if(timeout){
    clearTimeout(timeout)
  }
}

// 鼠标移出触发

const onMouseLeaveHandler = ()=>{
  timeout = setTimeout(()=>{
    isVisable.value = false
    timeout = null
  }, DELAY_TIME)
}

// 计算元素尺寸，判断弹窗位置
const referenceTarget = ref(null)
const contentTarget = ref(null)
const useElementSize = (target) =>{
  if(!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

// 气泡样式
const contentStyle = ref({
  top: 0,
  left: 0
})
// 气泡展示时计算位置
watch(isVisable, (val)=>{
  if(!val) return
  // 等待元素渲染
  // vue在数据改变之后需要等待一段时间 DOM 才会变化
  // nextTick 在 DOM 变化后执行
  nextTick(()=>{
    switch(props.placement){
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left = -useElementSize(contentTarget.value).width + 'px'
        console.log(contentStyle.value);
        break
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left = useElementSize(referenceTarget.value).width + 'px'
        break
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left = -useElementSize(contentTarget.value).width + 'px'
        break
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left = useElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active{
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to{
  opacity: 0;
  transform: translateY(20px);
}
</style>