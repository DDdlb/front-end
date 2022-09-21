<template>
  <div ref="container" class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40">
    <div>
      <!-- <h1>{{inputVal}}</h1> -->
      <!-- 搜索图标 -->
      <m-svg-icon 
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        name="search"
        color="#707070"
      ></m-svg-icon>
      <!-- 输入框 -->
      <input 
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400
        rounded-xl text-zinc-900 tracking-wide text-sm font-semibold border border-zinc-100
        focus:border-red-300 duration-500 group-hover:bg-white group-hover:border-zinc-200" 
        type="text"
        placeholder="搜索"
        v-model="inputVal"
        @keyup.enter="handleSearch"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
      />
      <!-- 删除按钮 -->
      <m-svg-icon 
        v-show="inputVal"
        name="input-delete" 
        class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"
        @click="handleClear"
      ></m-svg-icon>
      <!-- 分割线 -->
      <div 
        class=" opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-62px right-[62px]
        duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- 搜索按钮（通用组建） -->
      <m-button 
        icon="search" 
        iconColor="#ffffff" 
        class="absolute translate-y-[-50%] top-[50%] right-1 rounded-full opacity-0 group-hover:opacity-100 duration-500"
        @click="handleSearch"
      ></m-button>
      <!-- 下拉区 -->
      <transition name="slide">
        <!-- slot中的dropdown存在时展示 输入框获取焦点时展示 -->
        <div 
          v-if="$slots.dropdown"
          v-show="isFocus"
          class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20
          left-0 top-[56px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-2xl"
        >
          <slot name="dropdown" />
          <!-- <h1>{{inputVal}},  {{modelVal}}</h1> -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { onClickOutside } from '@vueuse/core';
/**
 * 1. 输入内容实现双向绑定
 * 2. 搜索按钮 hover时展示
 * 3. 一键清空文本
 * 4. 触发搜索
 * 5. 控制下拉菜单展示
 * 6. 事件处理
 */
const props = defineProps({
  modelVal: {
    required: true,
    type: String
  }
})
const emit = defineEmits([
  'update:modelVal',  // 双向绑定
  'clear',  // 清空事件
  'search',  // 搜索事件
  'input',  // 输入事件
  'focus',  // 获取焦点事件
  'blur',  // 失去焦点  
])
const inputVal = ref(props.modelVal)
// 输入框是否获取焦点
const isFocus = ref(false)
// 
const container = ref(null)

watch(
  ()=>inputVal.value,
  (newVal)=>{
    emit('update:modelVal', newVal)
    emit('input', newVal)
  },
  {
    immediate: true
  }
)

// 清空文本
const handleClear = ()=>{
  inputVal.value = ''
  emit('clear', '')
}

// 触发搜索
const handleSearch = ()=>{
  emit('search', inputVal.value)
  console.log('search');
}

// 输入框获取焦点
const onFocusHandler = ()=>{
  isFocus.value = true
  emit('focus')
}

// 失去焦点事件
const onBlurHandler = ()=>{
  emit('blur')
}
// 区域外点击时，取消下拉窗
onClickOutside(container, ()=>{
  isFocus.value = false
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active{
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to{
  opacity: 0;
  transform: translateY(40px);
}
</style>