<template>
  <div class="personal-cab__controls">
    <ControlItem icon-src="/assets/img/ui/user-icon.svg" :to="{name: 'UserData'}">
      <template v-slot:control-title>
        Личные данные
      </template>
      <template v-slot:control-text>
        Просмотреть / изменить персональные данные, пройти верификацию
      </template>
    </ControlItem>

    <ControlItem icon-src="/assets/img/ui/order-icon.svg" :to="{name: 'Order'}">
      <template v-slot:control-title>
        Оформление, заказ услуг
      </template>
      <template v-slot:control-text>
        Выбрать даты, формат участия в конгрессе, а также заказать дополнительные услуги
      </template>
    </ControlItem>
  </div>

</template>

<script>
  import ControlItem from "./ControlItem";
  export default {
    name: "Controls",
    components: {ControlItem}
  }
</script>

<style scoped>

</style>