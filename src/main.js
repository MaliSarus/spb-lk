import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import i18n from "./locales";
import router from './router'
import store from './store'
import axios from "axios";
import {baseURL} from "./helpers/defaultValues";
import {directive as onClickaway} from 'vue-clickaway';
import Toast from 'vue-toastification';
import "vue-toastification/dist/index.css"
import VTooltip from 'v-tooltip'
import FileSelector from 'vue-file-selector';
import vueAwesomeCountdown from 'vue-awesome-countdown'
import VueCollapse from 'vue2-collapse'
import initAccordion from "./helpers/accordion";
import VModal from "vue-js-modal/dist/index.nocss.js";
import VueCookies from 'vue-cookies'
import {getCookie, setCookie} from "@/helpers/cookie";


// Plugins
Vue.use(Vuelidate);
Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 3,
  newestOnTop: true,
  position: "bottom-right",
  timeout: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: true
});
Vue.use(VTooltip)
Vue.use(FileSelector)
Vue.use(VueCollapse)
Vue.use(VModal)
Vue.use(VueCookies)



// Directives
Vue.directive('on-clickaway', onClickaway);

//Components
Vue.use(vueAwesomeCountdown, 'countdown')

// Configs
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

//Native JS
function changeLang () {
  const currentLang = getCookie('lang');
  setCookie('lang',currentLang === 'ru' ? 'en' : 'ru');
  location.reload();
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
if (document.querySelector('.header.static')) {
  const staticHeader = document.querySelector('.header.static')
  const mobileMenu = document.querySelector('.mobile-menu.static')
  const hamburger = staticHeader.querySelector('.hamburger');
  const changeLangDesktop = staticHeader.querySelector('.header__lang button');
  const changeLangMobile = document.querySelector('.mobile-menu__lang button');

  changeLangDesktop.addEventListener('click',changeLang);
  changeLangMobile.addEventListener('click',changeLang);
  hamburger.addEventListener('click', function () {
    this.classList.toggle('is-active');
    if (this.classList.contains('is-active')) {
      mobileMenu.classList.add('open')
      mobileMenu.style.paddingTop = staticHeader.offsetHeight + 'px';
    } else {
      mobileMenu.classList.remove('open')
    }
  })
  const accordion = mobileMenu.querySelector('.mobile-menu__accordion');
  initAccordion(accordion.querySelectorAll('.accordion__title'))
}


//Vue JS
if (document.querySelector('#app-one') ) {
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app-one')
}
