import { watch } from "vue"
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "../config"
import store from "../store"

/**
 * 监听系统变更
 */
let matchMedia
const watchSystemThemeChange = ()=>{
    // 仅需一次初始化, 若已经初始化，直接跳出
    if(matchMedia) return
    matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
    matchMedia.onchange = () => {changeTheme(THEME_SYSTEM)}
}
/**
 * 变更主题
 * @param {*} theme 
 */
const changeTheme = (theme) => {
    let themeClass = ''
    switch(theme){
        case THEME_LIGHT:
            themeClass = 'light'
            break
        case THEME_DARK:
            themeClass = 'dark'
            break   
        case THEME_SYSTEM:
            // 调用方法，监听主题变化
            watchSystemThemeChange() 
            themeClass = matchMedia.matches ? 'dark' : 'light'
            break
    }
    document.querySelector('html').className = themeClass
}

/**
 *  初始化主题
 *  1. 当主题发生改变时，或者进入系统时进行html class的改变
 */
export default () =>{
    watch(
        ()=>store.getters.themeType,
        (val)=>{
            changeTheme(val)
        },{
            immediate: true, // 初始化时执行
        }
    )
}