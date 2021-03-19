<template>
  <form action="#" @submit.prevent="submitForm">
    <div class="change-pass__form-grid">
      <label for="change-pass-new">Новый пароль</label>
      <Input v-model="$v.newPass.$model" input-type="password" input-id="change-pass-new"/>
      <label for="change-pass-repeat">Повторите пароль</label>
      <Input v-model="$v.confirmPass.$model" input-type="password" input-id="change-pass-repeat"/>
    </div>
    <div class="change-pass__controls">
      <Button
          class="form__button form__button_prev"
          text=""
          type="button"
          @buttonClick="$router.go(-1)"
          ref="prevButton"
      />
      <button type="submit"
              ref="submitButton" class="button button_yellow change-pass__submit user-data__submit">Сохранить</button>
    </div>
  </form>
</template>

<script>
  import Input from "@/components/UI/Input";
  import Button from "@/components/UI/Button";
  import {required, sameAs} from "vuelidate/lib/validators";
  import axios from 'axios'
  export default {
    name: "ChangePassForm",
    components: {Input, Button},
    data() {
      return {
        newPass: '',
        confirmPass: '',
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
            .then(res=>{
              console.log(res)
              this.$emit('submitForm')
            })
        }
      },
      resizeButtonPrev(){
        const prevButton = this.$refs.prevButton.$el;
        const submitButton = this.$refs.submitButton;
        prevButton.style.maxWidth = submitButton.offsetHeight + 'px'
        window.addEventListener('resize', function () {
          prevButton.style.maxWidth = submitButton.offsetHeight + 'px'
        })
      }
    },
    mounted() {
      this.resizeButtonPrev();
    }
  }
</script>

<style lang="scss" scoped>
  form{
    width: 100%;
    max-width: 540px;
  }
  .change-pass{
    &__controls {
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      @media screen and (min-width: $lg-width){
        margin-top: 30px;
      }
      .form__button_prev,.change-pass__submit{
        flex-grow: 1;
      }
      .form__button_prev{
        max-width: 40px;
        height: auto;
        margin-right: 10px;
      }
      .change-pass__submit{

      }
    }
    &__form-grid {
      display: grid;
      grid-template-rows: 1fr;
      align-items: center;
      row-gap: 10px;
      @media screen and (min-width: $lg-width) {
        grid-template-columns: 120px 1fr;
        gap: 15px 20px;
      }

      label {

        font-size: 14px;
        line-height: 16px;
        color: #282828;
        @media screen and (min-width: $lg-width) {
          grid-column: 1 / 2;

        }
      }

      .form__input {
        margin-bottom: 5px;
        @media screen and (min-width: $lg-width) {
          margin-bottom: 0;
          grid-column: 2 / 3;

        }
      }
    }
  }


</style>