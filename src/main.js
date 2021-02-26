import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

if (document.querySelector('.header__account-button')){
  const accountButton = document.querySelector('.header__account-button')
  // if (accountButton.classList.contains('account-button_login'))
  accountButton.addEventListener('click', function (){
    const accountButtonParent = document.querySelector('.header__account');
    const accountMenu = accountButtonParent.querySelector('.header__account-menu');
    accountMenu.classList.toggle('open');
    accountMenu.style.width = (this.offsetWidth - 2) + 'px';
  })
}

if (document.querySelector('#app-one')) {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app-one')
}
