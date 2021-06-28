<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <BasketList :orders="userBasket"/>
        <div class="row">
          <div class="col-12 col-sm-8 col-lg-6 offset-sm-2 offset-lg-3 coupon-wrapper">
            <p v-if="!user.coupon" class="coupon-info">Промокод предоставляет скидку на участие в конгрессе, на дополнительные услуги скидка <b>НЕ</b> предоставляется.</p>
            <div v-if="!user.coupon" class="coupon" :class="{
              invalid: isDiscountWasError,
              valid: isDiscountWasSuccess,
            }">
              <input type="text" v-model="coupon" :placeholder="$t('message.orderCart.orderCartBasket.coupon.placeholder')" :readonly="couponUpload">
              <button v-if="!couponUpload" type="button" class="button button_yellow" @click="checkDiscount">{{$t('message.orderCart.orderCartBasket.coupon.submit')}}</button>
              <button v-if="couponUpload" type="button" class="button button_yellow" @click="deleteCoupon">{{$t('message.orderCart.orderCartBasket.coupon.delete')}}</button>
            </div>
            <small style="color: red; padding: 10px;" v-if="isDiscountWasError">{{$t('message.orderCart.orderCartBasket.coupon.error')}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {baseURL} from "../../../helpers/defaultValues";


  import BasketList from "../Basket/BasketList";
  import axios from "axios";

  export default {
    name: "OrderCartBasket",
    props:['discount'],
    components: {
      BasketList,
    },
    data(){
      return{
        baseURL,
        coupon: '',
        discountSuccess: false,
        discountError: false,
        couponUpload: false
      }
    },
    methods: {
      makeorder() {
        axios
          .post('/api/makeorder/')
          .then((res)=>{
            if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_MODE === 'test') console.log(res)
          })
      },
      checkDiscount(){
        if (this.coupon) {
          axios
            .post('/api/coupon/', {
              coupon: this.coupon
            })
            .then(res => {
              if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_MODE === 'test') console.log(res)
              const saleAmount = res.data.saleAmount;
              if (saleAmount !== 0) {
                this.$emit('update:discount', res.data.discountPrice);
                this.couponUpload = true;
                this.discountSuccess = true;
              } else {
                this.discountError = true;
                this.couponUpload = true;
                this.discountError = true;
              }
            })
        }
      },
      deleteCoupon(){
        this.coupon = '';
        this.couponUpload = false;
        this.discountSuccess = false;
        this.discountError = false;
        this.$emit('update:discount',0);
        axios
          .post('/api/coupon/')
        .then((res) => {
          if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_MODE === 'test') console.log(res)
        })
      }
    },
    computed: {
      ...mapGetters(["userBasket", "user"]),
      isDiscountWasSuccess(){
        return !this.discountError && this.discountSuccess
      },
      isDiscountWasError(){
        return this.discountError && !this.discountSuccess
      }
    },
    mounted() {
      if (this.user.coupon){
        this.coupon = this.user.coupon;
        this.checkDiscount()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .coupon{
    background: #F4F9FF;
    border: 1px solid #F3F3F3;
    box-sizing: border-box;
    border-radius: 2px;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    &-wrapper{
      margin-top: 40px;
    }
    &-info{
      text-align: center;
      color: $main-text-color;
      margin-top: 0;
      font-size: 14px;

    }
    &.valid{
      border-color: #375B28;
      input{
        color: #375B28;
      }
    }
    &.invalid{
      border-color: red;

    }
    input{
      flex-grow: 1;
      padding-left: 10px;
      border: none;
      background: transparent;
      font-size: 14px;
      line-height: 16px;
      outline: none;
    }
    button{
      padding: 8px;
      text-transform: none;
    }
  }

</style>