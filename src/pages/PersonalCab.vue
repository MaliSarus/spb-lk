<template>
  <section class="personal-cab">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__title">
            <h1>{{ $t('message.personalCab.title') }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="personal-cab__content-block">
      <div class="container" v-if="$route.name !== 'MainPage'">
        <div class="row">
          <div class="col-12 position-relative">
            <button class="button button_yellow button__back" @click="$router.push(`/user/${user.id}`)"/>
          </div>
        </div>
      </div>
      <loader v-if="productsLoading || workshopsLoading"/>
      <transition v-else-if="!productsLoading && !workshopsLoading" name="fade" mode="out-in">
        <router-view :productsDone="productsDone" :workshopsDone="workshopsDone"/>
      </transition>
    </div>
  </section>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  // eslint-disable-next-line no-unused-vars
  import setTitle from "../helpers/title";
  import Loader from "../components/UI/Loader";
  import {createChecker, getChecker, destroyChecker} from '../helpers/checkAuthority'
  import {eventBus} from "../main";
  import {setIsUserAuth} from "../helpers/defaultValues";

  export default {
    name: "PersonalCab",
    components: {Loader},
    data(){
      return{
        productsLoading: true,
        workshopsLoading: true,
        productsDone: false,
        checkActivity: {},
      }
    },
    methods: {
      ...mapActions(['fetchUser', "fetchProducts", "fetchWorkshops", "logout"])
    },
    computed: {
      ...mapGetters(['user',"workshops"]),
      workshopsDone(){
        return this.workshops.length === 0
      }
    },
    created() {
      // setTitle(this.$i18n.t('message.pagesTitle.personalCab'))
      createChecker();
      this.checkActivity = getChecker();
      this.checkActivity
        .startUpdating()

      eventBus.$on('userLogout', ()=>{
        setIsUserAuth(false)
        this.logout()
          .then(() => {
              this.$router.push('/')
          })
      })

      this.fetchProducts()
        .then(res => {
          if (res === 'ok' || res === 'done') {
            this.productsLoading = false
            if (res === 'done') {
              this.productsDone = true;
            }
          }
        })
      this.fetchWorkshops()
      .then(()=>{
        this.workshopsLoading = false
      })
    },
    destroyed() {
      destroyChecker()
      delete this.checkActivity;
      eventBus.$off('userLogout')
    },
  };
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
  {
    opacity: 0;
  }

  .personal-cab__content-block {
    position: relative;
    margin: 0;
    background: white;
    padding: 20px 0;
    flex-grow: 1;
    width: 100%;
    border-top: 1px solid #EDEDED;
    border-bottom: 1px solid #EDEDED;

    @media screen and (min-width: $lg-width) {
      margin: 0 auto 35px;
      border: 1px solid #EDEDED;
      width: calc(100% - 20px);
      padding-top: 45px;
      padding-bottom: 110px;
    }

    .button__back {
      position: absolute;
      left: 15px;
      top: -20px;
      padding: 15px;
      border-radius: 100%;
      transform: translateY(-50%) rotate(180deg);
      background-image: url(~@/assets/img/ui/arrow.svg);
      background-size: 6px;
      background-position: center;
      background-repeat: no-repeat;
      @media screen and (min-width: $lg-width) {
        top: -45px;
        padding: 20px;
        background-size: 9px;
      }
    }
  }
</style>