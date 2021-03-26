import VueI18n from 'vue-i18n'
import Vue from 'vue'
import ru from './ru'
import en from './en'
import {getCookie} from "@/helpers/cookie";


const currentLang = getCookie('lang');


const messages = {
  ru,
  en
}
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: currentLang, // set locale
  fallbackLocale: 'ru',
  messages, // set locale messages
})

export default i18n