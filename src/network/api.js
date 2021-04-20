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

/* 添加收藏  /product_like/create */
export const createLike = (product_id) => request({
    url: '/product_like/create',
    method: 'post',
    data: { product_id }
})

/* 取消收藏 /product_like/delete get */
export const deleteLike = (product_id) => request({
    url: '/product_like/delete',
    params: { product_id }
})

/* 登录 /user/signin post  name：用户名 password：密码 */
export const reqLogin = (data) => request({
    url: '/user/signin',
    method: 'post',
    data
})

/* 获取用户信息 /user/info  get */
export const reqUserInfo = () => request({
    url: '/user/info'
})