import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import {baseURL} from "./helpers/defaultValues";

Vue.use(Vuelidate);
axios.defaults.baseURL = baseURL


Vue.config.productionTip = false

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

if (document.querySelector('#app-one')) {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app-one')
}
