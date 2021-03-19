<template>
  <div class="form form__error">
    <div class="form__title">404</div>
    <p>Ошибка
      Неправильно набран адрес, или такой страницы на сайте больше не существует.</p>
    <a href="/" class="button button_yellow error__button">Вернуться на главную страницу</a>
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
    text-align: center;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    @media screen and (min-width: $sm-width){
      flex-grow: unset;
      display: block;
      border-radius: 10px;
      border: 1px solid #A8BBD3;
      box-shadow: 0px 0px 30px 30px rgb(0 0 0 / 5%);
      max-width: 540px;
    }
  }

  .form__title {
    font-size: 120px;
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .error__button {
    width: 100%;
    text-decoration: none;
    text-transform: none;
  }
</style>