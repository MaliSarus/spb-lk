<template>
  <form action="#" @submit.prevent="submitLogin">
    <div class="row">
      <div class="col-12">
        <Input
                v-model="email"
                :label="$t('message.logIn.inputs.email')"
                input-id="login-email"
                input-type="email"
                :class="{invalid: this.valid.email}"
                @input="validInput($event,'email')"
        />
        <Input
                v-model="password"
                :label="$t('message.logIn.inputs.password')"
                input-id="login-password"
                input-type="password"
                :class="{invalid: this.valid.password}"
                @input="validInput($event,'password')"
        />
      </div>
    </div>
    <div class="form__group">
      <Button class=" button button_yellow form__submit login__submit" type="submit" :text="$t('message.logIn.buttons.signIn')"/>
      <router-link :to="{name:'ForgetPass'}" class="form__remember">{{$t('message.logIn.forgetPass')}}</router-link>
    </div>
    <p v-if="errorMessage" class="auth__error">{{errorMessage}}</p>
  </form>

</template>

<script>
  import Button from "@/components/UI/Button";
  import Input from "@/components/UI/Input";
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "Form",
    components: {
      Button,
      Input
    },
    data() {
      return {
        email: '',
        password: '',
        errorMessage:'',
        valid:{
          email: false,
          password: false
        }
      }
    },
    methods: {
      ...mapActions(['authUser']),
      validInput(event, validFormField){
        this.valid[validFormField] = event.target.value === ''
        this.errorMessage = '';
      },
      submitLogin() {
        if (!this.email){
          this.valid.email = true
        }
        if (!this.password){
          this.valid.password = true
        }
        this.authUser(
          {
            email: this.email,
            password: this.password,
          }
        )
        .then((res)=>{
          console.log(res);
          if (res.data.status !== "error"){
            this.$router.push(`/user/${this.user.id}`)
          }
          else {
            this.errorMessage = res.data.error;
          }
        })
      }
    },
    computed:{
      ...mapGetters(['user']),
    }
  }
</script>

<style lang="scss" scoped>
  $accent-color: #013066;
  $main-text-color: black;
  .form {
    padding: 38px 50px 50px;
    border: 1px solid #A8BBD3;
    box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    background: white;
    min-width: 400px;

    &__title {
      font-weight: bold;
      font-size: 36px;
      line-height: 42px;
      margin-bottom: 28px;
      text-align: center;
    }

    &__input {
      margin-bottom: 15px;
      &.invalid{
        border: 1px solid red;
        animation: invalid .5s forwards;
      }
    }
    @keyframes invalid {
      0%{
        transform: translateX(0);
      }
      10%{
        transform: translateX(10px);
      }
      30%{
        transform: translateX(-10px);
      }
      40%{
        transform: translateX(7px);
      }
      50%{
        transform: translateX(-7px);
      }
      60%{
        transform: translateX(5px);
      }
      70%{
        transform: translateX(-5px);
      }
      80%{
        transform: translateX(2px);
      }
      90%{
        transform: translateX(-2px);
      }
      100%{
        transform: translateX(0);
      }
    }

    &__submit {
      width: 100%;
      max-width: 150px;
      margin-right: 30px;
      text-transform: none;
    }


    &__remember {
      font-size: 14px;
      line-height: 16px;
      display: flex;
      align-items: center;
      text-align: center;
      text-decoration-line: underline;
      color: $accent-color;
    }

    &__group {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
  }
  .auth__error{
    margin-top: 15px;
    margin-bottom: 0;
    color: red;
  }
  
  .login__submit{
    background-image: url(~@/assets/img/ui/account-button_login.svg);
    background-position: calc(100% - 12px) center;
    background-size: 20px;
    background-repeat: no-repeat;
    padding-left: 35px;
    padding-right: 35px;
  }

</style>