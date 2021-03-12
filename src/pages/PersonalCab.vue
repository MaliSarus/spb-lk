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
      <router-view/>
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

<style lang="scss">
</style>