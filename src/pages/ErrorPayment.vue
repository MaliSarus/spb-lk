<template>
  <div class="form__wrapper">
    <form action="#" class="success-form" @submit.prevent="submitSuccess">
      <div class="success-form__title">{{$t('message.payment.error.title')}}</div>
      <div class="success-form__content">
        <div class="success-form__subtitle">{{$t('message.payment.error.subtitle')}}</div>
      </div>
      <button type="submit" class="button button_yellow">{{$t('message.payment.error.link')}}</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  // eslint-disable-next-line no-unused-vars
  import setTitle from "../helpers/title";

  export default {
    name: "ErrorPayment",
    computed:{
      ...mapGetters(["user"])
    },
    methods:{
      submitSuccess(){
        this.$router.push(`/user/${this.user.id}`)
      }
    },
    // created() {
    //   setTitle(this.$i18n.t('message.pagesTitle.errorPayment'))
    // }
  }
</script>

<style lang="scss" scoped>
  .form__wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-direction: column;
  }
  .success-form {
    flex-grow: 1;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: none;
    @media screen and (min-width: $lg-width) {
      max-width: 450px;
      border-radius: 10px;
      box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.05);
      border: 1px solid #A8BBD3;
      flex-grow: unset;
      min-height: 600px;
      align-items: unset;
      justify-content: unset;
      padding: 30px 30px 45px;
    }

    &__title {
      font-weight: bold;
      font-size: 28px;
      line-height: 32px;
      text-align: center;
      margin-bottom: 30px;
      @media screen and (min-width: $lg-width) {
        font-size: 36px;
        line-height: 42px;
        margin-bottom: 10px;
      }
    }

    &__content {
      margin-bottom: 30px;
      @media screen and (min-width: $lg-width) {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      img {
        max-width: 140px;
        margin-bottom: 40px;
      }
    }

    &__subtitle, p {
      color: $light-text-color;
    }

  }

</style>