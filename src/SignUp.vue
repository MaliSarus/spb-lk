<template>
  <div id="app-one">
    <div class="form">
      <div class="form__title">Личный кабинет</div>
      <form action="#" @submit.prevent="">
        <div class="row">
          <div class="col-12">
            <Input
                label="Email"
                input-id="login-email"
                input-type="email"
            />
            <Input
                label="Пароль"
                input-id="login-password"
                input-type="password"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <Button class="form__submit" type="submit" text="Войти"/>
          </div>
          <div class="col-6">
            <a href="#">Забыли пароль</a>
          </div>
        </div>
      </form>
      <Button class="form__button" text="Зарегистрироваться"/>
    </div>
  </div>
</template>

<script>
import Input from "@/components/LogInForm/UI/Input";
import Button from "@/components/LogInForm/UI/Button";

export default {
  name: 'App',
  components:{
    Button,
    Input
  }
}
</script>
<style lang="scss" scoped>
#app-one{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
.form{
  padding: 38px 50px 50px;
  border: 1px solid #A8BBD3;
  box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  background: white;
}
</style>

