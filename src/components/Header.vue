<template>
  <div class="header-wrapper">
    <header class="header" ref="header">
      <div class="header__wrapper">
        <a href="/" class="header__logo">
          <img :src="images.logo" alt="">
        </a>
        <div class="header__social d-xxl-none">
          <ul>
            <li><a class="inst" href="https://instagram.com/spbbeautycongress"></a></li>
            <li><a class="vk" href="https://vk.com/spbbeautycongress"></a></li>
            <li><a class="fb" href="https://www.facebook.com/spbbeautycongress2021"></a></li>
          </ul>
        </div>
        <div class="header__menu">
          <nav>
            <ul>
              <li v-for="(link, index) in headerMenu" :key="'header-link_' + index">
                <a :href="link.link">{{link.name}}</a>
                <div class="dropdown" v-if="link.drop">
                  <ul>
                    <li v-for="(dropdownItem, index) in link.drop" :key="'header-dropdown'+ index">
                      <a :href="dropdownItem.link">{{dropdownItem.name}}</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div class="header__controls">
          <div class="header__social">
            <ul>
              <li><a class="inst" href="https://instagram.com/spbbeautycongress"></a></li>
              <li><a class="vk" href="https://vk.com/spbbeautycongress"></a></li>
              <li><a class="fb" href="https://www.facebook.com/spbbeautycongress2021"></a></li>
            </ul>
          </div>
          <div class="header__account">
            <button class="header__account-button account-button_login" ref="accountButton" @click="openAccountMenu()">
              {{user.name ? user.name : $t('message.header.noname')}}
            </button>
            <div v-if="user.name" class="header__account-menu" :class="{open:accountMenuOpen}" ref="accountMenu">
              <ul>
                <li>
                  <button @click="linkClick('/user/' + $route.params.id + '/user-data/')" to="/">
                    {{$t('message.header.menu.userData')}}
                  </button>
                </li>
                <li>
                  <button @click="linkClick('/user/' + $route.params.id + '/order-cart/')" to="/">
                    {{$t('message.header.menu.orderCart')}}
                  </button>
                </li>
                <li>
                  <button class="logout" @click="logout">{{$t('message.header.menu.logout')}}</button>
                </li>
              </ul>
            </div>
          </div>
          <div class="header__lang">
            <button @click.prevent="changeLang()">
              <img :src="$i18n.locale === 'ru' ? images.engLangIcon : images.rusLangIcon" width="35" height="35" alt="">
            </button>
          </div>
        </div>
        <div class="header__mobile-control d-xxl-none">
          <button class="hamburger hamburger--squeeze header__hamburger" :class="{'is-active': mobileOpen}"
                  type="button" @click="hamburgerClick()">
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
          </button>
        </div>
      </div>
    </header>
    <div class="mobile-menu" :class="{open:mobileOpen}" ref="mobileMenu">
      <div class="mobile-menu__inner mobile-menu__parent">
        <div class="container">
          <div class="row">
            <div class="col-12" style="padding: 0 40px">
              <div class="mobile-menu__menu">
                <nav>
                  <ul>
                    <li v-for="(link, index) in headerMenu" :key="'mobile-link_' + index">
                      <a v-if="!link.drop" :href="link.link">{{link.name}}</a>
                      <button v-else @click="submenuOpen(link.drop)">{{link.name}}</button>
                    </li>
                  </ul>
                </nav>
              </div>
              <v-collapse-group v-if="user.name" :onlyOneActive="true" class="accordion mobile-menu__accordion">
                <v-collapse-wrapper @onStatusChange="afterOpen" class="accordion__item">
                  <div class="accordion__title button button_yellow" v-collapse-toggle>
                    {{user.name }}
                  </div>
                  <div class="my-content accordion__content" v-collapse-content>
                    <div class="accordion__inner-content">
                      <div class="accordion__content-wrapper">
                        <nav>
                          <ul>
                            <li>
                              <button @click="linkClick('/user/' + $route.params.id + '/user-data/')">
                                {{$t('message.header.menu.userData')}}
                              </button>
                            </li>
                            <li>
                              <button @click="linkClick('/user/' + $route.params.id + '/order-cart/')">
                                {{$t('message.header.menu.orderCart')}}
                              </button>
                            </li>
                            <li>
                              <button class="logout" @click="logout">{{$t('message.header.menu.logout')}}</button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </v-collapse-wrapper>
              </v-collapse-group>
              <ul v-else class="mobile-menu__accordion">
                <li>
                  <a href="/lk/" class="button button_yellow" style="width: 100%">
                    {{$t('message.header.noname')}}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <transition name="slide">
        <div v-if="submenu.open" class="mobile-menu__inner mobile-menu__submenu" style="padding-top: 80px">
          <button class="mobile-menu__back" @click="submenu.open = false"></button>
          <div class="container">
            <div class="row">
              <div class="col-12" style="padding: 0 40px">
                <div class="mobile-menu__menu">
                  <nav>
                    <ul>
                      <li v-for="(link, index) in submenu.menu" :key="'mobile-submenu-link' + index">
                        <a :href="link.link">{{link.name}}</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="mobile-menu__lang">
        <button @click.prevent="changeLang()">
          <img :src="$i18n.locale === 'ru' ? images.engLangIcon : images.rusLangIcon" width="35" height="35" alt="">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import logo from '@/assets/img/ui/logo.svg'
  import rusLangIcon from '@/assets/img/ui/ru-lang.svg'
  import engLangIcon from '@/assets/img/ui/en-lang.svg'
  import {mapGetters, mapActions} from 'vuex'
  import axios from 'axios'
  import {setIsUserAuth} from "../helpers/defaultValues";

  export default {
    name: "Header",
    data() {
      return {
        images: {
          logo,
          rusLangIcon,
          engLangIcon
        },
        mobileOpen: false,
        headerMenu: [],
        accountMenuOpen: false,
        submenu: {
          open: false,
          menu: [],
        },
        body: document.querySelector('body')

      }
    },

    computed: {
      ...mapGetters(["user"]),
    },
    methods: {
      ...mapActions({
        stateLogOut: "logout"
      }),
      changeLang() {
        const currentLang = this.$cookies.get('lang');
        this.$cookies.set('lang', currentLang === 'ru' ? 'en' : 'ru');
        localStorage.clear();
        location.reload();
      },
      linkClick(path) {
        this.$router.push(path);
        this.mobileOpen = false;
        this.accountMenuOpen = false;
        this.body.classList.remove('overflow_hidden')

      },
      openAccountMenu() {
        if (!this.user.id && this.$route.name !== 'LogIn') {
          this.$router.push({name: 'LogIn'})
        } else if (this.user.id) {
          if (this.$refs.accountMenu) {
            this.$refs.accountMenu.style.width = (this.$refs.accountButton.offsetWidth - 2) + 'px'
          }
          this.accountMenuOpen = !this.accountMenuOpen;
        }
      },
      hamburgerClick() {
        this.mobileOpen = !this.mobileOpen
        if (this.mobileOpen) {
          this.$refs.mobileMenu.style.paddingTop = this.$refs.header.offsetHeight + 'px'
          this.body.classList.add('overflow_hidden')
        } else {
          this.$refs.mobileMenu.removeAttribute('style')
          this.body.classList.remove('overflow_hidden')
        }
      },
      afterOpen(object) {
        const el = object.vm.$el;
        const accContent = el.querySelector('.accordion__content');
        const accTitle = el.querySelector('.accordion__title');
        accTitle.classList.toggle('open')
        accContent.style.maxHeight ?
          accContent.removeAttribute('style')
          : accContent.style.maxHeight = accContent.scrollHeight + "px";
      },
      logout() {
        this.mobileOpen = false;
        this.accountMenuOpen = false;
        this.body.classList.remove('overflow_hidden')
        setIsUserAuth(false)
        this.stateLogOut()
          .then(() => {
            if (this.$route.path !== '/') {
              this.$router.push('/')
            } else {
              this.$router.go(0);
            }
          })
      },
      submenuOpen(submenu) {
        this.submenu.open = true
        this.submenu.menu = submenu
      }
    },
    created() {
      axios
        .get('/api/menu/')
        .then(res => {
          if (res.data.status === 'ok') {
            this.headerMenu = res.data.items;
            this.$emit('loaded')
          }
          if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_MODE === 'test') console.log(res)
        })
    }
  }
</script>

<style lang="scss">
  .header__social{
    ul{
      padding: 0;
      list-style: none;
      display: flex;
      margin: 0 20px 0 0;

      li{
        &:not(:last-child){
          margin-right: 10px;
        }
        a{
          display: block;
          width: 25px;
          height: 25px;
          text-decoration: none;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          &.inst{
            background-image: url(~@/assets/img/ui/instagram.svg);
          }
          &.vk{
            background-image: url(~@/assets/img/ui/vk.svg);
          }
          &.fb{
            background-image: url(~@/assets/img/ui/facebook.svg);
          }
        }
      }
    }
  }
  .slide-enter-active {
    transition: transform .5s ease-in-out;
  }

  .slide-leave-active {
    transition: transform .5s ease-in-out;
  }

  .slide-enter, .slide-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */
  {
    transform: translateX(100%);
  }

  .mobile-menu {
    &__parent {
      .dropdown{
        display: none;
      }
    }

    &__back {
      width: 40px;
      height: 40px;
      background-color: transparent;
      background-image: url(~@/assets/img/ui/arrow_white.svg);
      background-position: center;
      background-size: 10px;
      background-repeat: no-repeat;
      transform: rotate(180deg);
      border: none;
      outline: none;
    }

    &__submenu {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: $accent-color;
      color: white;
    }

    &.static {
      .mobile-menu__submenu {
        transform: translateX(100%);
        transition: transform .5s ease-in-out;

        &.active {
          transform: translateX(0);
        }
      }
    }
  }
</style>