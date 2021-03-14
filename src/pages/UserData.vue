<template>
  <div class="personal-cab__user-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__user-data">
            <div class="personal-cab__subtitle">
              Персональная информация
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="user-data__form form">
            <UserDataForm/>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import UserDataForm from "../components/PersonalCab/UserData/UserDataForm/UserDataForm";
  export default {
    name: "UserData",
    components:{
      UserDataForm
    }
  }
</script>

<style lang="scss" >
  hr {
    margin: 15px 0;
    border: none;
    border-top: 1px solid #e1e1e1;
    @media screen and (min-width: $lg-width) {
      margin: 20px 0;
    }
  }

  .user-data {
    &__verify {
      position: relative;
      background: #F1FFEB;
      border-radius: 2px;
      font-size: 14px;
      line-height: 16px;
      padding: 20px 15px 20px 70px;
      color: #375B28;
      margin-bottom: 15px;

      &::before {
        position: absolute;
        left: 15px;
        top: 50%;
        display: block;
        content: '';
        width: 35px;
        height: 35px;
        background-position: 0 0;
        background-repeat: no-repeat;
        transform: translateY(-50%);
      }
    }

    &__verify-no {
      position: relative;
      background: #FFF6F4;
      border-radius: 2px;
      font-size: 14px;
      line-height: 16px;
      padding: 15px;
      color: #975858;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;

      p {
        margin: 0;
        margin-bottom: 10px;
      }

      .form__submit {
        text-decoration: none;
        display: inline-block;
        margin: 0 auto;
        width: auto;
      }
    }

    &__verify-check {
      margin-bottom: 15px;

      label {
        font-size: 14px !important;
        line-height: 16px !important;
        color: $main-text-color !important;
      }
    }

    &__rename {
      position: absolute;
      right: 0;
      top: 50%;
      width: 18px;
      height: 18px;
      transform: translateY(-50%);
      border: none;
    }

    &__name {
      position: relative;
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
      color: $accent-color;
      padding-right: 18px;

      @media screen and (min-width: $lg-width) {
        font-size: 24px;
        line-height: 28px;
      }
    }

    &__form {
      display: flex;
      justify-content: center;
      width: 100%;
      max-width: none;
      border-radius: 0;
      border: none;
      box-shadow: none;

      form {
        width: 100%;
        max-width: 540px;
      }
    }

    &__form-grid {
      display: grid;
      grid-template-rows: 1fr;
      align-items: center;
      row-gap: 10px;
      @media screen and (min-width: $lg-width) {
        grid-template-columns: 120px 1fr;
        gap: 15px 20px;
      }

      label {

        font-size: 14px;
        line-height: 16px;
        color: #282828;
        @media screen and (min-width: $lg-width) {
          grid-column: 1 / 2;

        }
      }

      .form__input {
        margin-bottom: 5px;
        @media screen and (min-width: $lg-width) {
          grid-column: 2 / 3;

        }
      }

    }

    &__controls {
      margin-top: 15px;
      @media screen and (min-width: $lg-width) {
        margin-top: 20px;
      }
    }

    &__submit, &__pass {
      padding: 8px;
      width: 100%;
    }

    &__submit {
      padding-left: 35px;
      padding-right: 35px;
      background-position: calc(100% - 35px) center;
      background-repeat: no-repeat;
    }
  }

  .user-data__rename-tooltip{
      display: block !important;
      z-index: 10000;
      max-width: 350px;
  }
  .tooltip {

    &-header {
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: $accent-color;
      margin-bottom: 20px;
    }

    &-body {
      font-size: 14px;
      line-height: 16px;
      color: $light-text-color;
      margin-bottom: 20px;
    }

    &-button {
      width: 100%;
      padding: 8px;
      font-size: 14px;
      line-height: 16px;
    }
  }
</style>