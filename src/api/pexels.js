/**
 * 获取图片列表api, 图片来自pexels
 */
import http from '@/utils/http'

const pexelsApi = 'https://api.pexels.com/v1'
const apiKeys = '563492ad6f91700001000001e8b8026ba6414f71a6684701e9143f9f'

export const getPexelsList = (data, option) => {
    if(option){
        http.defaults.baseURL = pexelsApi
        http.interceptors.request.use((req)=>{
            if(!req.headers.Authorization) req.headers.Authorization = apiKeys
            return req
        })
    }
    return http({
        url: option?'/curated':'/pexels/list',
        params: data
    })
}