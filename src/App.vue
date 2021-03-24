<template>
  <div id="app-one" >
    <Header  v-show="!isLoading" @loaded="isLoading = false"/>
    <main>
      <loader v-if="isLoading"/>
      <router-view v-else/>
    </main>
    <Footer v-show="!isLoading"/>
  </div>
</template>

<script>

  import {mapActions} from "vuex";
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  import Loader from "./components/UI/Loader";

  export default {
    name: "app",
    components: {Loader, Footer, Header},
    data(){
      return{
        isLoading: true
      }
    },
    methods: {
      ...mapActions(['fetchCountries', 'fetchDepartments', 'fetchRanks', 'fetchDegrees', 'fetchCities']),
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
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-direction: column;
  }
</style>
