<template>
  <div id="app-one" v-show="!isLoading" >
    <Header @loaded="isLoading = false"/>
    <main>
      <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<script>

  import {mapActions} from "vuex";
  import Header from "./components/Header";
  import Footer from "./components/Footer";

  export default {
    name: "app",
    components: {Footer, Header},
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
