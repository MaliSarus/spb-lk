<template>
  <div class="form form__login">
    <div class="form__title">Личный кабинет</div>
    <LogInForm/>
    <router-link tag="button" :to="{name: 'SignUp'}" class="form__button">Зарегистрироваться</router-link>
  </div>
</template>

<script>
  import LogInForm from "@/components/LogInForm/Form";
  import {mapActions} from 'vuex'

  export default {
    name: 'LogIn',
    components: {
      LogInForm,

    },
    methods: {
      ...mapActions(['fetchCountries', 'fetchDepartments', 'fetchRanks', 'fetchDegrees', 'fetchCities', "fetchUser"]),
      initFetch() {
        this.fetchUser()
          .then((res) => {
            console.log(res)
            if (res) {
              this.$router.push(`/user/${res.id}`)
            }
          })
      },
    },
    created() {
      this.initFetch();
    }
  }
</script>
<style lang="scss" scoped>
  .form {
    padding: 15px 30px;

    background: white;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (min-width: $sm-width){
      display: block;
      border: 1px solid #A8BBD3;
      box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      flex-grow: unset;
      max-width: 400px;

    }
    @media screen and (min-width: $lg-width){
      padding: 38px 50px 50px;
    }

    &__title {

      margin-bottom: 28px;
      text-align: center;
    }

    &__button {
      margin-top: 40px;

      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      text-align: center;
      color: white;
      background: $accent-color;
      border: 1px solid #F3F3F3;
      box-sizing: border-box;
      border-radius: 5px;
      padding: 15px 15px;
      width: 100%;

    }
  }


</style>

