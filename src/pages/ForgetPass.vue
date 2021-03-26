<template>
  <div class="form form__forget">
    <div class="form__title">{{$t('message.forgetPass.title')}}</div>
    <div class="form__confirm text" v-if="page === 'error'">
      {{$t('message.forgetPass.error')}}
    </div>
    <div class="form__subtitle text" v-if="page === 1">
      {{$t('message.forgetPass.subtitle')}}
    </div>
    <div class="form__confirm text" v-if="page === 2">
      {{$t('message.forgetPass.success')}}
    </div>
    <ForgetPassForm v-if="page === 1" :page.sync="page"/>
    <Button v-if="page === 2" :text="$t('message.forgetPass.links.logIn')" class="button button_yellow" type="button" @buttonClick="enterInAuthPage"/>
    <Button v-if="page === 'error'" :text="$t('message.forgetPass.links.back')" class="button button_yellow" type="button" @buttonClick="page = 1"/>
  </div>
</template>
<script>
  import ForgetPassForm from "@/components/ForgetPassForm/Form.vue";
  import Button from "@/components/UI/Button";

  export default {
    name: "ForgetPath",
    components: {Button, ForgetPassForm},
    data() {
      return {
        page: 1,
      }
    },
    methods:{
      enterInAuthPage(){
        this.$router.push(`/`)
      }
    }
  };
</script>
<style lang="scss" scoped>
  .form {
    &__forget{
      width: 100%;
      max-width: 450px;
      background: #FFFFFF;
      border: 1px solid #A8BBD3;
      box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      padding: 35px 35px 55px;
    }
    &__title {
      font-size: 28px;
      line-height: 32px;
      font-weight: bold;
      margin-bottom: 15px;
      @media screen and (min-width: $lg-width){
        font-size: 36px;
        line-height: 42px;
      }
    }

    .text {
      color: #686868;
      font-size: 14px;
      line-height: 17px;
      @media screen and (min-width: $lg-width) {
        font-size: 16px;
        line-height: 19px;
      }
    }

    &__subtitle {
      margin-bottom: 15px;
      @media screen and (min-width: $lg-width) {
        margin-bottom: 20px;
      }
    }
    &__confirm{
      margin: 50px 0;
      @media screen and (min-width: $lg-width){
        margin: 60px 0;
      }
    }
    .button{
      width: 100%;
    }
  }
</style>