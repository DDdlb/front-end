<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div 
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 
        outline-none hover:bg-zinc-100">
        <!-- 头像 -->
        <img class="w-3 h-3 rounded-sm" src="https://thirdwx.qlogo.cn/mmopen/vi_32/JQwSicKgsAW355mNfRj3bJ05tZkh5CacibkVL8eUUP1w2wT6NG1jiap10F75J4JsJu40IhUqRZajFkF2IZ1SIwbgw/132" alt="">
        <!-- 下箭头 -->
        <m-svg-icon class="h-1.5 w-1.5 ml-0.5" name="down-arrow" fillClass="fill-zinc-900"></m-svg-icon>
        <!-- vip -->
        <m-svg-icon class="h-1.5 w-1.5 absolute right-[16px] bottom-0" name="vip"></m-svg-icon>
      </div>
    </template>

    <!-- 气泡 -->
    <div class="w-[140px] overflow-hidden">
      <div 
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
        v-for="item in menuArr"
        :key="item.id"
      >
      <m-svg-icon :name="item.icon" class="w-1.5 h-1.5 mr-1" fillClass="fill-zinc-900"></m-svg-icon> 
      <span class="text-zinc-800 text-sm">{{ item.title }}</span> 
    </div>
    </div>
  </m-popover>
</template>

<script setup>
const menuArr = [
  {
    id: '0',
    icon: 'profile',
    title: '个人资料',
    path: '/profile'
  },{
    id: '1',
    icon: 'vip-profile',
    title: '升级 vip',
    path: '/member'
  },{
    id: '2',
    icon: 'logout',
    title: '退出',
    path: ''
  }
]
</script>