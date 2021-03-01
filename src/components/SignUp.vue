<template>
  <div class="form form__signup">
    <div class="form__title">Личный кабинет</div>
    <div class="form__progressbar">
      <div class="progress"
           :style="{
              width: progressWidth
           }"/>
    </div>
    <form action="#" @submit.prevent="">
      <div class="row">
        <div class="col-12">
          <div class="form__page" v-if="formPage === 1">
            <Input
                label="Фамилия *"
                input-id="signup-lastname"
                input-type="text"
                :inputText.sync="form.lastname"
            />
            <Input
                label="Имя *"
                input-id="signup-name"
                input-type="text"
                :inputText.sync="form.name"
            />
            <Input
                label="Отчество"
                input-id="signup-fathername"
                input-type="text"
                :inputText.sync="form.fathername"
            />
            <DateInput
                v-model="form.birthdate"
                label="Дата рождения"
                input-id="signup-birthdate"
            />
            <Select
                label="Страна*"
                input-id="signup-contry"
                :options="countries"
            />
<!--            <v-select />-->
            <Button class="form__button" text="Далее" @buttonClick="nextPage"/>
          </div>

          <div class="form__page" v-if="formPage === 2">
            <Input
                label="Учредение *"
                input-id="signup-lastname"
                input-type="text"
                :inputText.sync="form.lastname"
            />
            <Input
                label="Должность *"
                input-id="signup-name"
                input-type="text"
                :inputText.sync="form.name"
            />


            <div class="form__group">
              <Button class="form__button form__button_prev" text="" @buttonClick="prevPage"/>
              <Button class="form__button" text="Далее" @buttonClick="nextPage"/>
            </div>
          </div>

        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import DateInput from "@/components/UI/DateInput";
import Select from "./UI/Select";


export default {
  name: "SignUp",
  components: {DateInput, Button, Input, Select},
  data() {
    return {
      formPage: 1,
      form: {
        name: '',
        lastname: '',
        fathername: '',
        birthdate: ''
      },
      countries: [
        'Россия',
        'Украина',
        'Беларусь',
        'Россия',
        'Украина',
        'Беларусь',
        'Россия',
        'Украина',
        'Беларусь',
        'Россия',
        'Украина',
        'Беларусь',
        'Россия',
        'Украина',
        'Беларусь',
      ]
    }
  },
  computed: {
    progressWidth() {
      return Math.trunc(100 / 3 * this.formPage) + '%'
    }
  },
  methods: {
    nextPage() {
      this.formPage += 1;
    },
    prevPage() {
      this.formPage -= 1;
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 38px 50px 50px;
  border: 1px solid #A8BBD3;
  box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  background: white;
  min-width: 400px;

  form {
    margin-top: 45px;
  }

  &__title {
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    margin-bottom: 28px;
    text-align: center;
  }

  &__group{
    display: flex;
    .form__button:not(.form__button_prev){
      flex-grow: 1;
    }
  }
  &__button{
    &_prev{
      margin-right: 15px;
      max-width: 45px;
    }
  }

  &__progressbar {
    margin: 0 -50px;
    background-color: #EDEDED;

    .progress {
      height: 6px;
      background-color: #FFCC40;
      transition: width .25s;
    }
  }

  &__input {
    margin-bottom: 15px;
  }

  &__button {
    margin-top: 30px;
  }
}
</style>