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
      <div class="row">
        <div class="col-12">
          <div class="order-cart__form form">
            <form action="#" @submit.prevent="">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <Loader v-if="isLoading"/>
                    <div v-else class="personal-cab__dates">
                      <orders-list :dates="dates" v-model="selectedDates"/>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="order__price">ИТОГО: {{totalPrice}}</div>
  </div>
</template>

<script>
  import axios from "axios";
  import {baseURL} from "@/helpers/defaultValues";
  import Loader from "../components/UI/Loader";
  import OrdersList from "../components/PersonalCab/OrderCart/OrdersList";

  export default {
    name: "OrderCart",
    components: {OrdersList, Loader},
    data() {
      return {
        isLoading: true,
        dates: [],
        selectedDates:[],
      };
    },
    computed:{
      totalPrice(){
        if (this.selectedDates.length){
          return this.selectedDates.reduce((acc, date)=>acc + date.price,0)
        }
        else{
          return 0
        }
      }
    },
    mounted() {
      axios
        .get(baseURL + '/api/catalog/items/')
        .then(res => {
          if (res.data.status === 'ok') {
            this.dates = res.data.sections;
            this.isLoading = false;
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

    &__dates {
    }
  }



  .order-cart__form {
    width: 100%;
    border: none;
    box-shadow: none;
    max-width: none;
  }

  .order__price{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px 105px;
    background-color: #F4F9FF;
  }
</style>