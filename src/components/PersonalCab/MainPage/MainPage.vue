<template>
  <div class="personal-cab__main-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__payed payed-order">
            <Loader v-if="isLoading"/>
            <div v-else-if="payedOrders.length !== 0" class="personal-cab__subtitle">
              {{$t('message.mainPage.title')}}
            </div>
            <PayedOrder v-if="payedOrders.length !== 0"  :payed-orders="payedOrders"/>
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
  import PayedOrder from "./PayedOrder/PayedOrdersList";
  import Controls from "./Controls/ControlsList";
  import {mapActions, mapGetters} from 'vuex'
  import dateToDate from "@/helpers/filters";
  import Loader from "../../UI/Loader";

  export default {
    name: "MainPage",
    components: {Loader, Controls, PayedOrder},
    data() {
      return {
        isLoading: true,
      }
    },
    filters: {
      dateToDate
    },
    methods: {
      ...mapActions(['fetchPayedOrders']),
    },
    computed: {
      ...mapGetters(['payedOrders'])
    },
    created() {
      this.fetchPayedOrders()
        .then(()=> {
          this.isLoading = false
        })
    }
  }
</script>

<style scoped>

</style>