/**
 * 处理navigator 中的category数据
 */
import { ALL_CATEGORY_ITEM } from '@/config'
import { getCategory } from '@/api/category.js'

const init_category = [
    ALL_CATEGORY_ITEM,
  { id: 'web_app_icon', name: 'UI/UX', col: 1, urlname: 'web_app_icon' },
  { id: 'design', name: '平面', col: 1, urlname: 'design' },
  { id: 'illustration', name: '插画/漫画', col: 1, urlname: 'illustration' },
  { id: 'photography', name: '摄影', col: 2, urlname: 'photography' },
  { id: 'games', name: '游戏', urlname: 'games' },
  { id: 'anime', name: '动漫', urlname: 'anime' },
  {
    id: 'industrial_design',
    name: '工业设计',
    col: 2,
    urlname: 'industrial_design'
  },
  { id: 'architecture', name: '建筑设计', urlname: 'architecture' },
  { id: 'art', name: '人文艺术', urlname: 'art' },
  { id: 'home', name: '家居/家装', col: 1, urlname: 'home' },
  { id: 'apparel', name: '女装/搭配', col: 1, urlname: 'apparel' },
  { id: 'men', name: '男士/风尚', col: 2, urlname: 'men' },
  { id: 'modeling_hair', name: '造型/美妆', urlname: 'modeling_hair' },
  { id: 'diy_crafts', name: '手工/布艺', urlname: 'diy_crafts' },
  { id: 'food_drink', name: '美食', urlname: 'food_drink' },
  { id: 'travel_places', name: '旅行', urlname: 'travel_places' },
  { id: 'wedding_events', name: '婚礼', col: 2, urlname: 'wedding_events' }
]

export default {
  // 独立作用域
  namespaced: true,
  state: () => ({
    categories: init_category
  }),
  mutations: {
    // 为categories赋值的唯一方式
    setCategories(state, newCategories) {
        console.log(newCategories);
      state.categories = [ALL_CATEGORY_ITEM, ...newCategories]
    }
  },
  actions: {
    /**
     *  获取categories 数据，自动保存到vuex中
     */
    async useCategoriesData(context) {
      const { categories } = await getCategory()
    //   console.log(categories);
      context.commit('setCategories', categories)
    }
  }
}
