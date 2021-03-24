<template>
  <li class="basket__item">
    <div class="basket__name">{{order.section ? order.name + ' -' : order.name}} <b>{{order.section}}</b></div>
    <div class="basket__price">{{order.price}}&#8381;</div>
  </li>
</template>

<script>
  export default {
    name: "BasketItem",
    props:['order']
  }
</script>

<style lang="scss" scoped>
  .basket{
    &__item{
      display: flex;
      color: $main-text-color;
      font-size: 14px;
      line-height: 16px;
      padding: 15px;
      @media screen and (min-width: $lg-width){
        font-size: 16px;
        line-height: 19px;
      }
    }
    &__name{
      flex-grow: 1;
    }
  }
</style>