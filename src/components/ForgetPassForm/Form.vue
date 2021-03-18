<template>
  <form action="#" @submit.prevent="getUser">
    <Input v-model="email" input-type="email" label="Email" :class="{invalid: validForm.email}" @input="validate"/>
    <div class="form__group d-flex">
      <router-link
          ref="backButton"
          class="form__button form__button_prev"
          :to="{ name: 'LogIn' }"
      />
      <Button
          ref="submitButton"
          class="button button_yellow flex-grow-1"
          type="submit"
          text="Получить пароль"
      />
    </div>
  </form>
</template>
<script>
  import Input from "@/components/UI/Input.vue";
  import Button from "@/components/UI/Button.vue";
  import axios from 'axios'

  export default {
    components: {Input, Button},
    props: ['page', 'userId'],
    data() {
      return {
        email: '',
        formPage: this.page,
        id: this.userId,
        validForm: {
          email: false,
        }
      }
    },
    watch: {
      formPage(val) {
        this.$emit('update:page', val)
      },
      id(val) {
        this.$emit('update:userId', val)
      }
    },
    methods: {
      resizeSquareButton() {
        const submitButton = this.$refs.submitButton;
        const backButton = this.$refs.backButton;
        if (submitButton && backButton) {
          const submitButtonHeight = submitButton.$el.offsetHeight;
          backButton.$el.style.width = submitButtonHeight + "px";
          window.addEventListener("resize", () => {
            const submitButtonHeight = submitButton.$el.offsetHeight;
            backButton.$el.style.width = submitButtonHeight + "px";
          });
        }

      },
      validate(event){
        this.validForm.email = event.target.value === ''
      },
      getUser() {
        if (this.email) {

          axios
            .post('/api/auth/forgot/', {
              email: this.email
            })
            .then(res => {
              const status = res.data.status
              if (status === 'ok') {
                this.formPage += 1;
              } else {
                this.formPage = 'error';
              }
            })
        }
        else{
          this.validForm.email = true
        }
      }
    },
    mounted() {
      this.resizeSquareButton();
    },
  };
</script>
<style lang="scss" scoped>

  .form {
    &__group {
      padding-top: 15px;
      @media screen and (min-width: $lg-width) {
        padding-top: 20px;
      }
    }

    &__submit {
      flex-grow: 1;
    }

    &__button {
      &_prev {
        position: relative;
        padding: 0;
        padding: 15px;
        width: auto;
        flex-shrink: 0;
        margin-right: 15px;
      }
    }
    .invalid{
      border: 1px solid red;
    }
  }
</style>