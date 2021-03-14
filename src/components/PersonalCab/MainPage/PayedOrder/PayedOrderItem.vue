<template>
  <li class="order d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-between">
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
    props: ['buttonClass', 'buttonText', 'buttonActive']
  }
</script>

<style lang="scss" scoped>
  .order {
    padding: 5px;
    @media screen and (min-width: $lg-width) {
      padding: 5px 30px 5px 15px;

    }

    &__text {
      flex-grow: 1;
      margin-bottom: 10px;
      @media screen and (min-width: $lg-width){
        margin-bottom: 0;
      }

      p {
        margin: 0;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        @media screen and (min-width: $sm-width) {
          text-align: left;
        }
        @media screen and (min-width: $lg-width) {
          font-size: 16px;
          line-height: 19px;
        }
      }
    }

    &__button {
      width: 100%;
      @media screen and (min-width: $sm-width) {
        max-width: 250px;
      }

      &[disabled] {
        background: #EDEDED;
        border-color: #EDEDED;
        cursor: not-allowed;
        color: $light-text-color;
      }
    }

    &__btn {
      width: 100%;
      padding: 5px 35px 5px 10px;
      border: 1px solid;
      border-radius: 2px;
      font-size: 14px;
      line-height: 16px;
      text-align: left;
      background: white;

      @media screen and (min-width: $lg-width) {
        font-size: 16px;
        line-height: 19px;
      }

      &.prev {
        color: $accent-color;
      }

      &.today {
        color: #282828;
        background: $yellow-color;
        border-color: $yellow-color;
      }

      &.next {
        background: #EDEDED;
        border-color: #EDEDED;
        color: $light-text-color;
      }
    }
  }


</style>