<template>
  <div class="header-wrapper">
    <header class="header" ref="header">
      <div class="header__wrapper">
        <a href="/" class="header__logo">
          <img :src="images.logo" alt="">
        </a>
        <div class="header__menu">
          <nav>
            <ul>
              <li v-for="(link, index) in headerMenu" :key="'header-link_' + index">
                <a :href="link.link">{{link.name}}</a>
                <div class="dropdown" v-if="link.drop">
                  <ul>
                    <li v-for="(dropdownItem, index) in link.drop" :key="'header-dropdown'+ index">
                      <a href="#">{{dropdownItem.name}}</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div class="header__controls">
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
              <img :src="$i18n.locale === 'ru' ? images.rusLangIcon : images.engLangIcon" width="35" height="35" alt="">
            </button>
          </div>
        </div>
        <div class="header__mobile-control d-xl-none">
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
      <div class="mobile-menu__inner">
        <div class="container">
          <div class="row">
            <div class="col-12" style="padding: 0 40px">
              <div class="mobile-menu__menu">
                <nav>
                  <ul>
                    <li v-for="(link, index) in headerMenu" :key="'mobile-link_' + index">
                      <a :href="link.link">{{link.name}}</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <v-collapse-group :onlyOneActive="true" class="accordion mobile-menu__accordion">
                <v-collapse-wrapper @onStatusChange="afterOpen" class="accordion__item">
                  <div class="accordion__title button button_yellow" v-collapse-toggle>
                    {{user.name ? user.name : $t('message.header.noname')}}
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
            </div>
          </div>
        </div>
        <div class="mobile-menu__lang">
          <button @click.prevent="changeLang()">
            <img :src="$i18n.locale === 'ru' ? images.rusLangIcon : images.engLangIcon" width="35" height="35" alt="">
          </button>
        </div>
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

                location.reload();
            },
            linkClick(path) {
                this.$router.push(path);
                this.mobileOpen = false;
                this.accountMenuOpen = false;

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
                const body = document.querySelector('body')
                if (this.mobileOpen) {
                    this.$refs.mobileMenu.style.paddingTop = this.$refs.header.offsetHeight + 'px'
                    body.classList.add('overflow_hidden')
                } else {
                    this.$refs.mobileMenu.removeAttribute('style')
                    body.classList.remove('overflow_hidden')
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
                this.stateLogOut()
                    .then(() => {
                        if (this.$route.path !== '/') {
                            this.$router.push('/')
                        } else {
                            this.$router.go(0);
                        }
                    })
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
                    console.log(res)
                })
        }
    }
</script>

<style lang="scss" scoped>
</style>