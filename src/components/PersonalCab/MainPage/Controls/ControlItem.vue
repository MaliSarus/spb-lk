<template>
  <div class="control__item">
    <router-link :to="to" class="control__block">
      <div class="control__title">
        <slot name="control-title">Заголовок</slot>
      </div>
      <div class="control__desc">
        <div class="control__image">
          <img :src="iconSrc" alt="">
        </div>
        <div class="control__text">
          <slot name="control-text">Текст</slot>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "ControlItem",
    props:['to', 'iconSrc']
  }
</script>

<style lang="scss" scoped>
  .control{
    &__item{
      flex-basis: 100%;
      padding: 10px 0;
      @media screen and (min-width: $md-width){
        flex-basis: 50%;
        padding: 0 15px;
      }
      @media screen and (min-width: $lg-width){
        padding: 0 30px;
      }
    }
    &__block {
      display: block;
      padding: 15px 40px;
      text-decoration: none;
      background: #FFFFFF;
      border: 1px solid #EDEDED;
      border-radius: 10px;
      height: 100%;
      box-shadow: 0px 0px 20px rgba(black, 0.1);
      @media screen and (min-width: $xl-width) {
        padding: 18px 90px 50px;
      }

      &:hover {
        background: #F4F9FF;
      }
    }

    &__title {
      color: $accent-color;
      font-size: 18px;
      line-height: 22px;
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px;
      @media screen and (min-width: $lg-width) {
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 25px;
      }
    }

    &__subtitle {
      font-size: 24px;
      line-height: 28px;
      text-align: center;
      margin-bottom: 15px;
      @media screen and (min-width: $lg-width) {
        margin-bottom: 20px;
        font-size: 32px;
        line-height: 37px;
      }
    }

    &__desc {
      display: flex;
      align-items: center;
    }

    &__image {
      margin-right: 20px;
      flex-shrink: 0;
      @media screen and (min-width: $lg-width) {
        width: 75px;
      }

      img {
        width: 100%;
        object-position: center;
      }
    }

    &__text {
      font-size: 14px;
      line-height: 16px;
      color: $light-text-color;
      @media screen and (min-width: $lg-width) {
        font-size: 16px;
        line-height: 19px;
      }

    }
  }

</style>