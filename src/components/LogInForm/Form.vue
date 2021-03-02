<template>
  <form action="#" @submit.prevent="submitLogin">
    <div class="row">
      <div class="col-12">
        <Input
            :inputText.sync="email"
            label="Email"
            input-id="login-email"
            input-type="email"
        />
        <Input
            :inputText.sync="password"
            label="Пароль"
            input-id="login-password"
            input-type="password"
        />
      </div>
    </div>
    <div class="form__group">
      <Button class="form__submit" type="submit" text="Войти"/>
      <a href="#" class="form__remember">Забыли пароль ?</a>
    </div>
  </form>

</template>

<script>
  import Button from "@/components/UI/Button";
  import Input from "@/components/UI/Input";
  import axios from 'axios'

  const baseURL = 'http://congress.sotbisite.beget.tech'
  export default {
    name: "Form",
    components: {
      Button,
      Input
    },
    data(){
      return{
        email:'',
        password:''
      }
    },
    methods:{
      submitLogin(){
        axios
            .post(baseURL+'/api/auth/',{
                  email: this.email,
                  password: this.password,
                }
            )
            .then(res=>{
              const data = res.data;
              if(data.status === 'ok'){
                console.log(data)
                this.$router.push('/lk')
              }
            })
      }
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
    }

    &__submit {
      max-width: 150px;
      margin-right: 30px;
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
      align-items: center;
    }
  }

</style>