<template>
  <div class="form form__login">
    <div class="form__title">{{$t('message.logIn.title')}}</div>
    <LogInForm/>
    <router-link tag="button" :to="{name: 'SignUp'}" class="button button_blue form__button">
      {{$t('message.logIn.buttons.signUp')}}
    </router-link>
  </div>
</template>

<script>
  import LogInForm from "@/components/LogInForm/Form";
  import {mapActions, mapGetters} from 'vuex'
  // eslint-disable-next-line no-unused-vars
  import setTitle from "../helpers/title";
  import {setIsUserAuth, setIsTildaUser} from "../helpers/defaultValues";

  export default {
    name: 'LogIn',
    components: {
      LogInForm,

    },
    computed: {
      ...mapGetters(["user"])
    },
    methods: {
      ...mapActions(['fetchCountries', 'fetchDepartments', 'fetchRanks', 'fetchDegrees', 'fetchCities', "fetchUser"]),
      initFetch() {
        this.fetchUser()
          .then((res) => {
            if (res) {
              setIsUserAuth(true)
              if (this.user.tildaUser) {
                setIsTildaUser(true)
                this.$router.push(`/user/${res.id}/user-data`)
              } else {
                setIsTildaUser(false)
                this.$router.push(`/user/${res.id}`)
              }
            }
          })
      },
    },
    created() {
      this.initFetch();
      // setTitle(this.$i18n.t('message.pagesTitle.logIn'))
    },
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
    @media screen and (min-width: $sm-width) {
      display: block;
      border: 1px solid #A8BBD3;
      box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      flex-grow: unset;
      max-width: 400px;

    }
    @media screen and (min-width: $lg-width) {
      padding: 38px 50px 50px;
    }

    &__title {
      font-size: 28px;
      line-height: 32px;
      font-weight: bold;
      margin-bottom: 15px;
      @media screen and (min-width: $lg-width) {
        font-size: 36px;
        line-height: 42px;
      }
    }

    &__button {
      margin-top: 40px;
      text-align: center;
      padding: 15px 15px;
      width: 100%;
    }
  }


</style>

