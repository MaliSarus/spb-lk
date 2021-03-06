<template>
  <div class="form form__forget">
    <div class="form__title">Восстановить пароль</div>
    <div class="form__confirm text" v-if="page === 'error'">
      Пользователь не найден
    </div>
    <div class="form__subtitle text" v-if="page === 1">
      Если вы забыли пароль, введите Email. Данные для авторизации будут высланы
      вам по E-Mail.
    </div>
    <div class="form__confirm text" v-if="page === 2">
      Пожалуйста, дождитесь письма, данные для авторизации были высланы на email.
    </div>
    <ForgetPassForm v-if="page === 1" :page.sync="page" :user-id.sync="userId"/>
    <Button v-if="page === 2" text="Войти в личный кабинет" class="form__button" type="button" @buttonClick="enterInPersonalCab"/>
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
        userId:''
      }
    },
    methods:{
      enterInPersonalCab(){
        this.$router.push(`/lk/${this.userId}`)
      }
    }
  };
</script>
<style lang="scss">
  .form {
    &__title {
      margin-bottom: 15px;
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
  }
</style>