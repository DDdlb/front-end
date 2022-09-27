<template>
  <div>
    <m-infinite v-model="loading" :isFinished="isFinished" @onLoad="getPexelsData">
      <m-waterfall 
        class=" px-1 w-full"
        :data="pexelsList"
        nodeKey="id"
        :column="isMobile ? 2 : 5"
        picturePreReading="false"
      >
        <template v-slot="{item, width}">
          <div>
            <item-vue :data="item" :width="width"></item-vue>
          </div>
        </template>
      </m-waterfall>
    </m-infinite>
  </div>
</template>

<script setup>
import {getPexelsList} from '@/api/pexels'
import { ref } from 'vue'
import itemVue from './item.vue'
import {isMobile} from '@/utils/flexible'

/**
 * 请求数据
 */
let query = {
  page: 1,
  per_page: 20
}
// 图片数据源
const pexelsList = ref([])

// loading
const loading = ref(false)
// 数据是否加载完毕
const isFinished = ref(false)

const getPexelsData = async () => {
  // 数据加载完成, 直接返回
  if(isFinished.value) return
  // 完成第一次请求后后续page自增
  if(pexelsList.value.length){
    query.page += 1
  }
  // 触发接口
  const res = await getPexelsList(query)
  if(query.page === 1){
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }
  // 判断数据是否加载完成
  if(pexelsList.value.length === res.total){
    isFinished.value = true
  }
  // 修改loading标记
  loading.value = false
}
getPexelsData()
</script>

