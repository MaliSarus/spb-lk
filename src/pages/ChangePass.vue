<template>
  <div class="personal-cab__user-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__user-data">
            <div class="personal-cab__subtitle">
              Изменение пароля
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="user-data__form form" v-if="page === 1">
            <form action="#" @submit.prevent="submitForm">
              <div class="user-data__form-grid">
                <label for="change-pass-new">Новый пароль</label>
                <Input v-model="$v.newPass.$model" input-type="password" input-id="change-pass-new"/>
                <label for="change-pass-repeat">Повторите пароль</label>
                <Input v-model="$v.confirmPass.$model" input-type="password" input-id="change-pass-repeat"/>
              </div>
              <div class="user-data__controls">
                <Button
                    class="form__button form__button_prev"
                    text=""
                    type="button"
                    @buttonClick="$router.go(-1)"
                />
                <button type="submit" class="button button_yellow user-data__submit">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Input from "../components/UI/Input";
  import Button from "../components/UI/Button";
  import {required, sameAs} from "vuelidate/lib/validators";
  import axios from 'axios'

  export default {
    name: "ChangePass",
    components: {Input, Button},
    data() {
      return {
        newPass: '',
        confirmPass: '',
        page: 1,
      }
    },
    validations: {
      newPass: {
        required,
      },
      confirmPass: {
        sameAsPassword: sameAs("newPass"),
      },
    },
    methods:{
      submitForm(){
        if (!this.$v.$invalid) {
          axios
            .put('/api/user/password/', {
              password: this.newPass,
              confirmPassword: this.confirmPass,
            })
          .then(console.log)
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .user-data__controls {
    display: flex;

  }

  .form__button_prev {
    max-width: 40px;
    height: auto;
    margin-right: 10px;
  }
</style>