<template>
  <div class="payed-order__list">
    <ul>
      <PayedOrderItem v-for="order in payedOrders"
                      button-class="prev"
                      :button-text="order.text"
                      :key="order.id"
                      :button-active="order.activated"
      >
        <p>{{order.name}}</p>
      </PayedOrderItem>
<!--      <PayedOrderItem button-class="prev" button-text="Видеозапись">-->
<!--        <p>Online доступ к фигне - <b>18 июня</b></p>-->
<!--      </PayedOrderItem>-->
<!--      <PayedOrderItem button-class="today" button-text="Перейти к трансляции">-->
<!--        <p>Online доступ к фигне - <b>19 июня</b></p>-->
<!--      </PayedOrderItem>-->
<!--      <PayedOrderItem button-class="next" button-text="Видеозапись">-->
<!--        <p>Online доступ к фигне - <b>21 июня</b></p>-->
<!--      </PayedOrderItem>-->
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

<style scoped>

</style>