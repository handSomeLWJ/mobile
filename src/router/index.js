import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () =>
    import ('../views/home/Home')
const Cart = () =>
    import ('../views/cart/Cart')
const My = () =>
    import ('../views/my/My')
const Detail = () =>
    import ('../views/detail/Detail')
const Login = () =>
    import ('../views/login/Login')
const OrderConfirm = () =>
    import ('../views/orderConfirm/OrderConfirm')
const AddressList = () =>
    import ('../views/addressList/AddressList')
const AddressEdit = () =>
    import ('../views/addressEdit/AddressEdit')

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        name: 'Home',
        meta: {
            showTabbar: true
        }
    },
    {
        path: '/cart',
        component: Cart,
        name: 'Cart',
        meta: {
            isLogin: true
        }
    },
    {
        path: '/my',
        component: My,
        name: 'My',
        meta: {
            showTabbar: true
        }
    },
    {
        path: '/detail',
        component: Detail,
        name: 'Detail'
    },
    {
        path: '/login',
        component: Login,
        name: 'Login'
    },
    /* 确认订单页 */
    {
        path: '/orderConfirm',
        component: OrderConfirm,
        name: 'OrderConfirm',
        meta: {
            isLogin: true
        }
    },
    /* 收货地址页 */
    {
        path: '/addressList',
        component: AddressList,
        name: 'AddressList',
        meta: {
            isLogin: true
        }
    },
    /* 修改地址页面 */
    {
        path: '/addressEdit',
        component: AddressEdit,
        name: 'AddressEdit',
        meta: {
            isLogin: true
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
    // 判断是否有idLogin
    if (to.meta.isLogin) {
        // 需要判断是否已经登录
        if (sessionStorage.getItem("token")) {
            // 已经登录
            next()
        } else {
            // 否则去登录页面
            next('./login')
        }
    } else {
        next()
    }
})


export default router