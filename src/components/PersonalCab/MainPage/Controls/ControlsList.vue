<template>
  <div class="control__list d-flex flex-wrap">
    <ControlItem :icon-src="images.userIcon"  :to="{name: 'UserData'}">
      <template v-slot:control-title>
        Личные данные
      </template>
      <template v-slot:control-text>
        Просмотреть / изменить персональные данные, пройти верификацию
      </template>
    </ControlItem>

    <ControlItem :icon-src="images.orderIcon" :to="{name: 'OrderCart'}">
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
    import userIcon from "@/assets/img/ui/user-icon.svg"
    import orderIcon from "@/assets/img/ui/order-icon.svg"

    export default {
        name: "Controls",
        components: {ControlItem},
        data() {
            return{
                images:{
                    userIcon,
                    orderIcon,
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  .control {
    &__list {
      margin: -10px 0;
      @media screen and (min-width: $md-width) {
        margin: 0 -15px;
      }
      @media screen and (min-width: $lg-width) {
        margin: 0 -30px;
      }
    }


  }


</style>