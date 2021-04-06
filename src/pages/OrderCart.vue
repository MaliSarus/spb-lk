<template>
  <div class="personal-cab__user-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__user-data">
            <div class="personal-cab__subtitle">
              {{pageTitle[page - 1]}}
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
              <div v-if="placeholder" class="order-cart__placeholder">
                <p>
                  {{$t('message.orderCart.placeholder.text')}}
                </p>
                <button type="button" class="button button_yellow" @click="$router.go(-1)">
                  {{$t('message.orderCart.placeholder.link')}}
                </button>
              </div>
            </div>
          </div>
        </div>
        <keep-alive>
          <component v-if="!placeholder" :is="pages[page-1]" :workshopsDone="$attrs.workshopsDone"
                     :productsDone="$attrs.productsDone"
                     :discount.sync="discount"/>
        </keep-alive>
      </form>
    </div>

    <div v-if="!placeholder" class="order__price">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="order__price-content">
              {{this.discount === 0 ? $t('message.orderCart.totalPrice.text') :
              $t('message.orderCart.totalPrice.discountText')}}:
              <b style="margin-left: 5px; font-weight: 500">{{discount === 0 ? totalPrice : discount}} &#8381;</b>
              <button v-if="page > 1" class="button button_transparent button_prev" @click="prevClick">
                {{windowWidth >= breakpoints.lgWidth ? $t('message.orderCart.totalPrice.back') : ''}}
              </button>
              <button v-if="page < 3" class="button button_yellow button_next"
                      :class="{disabled:page === 2 && !userCart.length}" :disabled="page === 2 && !userCart.length"
                      @click="nextClick">
                {{windowWidth >= breakpoints.lgWidth ? $t('message.orderCart.totalPrice.next') : ''}}
              </button>
              <a v-else class="button button_yellow button_next" :href="`${baseURL}/api/makeorder/`">{{windowWidth >=
                breakpoints.lgWidth ? $t('message.orderCart.totalPrice.makeOrder') : ''}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ord-modal" ref="ordModal" v-show="user.ordinator && !user.verify && isModalOpen">
      <div class="ord-modal__block">
        <div class="ord-modal__text" v-html="$t('message.orderCart.modal.text')"/>
        <div class="ord-modal__controls">
          <button class="button button_transparent" @click="toVerify">{{$t('message.orderCart.modal.buttons.verify')}}
          </button>
          <button class="button button_yellow" type="button" @click="isModalOpen = false">
            {{$t('message.orderCart.modal.buttons.skip')}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loader from "../components/UI/Loader";
  import OrdersList from "../components/OrderCart/OrdersList";
  import {mapActions, mapGetters, mapMutations} from "vuex";
  import AdditionalServicesList from "../components/OrderCart/AdditionalServices/AdditionalServicesList";
  import yesIcon from "@/assets/img/ui/yes.svg"
  import noIcon from "@/assets/img/ui/no.svg"
  import axios from 'axios'
  import PayedOrder from "../components/PersonalCab/MainPage/PayedOrder/PayedOrdersList";
  import OrderCartDates from "../components/OrderCart/Pages/OrderCartDates";
  import OrderCartBasket from "../components/OrderCart/Pages/OrderCartBasket";
  import OrderCartWorkshops from "../components/OrderCart/Pages/OrderCartWorkshops";
  import {baseURL} from "../helpers/defaultValues";
  import {breakpoints} from "../helpers/defaultValues";
  import setTitle from "../helpers/title";

  export default {
    name: "OrderCart",
    components: {PayedOrder, AdditionalServicesList, OrdersList, Loader},
    data() {
      return {
        countDate: new Date(2021, 2, 31).getTime(),
        placeholder: false,
        yesIcon,
        noIcon,
        page: 1,
        productsDone: false,
        pages: [
          OrderCartDates,
          OrderCartWorkshops,
          OrderCartBasket,
        ],
        discount: 0,

        baseURL,
        isModalOpen: true,
        windowWidth: 0,
        breakpoints
      };
    },
    computed: {
      ...mapGetters(["userCart", "user"]),
      pageTitle() {
        return [
          this.$t('message.orderCart.orderCartDates.title'),
          this.$t('message.orderCart.orderCartWorkshops.title'),
          this.$t('message.orderCart.orderCartBasket.title')
        ]
      },
      totalPrice() {
        return this.userCart.reduce((acc, product) => acc + product.price, 0)
      },
    },
    methods: {
      ...mapActions(["fetchProducts"]),
      ...mapMutations(["setUserBasket", "deleteAllProducts"]),
      handleResize() {
        this.windowWidth = window.innerWidth;
      },
      toVerify() {
        this.$router.push({name: 'Verify'});
        this.isModalOpen = false;
      },
      nextClick() {
        if (this.page !== 2) {
          this.page += 1;
        } else if (this.page == 2) {
          const userCart = this.userCart;
          const postData = userCart.map(item => +item.id)
          if (postData.length) {
            axios
              .post('/api/user/basket/', {
                items: postData
              })
              .then(() => {
                axios
                  .get('/api/user/basket/')
                  .then(res => {
                    this.setUserBasket(res.data.items);
                    this.page += 1;
                  })
              })
          }
        }
      },
      prevClick() {
        this.page -= 1;

      }
    },
    mounted() {
      document.body.append(this.$refs.ordModal);

    },
    created() {
      setTitle(this.$i18n.t('message.pagesTitle.orderCart'))
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }
  };
</script>

<style lang="scss" scoped>
  .ord-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(#F4F9FF, .8);

    &__block {
      padding: 20px 20px 25px;
      width: 420px;
      max-width: 100%;
      background: white;
      border: 1px solid #EDEDED;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }

    &__text {
      text-align: center;
      font-size: 18px;
      line-height: 21px;
      color: $main-text-color;
    }

    &__controls {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      button {
        padding: 8px 15px;
        font-size: 16px;
        text-transform: none;
        flex-grow: 1;

        &:nth-child(1) {
          margin-right: 15px;
        }

        &:nth-child(2) {
          margin-left: 15px;
        }
      }
    }
  }

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


    &__placeholder {
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
  }

  .order__price {
    padding: 15px 0;
    background-color: #F4F9FF;
    margin-top: 40px;
    @media screen and (min-width: $lg-width) {
      padding: 15px 105px;
      margin-top: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    &-content {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 18px;
      @media screen and (min-width: $lg-width) {
        font-size: 24px;
        line-height: 28px;
      }
    }
  }

  .button_next, .button_prev {
    position: relative;
    margin-left: 10px;
    padding: 15px;
    text-transform: none;
    @media screen and (max-width: $lg-width) {
      border-radius: 100%;
    }
    @media screen and (min-width: $lg-width) {
      margin-left: 20px;
      padding: 8px 40px;
      min-width: 100px;
    }

    &::before {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      content: '';
      background-position: center;
      background-size: 6px;
      background-repeat: no-repeat;
      background-image: url(~@/assets/img/ui/arrow.svg);
      @media screen and (min-width: $lg-width) {
        background-size: 7px;
      }
    }
  }

  .button_next {
    transition: opacity .25s;
    @media screen and (min-width: $lg-width) {
      padding-left: 30px;
    }

    &.disabled {
      opacity: .5;
      cursor: not-allowed;
      pointer-events: none;
    }

    &::before {

      @media screen and (min-width: $lg-width) {
        left: unset;
        top: -1px;
        bottom: 0;
        right: 20px;
        width: 20px;
      }
    }
  }

  .button_prev {
    @media screen and (min-width: $lg-width) {
      padding-right: 30px;
    }

    &::before {
      transform: rotate(180deg);
      @media screen and (min-width: $lg-width) {
        left: 20px;
        top: -1px;
        bottom: 0;
        right: unset;
        width: 20px;
      }
    }
  }
</style>