<template >
    <div class="form form__login">
    <div class="form__title">Личный кабинет</div>
    <LogInForm/>
    <router-link tag="button" :to="{name: 'SignUp'}" class="form__button">Зарегистрироваться</router-link>
  </div>
</template>
<script>
export default {
    name:'ForgetPath'
}
</script>
<style lang="scss">
    
</style>