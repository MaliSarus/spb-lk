import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import {baseURL} from "./helpers/defaultValues";
import { directive as onClickaway } from 'vue-clickaway';
import Toast from 'vue-toastification';
import "vue-toastification/dist/index.css"
import VTooltip from 'v-tooltip'

// Plugins
Vue.use(Vuelidate);
Vue.use(Toast,{
    transition: "Vue-Toastification__bounce",
    maxToasts: 3,
    newestOnTop: true,
    position:"bottom-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    showCloseButtonOnHover: true
});
Vue.use(VTooltip)

// Directives
Vue.directive('on-clickaway', onClickaway);

// Configs
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

//Native JS
if (document.querySelector('.header__account-button')) {
    const accountButton = document.querySelector('.header__account-button')
    // if (accountButton.classList.contains('account-button_login'))
    accountButton.addEventListener('click', function () {
        const accountButtonParent = document.querySelector('.header__account');
        const accountMenu = accountButtonParent.querySelector('.header__account-menu');
        accountMenu.classList.toggle('open');
        accountMenu.style.width = (this.offsetWidth - 2) + 'px';
    })
}
if (document.querySelector('.header__mobile-control')) {
    const hamburger = document.querySelector('.hamburger')
    hamburger.addEventListener('click', function () {
        this.classList.toggle('is-active')
    })
}


//Vue JS
if (document.querySelector('#app-one')) {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app-one')
}
