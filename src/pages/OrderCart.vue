<template>
  <div class="personal-cab__user-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__user-data">
            <div class="personal-cab__subtitle">
              Выберите формат и даты участия в конгрессе:
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="order-cart__form form">
      <form action="#" @submit.prevent="">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <Loader v-if="isLoading"/>
              <div v-else-if="placeholder" class="order-cart__placeholder">
                <p>
                  Функционал покупки появится в ближайшее время
                </p>
                <button type="button" class="button button_yellow" @click="$router.go(-1)">Вернуться назад</button>
              </div>
              <div v-else class="order-cart__dates">
                <orders-list/>
              </div>
              <countdown v-if="!placeholder && !isLoading" :end-time="new Date(2021, 2, 31).getTime()" class="order-cart__countdown">
                <template
                        v-slot:process="{ timeObj }">

                  <span>Скидка действует при оплате до 31 марта 2021 г. До повышения стомости осталось <b> {{timeObj.d}} дней {{timeObj.h}} часов {{timeObj.m}} минуты</b></span>
                </template>
              </countdown>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div v-if="!placeholder && !isLoading" class="order__price">
      ИТОГО: <b>{{totalPrice}}</b>
    </div>
  </div>
</template>

<script>
  import Loader from "../components/UI/Loader";
  import OrdersList from "../components/PersonalCab/OrderCart/OrdersList";
  import {mapActions, mapGetters} from "vuex";


  export default {
    name: "OrderCart",
    components: { OrdersList, Loader},
    data() {
      return {
        isLoading: true,
        countDate: new Date(2021, 2, 31).getTime(),
        placeholder: true
      };
    },
    computed: {
      ...mapGetters(["userCart"]),
      totalPrice() {

        return this.userCart.reduce((acc, product) => acc + product.price, 0)

      }
    },
    methods: {
      ...mapActions(["fetchProducts"])
    },
    created() {
      this.fetchProducts()
        .then(res => {
          if (res == 'ok') {
            this.isLoading = false
          }
        })
    }
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
      color: #000000;
      margin-bottom: 40px;
    }

    &__content {
      &-block {
        width: 100%;
        background: white;
        padding-top: 45px;
        padding-bottom: 110px;
        margin-bottom: 35px;
      }
    }

  }


  .order-cart {
    &__placeholder{
      margin: 0 auto;
      padding: 20px;
      max-width: 540px;
      text-align: center;
    }
    &__form {
      width: 100%;
      border: none;
      box-shadow: none;
      /*max-width: none;*/
      form {
        max-width: none;
      }
    }

    &__countdown {
      border: 1px solid #CC1E1E;
      background: transparent;
      border-radius: 10px;
      padding: 10px;
      text-align: center;
      display: block;
      color: #CC1E1E;
      margin-bottom: 20px;
      @media screen and (min-width: $lg-width) {
        margin-bottom: 40px;
      }
    }

    &__dates {
      width: 100%;
      margin-bottom: 30px;
      @media screen and (min-width: $lg-width) {
        margin-bottom: 50px;
      }
    }
  }

  .order__price {
    padding: 15px 105px;
    background-color: #F4F9FF;
    margin-top: 40px;
    @media screen and (min-width: $lg-width) {
      margin-top: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>