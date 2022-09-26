/**
 * 获取图片列表api, 图片来自pexels
 */
import http from '@/utils/http'

export const getPexelsList = (data) => {
    return http({
        url: '/pexels/list',
        params: data
    })
}