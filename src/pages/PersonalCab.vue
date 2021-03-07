<template>
  <section class="personal-cab">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__title">
            <h1>Личный кабинет</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="personal-cab__content-block">

      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="personal-cab__payed payed-order">
              <div class="payed-order__title">
                Оплаченные заказы
              </div>
              <div class="payed-order__list">
                <ul>
                  <li class="payed-order__item order">
                    <div class="order__text">
                      <p>Online доступ к фигне - <b>18 июня</b></p>
                    </div>
                    <div class="order__button">
                      <button class="order__btn prev">Видеозапись</button>
                    </div>
                  </li>
                  <li class="payed-order__item order">
                    <div class="order__text">
                      <p>Online доступ к фигне - <b>18 июня</b></p>
                    </div>
                    <div class="order__button">
                      <button class="order__btn today">Перейти к трансляции</button>
                    </div>
                  </li>
                  <li class="payed-order__item order">
                    <div class="order__text">
                      <p>Online доступ к фигне - <b>18 июня</b></p>
                    </div>
                    <div class="order__button">
                      <button class="order__btn next">Перейти к трансляции</button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>


  export default {
    name: "PersonalCab",
  };
</script>

<style lang="scss" scoped>
  .personal-cab {
    flex-grow: 1;
    width: 100%;

    &__title {
      padding-top: 20px;
      padding-bottom: 25px;
      text-align: center;

      h1 {
        margin: 0;
        font-weight: bold;
        font-size: 48px;
        line-height: 56px;
        text-align: center;
        color: $accent-color;
      }
    }

    &__subtitle {
      font-size: 32px;
      line-height: 37px;
      text-align: center;
      color: black;
      margin-bottom: 40px;
    }

    &__content {
      &-block {
        width: calc(100% - 20px);
        background: white;
        padding-top: 45px;
        padding-bottom: 110px;
        margin: 0 auto 35px;
        border: 1px solid #EDEDED;
      }
    }
  }

  .payed-order{
    &__title{
      font-size: 24px;
      line-height: 28px;
      text-align: center;
      margin-bottom: 15px;
      @media screen and (min-width: $lg-width){
        margin-bottom: 20px;
        font-size: 32px;
        line-height: 37px;
      }
    }
    &__list{
      ul{
        margin: 0;
        padding: 0;
        border: 1px solid #F4F9FF;
        li{
          padding: 5px 30px 5px 15px;

          &:nth-child(odd){
            background: #F4F9FF;
          }
          &:nth-child(even){
            background: white;
          }
        }
      }
    }
    &__item{
      display: flex;
      align-items: center;
    }
  }

  .order{
    &__text{
      flex-grow: 1;
      p{
        margin: 0;
        font-size: 14px;
        line-height: 16px;
        @media screen and (min-width: $lg-width){
          font-size: 16px;
          line-height: 19px;
        }
      }
    }
    &__button{
      min-width: 230px;
      max-width: 250px;
    }
    &__btn{
      width: 100%;
      padding: 5px 35px 5px 10px;
      border: 1px solid;
      border-radius: 2px;
      font-size: 14px;
      line-height: 16px;
      text-align: left;
      background: white;

      @media screen and (min-width: $lg-width){
        font-size: 16px;
        line-height: 19px;
      }
      &.prev{
        color: $accent-color;
      }
      &.today{
        color: #282828;
        background: $yellow-color;
        border-color: $yellow-color;
      }
      &.next{
        background: #EDEDED;
        border-color: #EDEDED;
        color: $light-text-color;
      }
    }
  }
</style>