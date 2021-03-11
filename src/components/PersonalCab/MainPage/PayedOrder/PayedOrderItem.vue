<template>
  <li class="payed-order__item order">
    <div class="order__text">
<!--      <p>Online доступ к фигне - <b>18 июня</b></p>-->
      <slot/>
    </div>
    <div class="order__button">
      <button class="order__btn" :class="buttonClass" :disabled="!buttonActive">{{buttonText}}</button>
    </div>
  </li>
</template>

<script>
  export default {
    name: "PayedOrderItem",
    props:['buttonClass', 'buttonText', 'buttonActive']
  }
</script>

<style lang="scss" scoped>
  .order__btn[disabled]{
    background: #EDEDED;
    border-color: #EDEDED;
    cursor: not-allowed;
    color: $light-text-color;
  }
</style>