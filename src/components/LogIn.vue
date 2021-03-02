<template>
  <div class="form form__login">
    <div class="form__title">Личный кабинет</div>
    <LogInForm/>
    <router-link tag="button" :to="{name: 'SignUp'}" class="form__button">Зарегистрироваться</router-link>
  </div>
</template>

<script>
  import LogInForm from "@/components/LogInForm/Form";


  export default {
    name: 'LogIn',
    components: {
      LogInForm,

    },
  }
</script>
<style lang="scss" scoped>
  $accent-color: #013066;
  $main-text-color: black;


  $xs-width: 0;
  $sm-width: 576px;
  $md-width: 768px;
  $lg-width: 992px;
  $xl-width: 1200px;


  $z-lowest: -1;
  $z-low: 0;
  $z-medium: 100;
  $z-high: 500;
  $z-highest: 1000;


  .form {
    padding: 38px 50px 50px;
    border: 1px solid #A8BBD3;
    box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    background: white;
    min-width: 400px;

    &__title {
      font-weight: bold;
      font-size: 36px;
      line-height: 42px;
      margin-bottom: 28px;
      text-align: center;
    }

    &__button {
      margin-top: 40px;

      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      text-align: center;
      color: white;
      background: #013066;
      border: 1px solid #F3F3F3;
      box-sizing: border-box;
      border-radius: 5px;
      padding: 15px 15px;
      width: 100%;

    }
  }


</style>

