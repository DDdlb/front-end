<template>
  <div 
    ref="containerTarget" 
    class="relative" 
    :style="{height: containerHeight + 'px'}"
  >
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div 
        v-for="(item, index) in data" 
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="width" :index="index" />
      </div>
    </template>
    <!-- 加载提示 -->
    <div v-else>加载中...</div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue"
import {getImgElements, getAllImg, onCompleteImgs, getMinHeightColumn, getMinHeight, getMaxHeight} from './utils'

const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识 key
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    default: 2,
    type: Number
  },
  // 列间距
  columnSpacing: {
    default: 20,
    type: Number
  },
  // 行间距
  rowSpacing: {
    default: 20,
    type: Number
  },
  // 是否需要图片预读取
  picturePreReading: {
    type: Boolean,
    default: true
  }
})

// 容器总高度 = 最高的这一列的高度
const containerHeight = ref(0)
// 记录每一列高度 key:所在列， val： 列高
const columnHeightObj = ref({})
/**
 * 构建记录每列高度的对象
 */
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for(let i = 0; i<props.column;i++){
    columnHeightObj.value[i] = 0
  }
}
// 容器实例
const containerTarget = ref(null)
// 容器总宽 (不包含 margin， padding)
const containerWidth = ref(0)
// 容器左边距
const containerLeft = ref(0)
/**
 * 计算容器宽度
 */
const useContainerWidth = ()=>{
  // window.getComputedStyle() https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
  const { paddingLeft, paddingRight } = getComputedStyle(containerTarget.value, null)

  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  
  // 容器宽度
  containerWidth.value = 
    containerTarget.value.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}
// 列宽 = （容器宽 - 总列间距） / 列数
const columnWidth = ref(0)
// 总列间距
const columnSpacingTotal = computed(()=>{
  return (props.column - 1) * props.columnSpacing
})
/**
 * 计算列宽
 */
const useColumnWidth = () => {
  // 容器宽度
  useContainerWidth()
  // 列宽
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}

// item 高度集合
let itemHeights = []
/**
 *  监听图片加载完成(需要图片预加载， picturePreReading：true)
 */
const waitImgComplete = () => {
  itemHeights = []
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 获取元素img标签
  const imgElements = getImgElements(itemElements)
  // 所有图片链接
  const allImgs = getAllImg(imgElements)
  // 等待图片加载完成 
  onCompleteImgs(allImgs).then(()=>{
    itemElements.forEach(el=>{
      itemHeights.push(el.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  })
  
}
/**
 * 不需要预加载,直接计算
 */
const useItemHeight =() =>{
  itemHeights = []
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 计算高度
  itemElements.forEach(el=>{
    itemHeights.push(el.offsetHeight)
  })
  // 渲染位置
  useItemLocation()
}

onMounted(()=>{
  useColumnWidth()
})
/**
 * 触发计算
 */
watch(
  ()=>props.data,
  (newVal) => {
    // 数据变化后, DOM更新后执行
    nextTick(()=>{
      // 第一次获取数据时，构建高度容器
      const resetColumnHeight = newVal.every((item)=> !item._style)
      if(resetColumnHeight){
        // 重新构建高度容器
        useColumnHeightObj()
      }
      if(props.picturePreReading){
        waitImgComplete()
      }else{
        useItemHeight()
      }
    })
  },{
    deep: true,
    immediate: true
  }
)
/**
 * 返回下一个item的left
 */
const getItemLeft = () => {
  // 拿到最小宽度的列
  const column = getMinHeightColumn(columnHeightObj.value)
  return column * (columnWidth.value + props.columnSpacing) + containerLeft.value
}
/**
 * 返回下一个item的top
 */
 const getItemTop = () => {
  return getMinHeight(columnHeightObj.value)
}
/**
 * 更新指定列高
 */
const increasingHeight = (index)=>{
  const column = getMinHeightColumn(columnHeightObj.value)
  columnHeightObj.value[column] += itemHeights[index] + props.rowSpacing
}
/**
 * 渲染位置
 */
const useItemLocation = ()=>{
  // 处理数据源
  props.data.forEach((item, index)=>{
    // 避免重复计算
    if(item._style) return 
    // 生成_style
    item._style = {}
    // left
    item._style.left = getItemLeft()
    // top
    item._style.top = getItemTop()
    // 更新列高
    increasingHeight(index)
    
  })
  // 容器高度更新
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}
/**
 * 组建销毁时清除_style
 */
onUnmounted(()=>{
  props.data.forEach((item)=>{
    delete item._style
  })
})
/**
 * 重新渲染
 */
const reset = () => {
  // 重新计算列宽
  setTimeout(()=>{
    useColumnWidth()
    // 重置所有定位数据
    props.data.forEach(item=>{
      item._style = null
    })
  }, 100)
}
/**
 * 监听列数变化,实现不同设备动态切换
 */
watch(
  ()=>props.column,
  ()=>{
    if(props.picturePreReading){
      columnWidth.value = 0
      reset()
    }else{
      reset()
    }
  }
)
</script>
