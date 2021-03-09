<template>
  <li class="payed-order__item order">
    <div class="order__text">
<!--      <p>Online доступ к фигне - <b>18 июня</b></p>-->
      <slot/>
    </div>
    <div class="order__button">
      <button class="order__btn" :class="buttonClass">{{buttonText}}</button>
    </div>
  </li>
</template>

<script>
  export default {
    name: "PayedOrderItem",
    props:['buttonClass', 'buttonText']
  }
</script>

<style scoped>

</style>