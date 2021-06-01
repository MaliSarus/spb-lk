import initAccordion from "./modules/accordion";
import {getCookie, setCookie} from "./modules/cookie";

function changeLang() {
  const currentLang = getCookie('lang');
  setCookie('lang', currentLang === 'ru' ? 'en' : 'ru');
  location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
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

    changeLangDesktop.addEventListener('click', changeLang);
    changeLangMobile.addEventListener('click', changeLang);
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
  const mobileMenu = document.querySelector('.mobile-menu.static');
  const mobileParentMenu = mobileMenu.querySelector('.mobile-menu__parent');
  const mobileParentMenuButtons = mobileParentMenu.querySelectorAll('.mobile-menu__menu > nav > ul > li > button')


  const mobileSubMenu = mobileMenu.querySelector('.mobile-menu__submenu');
  const mobileSubMenuClose = mobileSubMenu.querySelector('.mobile-menu__back')

  if (mobileParentMenuButtons) {
    mobileParentMenuButtons.forEach(button => {
      button.addEventListener('click', function () {
        const dropdown = this.parentNode.querySelector('.dropdown > ul')
        mobileSubMenu.querySelector('.mobile-menu__menu > nav').append(dropdown.cloneNode(true));
        mobileSubMenu.classList.add('active')
      })
    })
  }
  mobileSubMenuClose.addEventListener('click',() => {
    mobileSubMenu.classList.remove('active');
    mobileSubMenu.querySelector('.mobile-menu__menu > nav').innerHTML = ''
  })
})
