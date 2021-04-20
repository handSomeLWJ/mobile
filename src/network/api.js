/* 首页内容请求 */
import { request } from './request'
export const homeContent = (page, size = 10) => request({
    url: '/product/pagination',
    params: { page, size }
})

/* 详情页请求数据 */
export const detailContent = (id) => request({
    url: '/product',
    params: { id }
})