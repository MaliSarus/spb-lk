import VueI18n from 'vue-i18n'
import Vue from 'vue'
import ru from './ru'
import en from './en'
import {getCookie} from "@/helpers/cookie";


const messages = {
  ru,
  en
}
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: getCookie('lang'), // set locale
  fallbackLocale: 'ru',
  messages, // set locale messages
})
//
// const langInterval = setInterval(function () {
//   const cookieLang = getCookie('lang');
//   console.log('check lang: ' + cookieLang);
//   if (cookieLang){
//     currentLang = cookieLang;
//     i18n.locale = currentLang;
//     clearInterval(langInterval);
//   }
// }, 100)

export default i18n