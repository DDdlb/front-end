<template>
  <div>
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
  size: 20
}
// 图片数据源
const pexelsList = ref([])

const getPexelsData = async () => {
  const res = await getPexelsList(query)
  console.log(res);
  pexelsList.value = res.list
}
getPexelsData()
</script>

