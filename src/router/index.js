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
        name: 'Cart'
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

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router