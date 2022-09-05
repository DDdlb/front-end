import http from '@/utils/http'

/**
 * 获取分类列表
 */
export const getCategory = ()=>{
    return http({
        url: '/category'
    })
}