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
import VModal from "vue-js-modal/dist/index.nocss.js";
import VueCookies from 'vue-cookies'



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

export const eventBus = new Vue()
//Vue JS
if (document.querySelector('#app-one') ) {

  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app-one')
}
