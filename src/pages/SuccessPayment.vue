<template>
  <div class="form__wrapper">
    <loader v-if="!orderNum"/>
    <form  v-else action="#" class="success-form" @submit.prevent="submitSuccess">
      <div class="success-form__title">{{$t('message.payment.success.title')}}</div>
      <div class="success-form__content">
        <img :src="successIcon" alt="">
        <div class="success-form__subtitle">{{$t('message.payment.success.subtitle')}}</div>
        <p>{{$t('message.payment.success.text',{orderNum})}}</p>
      </div>
      <button type="submit" class="button button_yellow">{{$t('message.payment.success.link')}}</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  import successIcon from '@/assets/img/ui/success-signup.svg'
  import {mapGetters} from 'vuex'
  // eslint-disable-next-line no-unused-vars
  import setTitle from "../helpers/title";
  import Loader from "../components/UI/Loader";

  export default {
    name: "SuccessPayment",
    components: {Loader},
    data() {
      return {
        orderNum: '',
        errorMessage: '',
        successIcon
      }
    },
    computed:{
      ...mapGetters(["user"])
    },
    methods:{
      submitSuccess(){
        this.$router.push(`/user/${this.user.id}`)
      }
    },
    created() {
      // setTitle(this.$i18n.t('message.pagesTitle.payment'))
      const url = new URL(window.location.href);
      const obj = {}
      for (const p of url.searchParams) {
        obj[p[0]] = p[1]
      }
      axios
        .post('/api/successful_payment/', {
          orderId: obj.orderId,
        })
        .then(res => {
          console.log(res)
          if (res.data.status === 'ok') {
            this.orderNum = res.data.orderNumber;
          } else {
            this.errorMessage = res.data.error;
          }
        })
    }
  }
</script>

<style lang="scss" scoped>
  .form__wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-direction: column;
  }
  .success-form {
    flex-grow: 1;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: none;
    @media screen and (min-width: $lg-width) {
      max-width: 450px;
      border-radius: 10px;
      box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.05);
      border: 1px solid #A8BBD3;
      flex-grow: unset;
      min-height: 600px;
      align-items: unset;
      justify-content: unset;
      padding: 30px 30px 45px;
    }

    &__title {
      font-weight: bold;
      font-size: 28px;
      line-height: 32px;
      text-align: center;
      margin-bottom: 30px;
      @media screen and (min-width: $lg-width) {
        font-size: 36px;
        line-height: 42px;
        margin-bottom: 10px;
      }
    }

    &__content {
      margin-bottom: 30px;
      @media screen and (min-width: $lg-width) {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      img {
        max-width: 140px;
        margin-bottom: 40px;
      }
    }

    &__subtitle, p {
      color: $light-text-color;
    }

  }
</style>