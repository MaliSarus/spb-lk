<template>
  <div class="payed-order__list">
    <ul>
      <PayedOrderItem v-for="order in payedOrders"
                      button-class="prev"
                      :button-text="order.text"
                      :key="order.id"
                      :button-active="order.activated"
      >
        <p>{{order.section_name ? order.name + ' - ' : order.name}} <b>{{order.section_name}}</b></p>
      </PayedOrderItem>
    </ul>
  </div>
</template>

<script>

  import PayedOrderItem from "./PayedOrderItem";

  export default {
    name: "PayedOrder",
    props:['payedOrders'],
    components: {PayedOrderItem}

  }
</script>

<style lang="scss" scoped>
  .payed-order {
    &__list {
      margin-bottom: 15px;
      @media screen and (min-width: $lg-width){
        margin-bottom: 40px;

      }
      ul {
        margin: 0;
        padding: 0;
        border: 1px solid #F4F9FF;

        li {

          &:nth-child(odd) {
            background: #F4F9FF;
          }

          &:nth-child(even) {
            background: white;
          }
        }
      }
    }
  }

</style>