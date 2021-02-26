<template>
  <div id="app-one">
    <div class="form">
      <div class="form__title">Личный кабинет</div>
      <LogInForm/>
      <Button class="form__button" text="Зарегистрироваться"/>
    </div>
  </div>
</template>

<script>
  import LogInForm from "@/components/LogInForm/Form";
  import Button from "@/components/LogInForm/UI/Button";

  export default {
    name: 'App',
    components: {
      LogInForm,
      Button
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

  #app-one {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
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
    }
  }



</style>

