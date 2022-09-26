import { THEME_LIGHT } from '@/config'
export default {
    namespace: true,
    state: ()=>({
        // 当前主题
        themeType: THEME_LIGHT
    }),
    mutations: {
        changeThemeType(state, newTheme){
            state.themeType = newTheme.type
        }
    }
}