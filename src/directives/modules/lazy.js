import { useIntersectionObserver } from "@vueuse/core"
export default {
    // 图片懒加载: 用户看不到图片时不加载，能看到图片时在加载
    mounted(el) {
        const imgSrc = el.src 
        el.src = ''

        const { stop } = useIntersectionObserver(el, ([{isIntersecting}])=>{
            // 图片可见时加载
            if(isIntersecting){
                el.src = imgSrc
                // 停止监听
                stop()
            }
        })
    },
}