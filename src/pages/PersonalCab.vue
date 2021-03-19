<template>
  <section class="personal-cab">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__title">
            <h1>Личный кабинет</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="personal-cab__content-block">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </section>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "PersonalCab",
    methods: {
      ...mapActions(['fetchUser'])
    },
    computed: {
      ...mapGetters(['user'])
    },
  };
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
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
  }
</style>