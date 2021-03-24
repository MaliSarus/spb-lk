<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <BasketList :orders="userBasket"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {baseURL} from "../../../helpers/defaultValues";


  import BasketList from "../Basket/BasketList";
  import axios from "axios";

  export default {
    name: "OrderCartBasket",
    components: {
      BasketList,
    },
    data(){
      return{
        baseURL
      }
    },
    methods: {
      makeorder() {
        axios
          .post('/api/makeorder/')
          .then(console.log)
      }
    },
    computed: {
      ...mapGetters(["userBasket"]),

    }
  }
</script>

<style scoped>

</style>