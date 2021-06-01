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
  locale: 'ru', // set locale
  fallbackLocale: 'ru',
  messages, // set locale messages
})

let currentLang = ''
if (!getCookie('lang')) {
  const langInterval = setInterval(function () {
    const cookieLang = getCookie('lang');
    if (cookieLang) {
      currentLang = cookieLang;
      i18n.locale = currentLang;
      clearInterval(langInterval);
    }
  }, 100)
}else{
  i18n.locale = getCookie('lang')
}


export default i18n