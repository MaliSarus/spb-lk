<template>
  <div class="form form__error">
    <div class="form__title">Страница не найдена</div>
    <router-link tag="button" :to="{name: 'LogIn'}" class="button button_blue error__button">Вернуться</router-link>
  </div>
</template>

<script>
  export default {
    name: "ErrorPage"
  }
</script>

<style lang="scss" scoped>
  .form__error {
    padding: 20px;
    background: white;
    border-radius: 10px;
    border: 1px solid #A8BBD3;
    box-shadow: 0px 0px 30px 30px rgb(0 0 0 / 5%);
  }
  .form__title{
    font-size: 32px;
    text-align: center;
    margin-bottom: 30px;
    font-weight: bold;
  }
  .error__button{
    width: 100%;
  }
</style>