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
import FileSelector from 'vue-file-selector';
import vueAwesomeCountdown from 'vue-awesome-countdown'
import initAccordion from "./helpers/accordion";

// Plugins
Vue.use(Vuelidate);
Vue.use(Toast,{
    transition: "Vue-Toastification__bounce",
    maxToasts: 3,
    newestOnTop: true,
    position:"bottom-right",
    timeout: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    showCloseButtonOnHover: true
});
Vue.use(VTooltip)
Vue.use(FileSelector),

// Directives
Vue.directive('on-clickaway', onClickaway);

//Components
Vue.use(vueAwesomeCountdown,'countdown')

// Configs
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

//Native JS
const mobileMenu = document.querySelector('.mobile-menu');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

if (document.querySelector('.accordion')){
    initAccordion(document.querySelectorAll('.accordion__title'))
}
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
        this.classList.toggle('is-active');
        mobileMenu.classList.toggle('open')
        mobileMenu.style.paddingTop = header.offsetHeight + 'px'
        mobileMenu.style.paddingBottom = footer.offsetHeight + 'px'
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
