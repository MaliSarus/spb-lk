<template>
  <div class="personal-cab__main-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__payed payed-order">
            <div class="personal-cab__subtitle">
              Оплаченные заказы
            </div>
            <PayedOrder :payed-orders="payedOrders"/>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <Controls/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import PayedOrder from "./PayedOrder/PayedOrder";
  import Controls from "./Controls/Controls";
  import {mapActions, mapGetters} from 'vuex'
  import dateToDate from "@/helpers/filters";

  export default {
    name: "MainPage",
    components: {Controls, PayedOrder},
    filters:{
      dateToDate
    },
    methods: {
      ...mapActions(['fetchPayedOrders']),
    },
    computed:{
      ...mapGetters(['payedOrders'])
    },
    created() {
      this.fetchPayedOrders();
    }
  }
</script>

<style scoped>

</style>