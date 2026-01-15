import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/custom.css'

// Import jQuery and plugins
import $ from 'jquery'
window.$ = window.jQuery = $

// Import Select2
import 'select2'
import 'select2-bootstrap-5-theme/dist/select2-bootstrap-5-theme.css'

// Import Toastr
import toastr from 'toastr'
window.toastr = toastr

// Import SweetAlert2
import Swal from 'sweetalert2'
window.Swal = Swal

// Import ApexCharts
import ApexCharts from 'apexcharts'
window.ApexCharts = ApexCharts

Vue.use(BootstrapVue)
Vue.use(VueRouter)

// Import Components
import DefaultLayout from './components/layouts/DefaultLayout.vue'
import Home from './components/Home.vue'
import Dashboard from './components/Dashboard.vue'
import Statistik from './components/Statistik.vue'

// Router Configuration
const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: 'statistik',
                name: 'Statistik',
                component: Statistik
            }
        ]
    },
    {
        path: '*',
        redirect: '/'
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
