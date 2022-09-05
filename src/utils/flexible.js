import { computed } from "vue"
import { PC_DEVICE_WIDTH } from "@/config"
import { useWindowSize } from "@vueuse/core"

const { width } = useWindowSize()
/**
 * @description 判断当前设备是否为移动端，依据屏幕宽度
 */
export const isMobile = computed(()=>{
    // 未用到响应式数据，computed不起作用
    // return document.documentElement.clientWidth < PC_DEVICE_WIDTH
    return width.value < PC_DEVICE_WIDTH;
})

/**
 * @description 动态指定rem基准值
 */
export const useREM = ()=>{
    // 最大font-size
    const MAX_FONT_SIZE = 40

    document.addEventListener('DOMContentLoaded', ()=>{
        // 拿到html标签
        const html = document.querySelector('html')
        // fontSize 根据屏幕宽度
        let fontSize = window.innerWidth / 10
        fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
        // 赋值给html
        html.style.fontSize = fontSize + 'px'
    })
}