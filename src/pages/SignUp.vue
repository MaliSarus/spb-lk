<template>
  <div class="form form__signup">
    <div class="form__title">{{$t('message.signUp.title')}}</div>
    <div class="form__progressbar">
      <div
        class="progress"
        :style="{
          width: progressWidth,
        }"
      />
    </div>
    <SignUpForm :page.sync="formPage"/>
  </div>
</template>

<script>
import SignUpForm from '../components/SignUpForm/Form.vue';

export default {
  name: "SignUp",
  components: {SignUpForm},
  data(){
    return {
      formPage: 1,
    };
  },
  computed: {
    progressWidth() {
      return Math.trunc((100 / 4) * this.formPage) + "%";
    },
  },
    
};
</script>

<style lang="scss" scoped>
$smWidth: 557px;
.form {
  padding: 38px 50px 50px;

  background: white;
  width: 100%;
  flex-grow: 1;
  @media screen and (min-width: $smWidth) {
    width: 400px;
    flex-grow: unset;
    border: 1px solid #a8bbd3;
    box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }

  form {
    margin-top: 45px;
  }

  &__title {
    font-weight: bold;
    font-size: 28px;
    line-height: 36px;
    margin-bottom: 28px;
    text-align: center;
    @media screen and (min-width: $smWidth) {
      font-size: 36px;
      line-height: 42px;
    }
  }

  &__group {
    display: flex;

    .form__button:not(.form__button_prev) {
      flex-grow: 1;
    }
  }

  &__button {
    &_prev {
      margin-right: 15px;
      max-width: 45px;
    }
  }

  &__progressbar {
    margin: 0 -50px;
    background-color: #ededed;

    .progress {
      height: 6px;
      background-color: #ffcc40;
      transition: width 0.25s;
    }
  }

  &__input {
    margin-bottom: 15px;
  }

  &__button {
    margin-top: 30px;
  }

  &__checkbox {
    margin-top: 25px;
  }
}

.success {
  padding-top: 65px;
  text-align: center;
  color: #5e5e5e;

  &__image {
    width: 140px;
    height: 140px;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 18px;
    margin-bottom: 35px;
  }
}
</style>