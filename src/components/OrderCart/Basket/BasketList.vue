<template>
  <ul class="basket__list">
    <BasketItem v-for="order in orders" :key="'order'+order.id" :order="order"/>
  </ul>
</template>

<script>
  import BasketItem from "./BasketItem";

  export default {
    name: "BasketList",
    components: {BasketItem},
    props: ['orders']
  }
</script>

<style lang="scss" scoped>
  .basket {
    &__list {
      margin: 0;
      padding: 0;
    }

    &__item {
      list-style: none;
      &:nth-child(odd) {
        background: #F4F9FF;
      }

      &:nth-child(even) {
        background: white;
      }
    }
  }
</style>