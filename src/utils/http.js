import axios from "axios";

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000
})

/**
 * @description 响应拦截
 */
service.interceptors.response.use(res=>{
    const { code, msg, data } = res.data
    if(!code) return res.data
    if(code === 200){
        return data
    }
    return Promise.reject(new Error(msg))
})
export default service