<template>
  <ul>
    <additional-services-item v-for="workshop in workshops" :workshop="workshop" :key="workshop.id"/>
  </ul>
</template>

<script>
  import axios from 'axios'
  import AdditionalServicesItem from "./AdditionalServicesItem";

  export default {
    name: "AdditionalServicesList",
    components: {AdditionalServicesItem},
    data(){
      return{
        workshops:[]
      }
    },
    created() {
      axios
        .get('/api/catalog/workshops/')
        .then(res=>{
          if (res.data.status === "ok"){
            this.workshops = res.data.items;
          }
        })
    }
  }
</script>

<style lang="scss" scoped>
  ul{
    margin: 0;
    padding: 0;
  }

</style>