<template>
  <div class="control__list d-flex flex-wrap">
    <ControlItem :icon-src="images.userIcon"  :to="{name: 'UserData'}">
      <template v-slot:control-title>
        {{$t('message.mainPage.controls.userData.title')}}
      </template>
      <template v-slot:control-text>
        {{$t('message.mainPage.controls.userData.text')}}
      </template>
    </ControlItem>

    <ControlItem :icon-src="images.orderIcon" :to="{name: 'OrderCart'}">
      <template v-slot:control-title>
        {{$t('message.mainPage.controls.orderCart.title')}}
      </template>
      <template v-slot:control-text>
        {{$t('message.mainPage.controls.orderCart.text')}}
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