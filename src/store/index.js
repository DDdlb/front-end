import { createStore } from "vuex";
import categories from "./modules/categories";
import getters from "./getters";
import createPersistedState from 'vuex-persistedstate'
import theme from "./modules/theme";

const store = createStore({
    getters,
    modules: {
        categories,
        theme
    },
    plugins: [
        createPersistedState({
            // 指定保存到localStorage中的key值
            key: 'font',
            // 需要保存的模块
            paths: ['categories', 'theme']
        })
    ]
})

export default store