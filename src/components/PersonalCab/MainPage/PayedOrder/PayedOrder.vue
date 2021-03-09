<template>
  <div class="payed-order__list">
    <ul>
      <PayedOrderItem button-class="prev" button-text="Видеозапись">
        <p>Online доступ к фигне - <b>18 июня</b></p>
      </PayedOrderItem>
      <PayedOrderItem button-class="today" button-text="Перейти к трансляции">
        <p>Online доступ к фигне - <b>19 июня</b></p>
      </PayedOrderItem>
      <PayedOrderItem button-class="next" button-text="Видеозапись">
        <p>Online доступ к фигне - <b>21 июня</b></p>
      </PayedOrderItem>
    </ul>
  </div>
</template>

<script>

  import PayedOrderItem from "./PayedOrderItem";

  export default {
    name: "PayedOrder",
    components: {PayedOrderItem}

  }
</script>

<style scoped>

</style>