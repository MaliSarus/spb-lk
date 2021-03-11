<template>
  <div id="app-one">
    <router-view/>
  </div>
</template>

<script>
  import {mapActions} from "vuex";
  export default {
    methods:{
      ...mapActions(['fetchCountries','fetchDepartments','fetchRanks', 'fetchDegrees', 'fetchCities']),
      initFetch() {
        this.fetchCountries();
        this.fetchDepartments();
        this.fetchRanks();
        this.fetchDegrees();
        this.fetchCities();
      },
    },
    created() {
      this.initFetch();
    }
  }
</script>

<style lang="scss" scoped>
  #app-one {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-direction: column;
  }
</style>
