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
    <div class="form__group ">
      <Button class=" button button_yellow form__submit login__submit" :class="{disabled: errorMessage || logining}" type="submit"
              :disabled="errorMessage!=='' || logining" :text="$t('message.logIn.buttons.signIn')"/>
      <router-link :to="{name:'ForgetPass'}" class="form__remember">{{$t('message.logIn.forgetPass')}}</router-link>
    </div>
    <p v-if="errorMessage" class="auth__error">{{errorMessage}}</p>
    <button v-if="noOneAuth.isNoOneAuth" class="button button_yellow logout-all" type="button"
            @click="logoutAll">
      {{ noOneAuth.isLoading ? $t('message.logIn.noOneAuth.loading') : $t('message.logIn.noOneAuth.noLoading')}}
    </button>
  </form>

</template>

<script>
  import Button from "@/components/UI/Button";
  import Input from "@/components/UI/Input";
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import axios from 'axios'
  import {setIsTildaUser} from "../../helpers/defaultValues";

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
        errorMessage: '',
        logining: false,
        valid: {
          email: false,
          password: false
        },
        noOneAuth: {
          isNoOneAuth: false,
          isLoading: false,
          email: '',
          password: '',
        },
      }
    },
    methods: {
      ...mapActions(['authUser']),
      ...mapMutations(["clearUser"]),
      validInput(event, validFormField) {
        this.valid[validFormField] = event.target.value === ''
        this.errorMessage = '';
      },
      submitLogin() {
        if (!this.email) {
          this.valid.email = true
        }
        if (!this.password) {
          this.valid.password = true
        }
        this.logining = true
        this
          .authUser({
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_MODE === 'test') console.log(res);
            if (res.data.status !== "error") {
              this.logining = true
              if (res.data.user.tildaUser) {
                setIsTildaUser(true)
                this.$router.push(`/user/${this.user.id}/user-data`)
              } else {
                this.$router.push(`/user/${this.user.id}`)
              }
            } else {
              this.errorMessage = res.data.error;
              if (res.data.isNoOneAuth) {
                this.noOneAuth.isNoOneAuth = res.data.isNoOneAuth;
                this.noOneAuth.email = this.email;
                this.noOneAuth.password = this.password;
              }
              else{
                this.logining = false
              }
            }
          })
      },
      logoutAll() {
        this.noOneAuth.isLoading = true
        this.clearUser();
        axios
          .post('/api/user/logout/', {
            email: this.noOneAuth.email,
            password: this.noOneAuth.password,
          })
          .then(res => {
            if (res.data.status === 'ok') {
              this.errorMessage = '';
              this.noOneAuth.isNoOneAuth = false;
              this.noOneAuth.isLoading = false;
              this.noOneAuth.email = '';
              this.noOneAuth.password = '';
              this.logining = false
            }
          })
      }
    },
    computed: {
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
    }


    &__submit {
      width: 100%;
      max-width: 150px;
      margin-right: 30px;
      text-transform: none;
      transition: opacity .2s;

      &.disabled {
        opacity: .5;
        pointer-events: none;
      }
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

  .auth__error {
    margin-top: 15px;
    margin-bottom: 0;
    color: red;
  }

  .login__submit {
    background-image: url(~@/assets/img/ui/account-button_login.svg);
    background-position: calc(100% - 12px) center;
    background-size: 20px;
    background-repeat: no-repeat;
    padding-left: 35px;
    padding-right: 35px;
  }

  .logout-all {
    margin-top: 15px;
    width: 100%;
  }

</style>