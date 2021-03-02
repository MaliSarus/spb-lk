<template>
  <div class="form form__signup">
    <div class="form__title">Регистрация</div>
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
                v-model="form.country"
                label="Страна *"
                input-id="signup-contry"
                :options="countries"
            />
            <Select
                v-model="form.town"
                label="Город *"
                input-id="signup-town"
                :options="towns"
            />
            <Button class="form__button" text="Далее" @buttonClick="nextPage"/>
          </div>

          <div class="form__page" v-if="formPage === 2">
            <Input
                label="Учредение *"
                input-id="signup-state"
                input-type="text"
                :inputText.sync="form.state"
            />
            <Input
                label="Должность *"
                input-id="signup-position"
                input-type="text"
                :inputText.sync="form.position"
            />
            <Select
                v-model="form.speciality"
                label="Специализация *"
                input-id="signup-speciality"
                :options="countries"
            />
            <Select
                v-model="form.rank"
                label="Ученое звание"
                input-id="signup-rank"
                :options="countries"
            />
            <Select
                v-model="form.degree"
                label="Ученая степень"
                input-id="signup-degree"
                :options="countries"
            />

            <div class="form__group">
              <Button class="form__button form__button_prev" text="" @buttonClick="prevPage"/>
              <Button class="form__button" text="Далее" @buttonClick="nextPage"/>
            </div>
          </div>
          <div class="form__page" v-if="formPage === 3">
            <Input
                label="Телефон *"
                input-id="signup-phone"
                input-type="tel"
                :inputText.sync="form.phone"
            />
            <Input
                label="Email *"
                input-id="signup-email"
                input-type="tel"
                :inputText.sync="form.email"
            />
            <Input
                label="Пароль *"
                input-id="signup-pass"
                input-type="tel"
                :inputText.sync="form.password"
            />
            <Input
                label="Пароль повторно *"
                input-id="signup-rpass"
                input-type="tel"
                :inputText.sync="form.passwordRepeat"
            />
            <Checkbox
                input-id="signup-spec"
                v-model="form.spec"
            >
              Я являюсь ординатором или очным аспирантом кафедры: пластическая хирургия / челюстно-лицевая хирургия /
              косметология / дерматология.
            </Checkbox>
            <Checkbox
                v-model="form.policy"
                input-id="signup-policy"
            >
              Я согласен с <a href="#">Политикой конфиденциальности</a>
            </Checkbox>
            <div class="form__group">
              <Button class="form__button form__button_prev" text="" @buttonClick="prevPage"/>
              <Button class="form__button" text="Далее" @buttonClick="nextPage"/>
            </div>
          </div>
          <div class="form__page success" v-if="formPage === 4">
            <div class="success__image">
              <img src="/assets/img/ui/success-signup.svg" alt="">
            </div>
            <p class="success__title">Регистрация прошла успешно!</p>
            <p class="success__subtitle">На Ваш email отправлено письмо с подтверждением, пожалуйста, пройдите по ссылке
              и активируйте аккаунт.</p>
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
import Checkbox from "./UI/Checkbox";


export default {
  name: "SignUp",
  components: {Checkbox, DateInput, Button, Input, Select},
  data() {
    return {
      formPage: 1,
      form: {
        name: '',
        lastname: '',
        fathername: '',
        birthdate: '',
        country: '',
        town: '',
        state: '',
        speciality: '',
        position: '',
        rank: '',
        degree: '',
        phone: '',
        email: '',
        password: '',
        passwordRepeat: '',
        spec: false,
        policy: false,
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
      ],
      towns: [
        'Москва',
        'СПБ',
        'Бгд'
      ],
    }
  },
  computed: {
    progressWidth() {
      return Math.trunc(100 / 4 * this.formPage) + '%'
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
$smWidth: 557px;
.form {
  padding: 38px 50px 50px;

  background: white;
  width: 100%;
  flex-grow: 1;
  @media screen and (min-width: $smWidth){
    width: 400px;
    flex-grow: unset;
    border: 1px solid #A8BBD3;
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

  &__checkbox {
    margin-top: 25px;
  }
}

.success{
  padding-top: 65px;
  text-align: center;
  color: #5E5E5E;
  &__image{
    width: 140px;
    height: 140px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  &__title{
    font-size: 18px;
    margin-bottom: 35px;
  }
}
</style>