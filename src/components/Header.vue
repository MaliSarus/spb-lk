<template>
  <div class="header-wrapper">
    <header class="header" ref="header">
      <div class="header__wrapper">
        <router-link to="/" class="header__logo">
          <img :src="images.logo" alt="">
        </router-link>
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
            <button class="header__account-button account-button_login" >{{user.name ? user.name : 'Личный кабинет'}}</button>
            <div class="header__account-menu">
              <ul>
                <li>
                  <router-link to="/">Учетные данные</router-link>
                </li>
                <li><a href="#">Оформить участие</a></li>
                <li><a href="#">Выход</a></li>
              </ul>
            </div>
          </div>
          <div class="header__lang">
            <a href="#">
              <img :src="images.rusLangIcon" width="35" height="35" alt="">
            </a>
          </div>
        </div>
        <div class="header__mobile-control d-xl-none">
          <button class="hamburger hamburger--squeeze header__hamburger" type="button" @click="hamburgerClick()">
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
            <div class="col-12">
              <v-collapse-group :onlyOneActive="true" class="accordion mobile-menu__accordion">
                <v-collapse-wrapper @onStatusChange="afterOpen" class="accordion__item">
                  <div class="accordion__title button button_yellow" v-collapse-toggle>
                    Меню
                  </div>
                  <div class="my-content accordion__content" v-collapse-content>
                    <div class="accordion__inner-content">
                      <div class="accordion__content-wrapper">
                        <nav>
                          <ul>
                            <li v-for="(link, index) in headerMenu" :key="'mobile-link_' + index">
                              <a :href="link.link">{{link.name}}</a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </v-collapse-wrapper>
                <v-collapse-wrapper @onStatusChange="afterOpen" class="accordion__item">
                  <div class="accordion__title button button_yellow" v-collapse-toggle>
                    {{user.name ? user.name : 'Личный кабинет'}}
                  </div>
                  <div class="my-content accordion__content" v-collapse-content>
                    <div class="accordion__inner-content">
                      <div class="accordion__content-wrapper">
                        <nav>
                          <ul>
                            <li><a href="/front/">Учетные данные</a></li>
                            <li><a href="#">Оформить участие</a></li>
                            <li><a href="#">Мои заказы</a></li>
                            <li><a href="#">Выход</a></li>
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
          <a href="#">
            <img :src="images.rusLangIcon" width="35" height="35" alt="">
          </a>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import logo from '@/assets/img/ui/logo.svg'
  import rusLangIcon from '@/assets/img/ui/rus-lang.svg'
  import {mapGetters} from 'vuex'
  import axios from 'axios'

  export default {
    name: "Header",
    data() {
      return {
        images: {
          logo,
          rusLangIcon
        },
        mobileOpen: false,
        headerMenu: [],
      }
    },

    computed: {
      ...mapGetters(["user"]),
    },
    methods: {
      hamburgerClick() {
        this.mobileOpen = !this.mobileOpen
        if (this.mobileOpen) {
          this.$refs.mobileMenu.style.paddingTop = this.$refs.header.offsetHeight + 'px'
        } else {
          this.$refs.mobileMenu.removeAttribute('style')
        }
      },
      afterOpen(object) {
        console.log(object)
        const el = object.vm.$el;
        const accContent = el.querySelector('.accordion__content');
        accContent.style.maxHeight ?
          accContent.removeAttribute('style')
          : accContent.style.maxHeight = accContent.scrollHeight + "px";
      }
    },
    created() {
      axios
        .get('/api/menu/')
        .then(res => {
          if (res.data.status === 'ok') {
            this.headerMenu = res.data.items;
          }
          console.log(res)
        })
    }
  }
</script>

<style lang="scss" scoped>

</style>