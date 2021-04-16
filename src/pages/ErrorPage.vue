<template>
  <div class="form form__error">
    <div class="form__title">404</div>
    <p>{{$t('message.errorPage.text')}}</p>
    <a href="/" class="button button_yellow error__button">{{$t('message.errorPage.link')}}</a>
  </div>
</template>

<script>
  import setTitle from "../helpers/title";

  export default {
    name: "ErrorPage",
    created() {
      setTitle(this.$i18n.t('message.pagesTitle.error'))
    }
  }
</script>

<style lang="scss">
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