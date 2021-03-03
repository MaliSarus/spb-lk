<template>
  <div class="form form__signup">
    <div class="form__title">Регистрация</div>
    <div class="form__progressbar">
      <div class="progress"
           :style="{
              width: progressWidth
           }"/>
    </div>
    <form action="#" @submit.prevent="submitSignUp">
      <div class="row">
        <div class="col-12">
          <div class="form__page" v-if="formPage === 1">
            <Input
                label="Фамилия *"
                input-id="signup-lastname"
                input-type="text"
                v-model="$v.form.lastName.$model"
            />
            <Input
                label="Имя *"
                input-id="signup-name"
                input-type="text"
                v-model="$v.form.name.$model"
            />

            <Input
                label="Отчество"
                input-id="signup-secondname"
                input-type="text"
                v-model="form.secondName"
            />
            <DateInput
                v-model="$v.form.birthday.$model"
                label="Дата рождения"
                input-id="signup-birthday"
            />
            <Select
                v-model="$v.country.$model"
                label="Страна *"
                input-id="signup-country"
                :options="countriesWithoutId"
                @pick="fetchCities"
            />
            <Select
                v-if="cities"
                v-model="$v.form.city.$model"
                label="Город *"
                input-id="signup-city"
                :options="cities"
            />
            <Button class="form__button" text="Далее" @buttonClick="nextPage" type="button"/>
          </div>

          <div class="form__page" v-show="formPage === 2">
            <Input
                label="Учредение *"
                input-id="signup-company"
                input-type="text"
                v-model="form.company"
            />
            <Input
                label="Должность *"
                input-id="signup-position"
                input-type="text"
                v-model="$v.form.position.$model"
            />
            <Select
                v-model="$v.form.department.$model"
                label="Специализация *"
                input-id="signup-department"

                :options="departments"
            />
            <Select
                v-model="form.rank"
                label="Ученое звание"
                input-id="signup-rank"
                :options="ranks"
            />
            <Select
                v-model="form.degree"
                label="Ученая степень"
                input-id="signup-degree"
                :options="degrees"
            />

            <div class="form__group">
              <Button class="form__button form__button_prev" text="" @buttonClick="prevPage" type="button"/>
              <Button class="form__button" text="Далее" @buttonClick="nextPage" type="button"/>
            </div>
          </div>
          <div class="form__page" v-show="formPage === 3">
            <Input
                label="Телефон *"
                input-id="signup-phone"
                input-type="tel"
                v-model="$v.form.phone.$model"
            />
            <Input
                label="Email *"
                input-id="signup-email"
                input-type="tel"
                v-model="$v.form.email.$model"
            />
            <Input
                label="Пароль *"
                input-id="signup-pass"
                input-type="password"
                v-model="$v.form.password.$model"
            />
            <Input
                label="Пароль повторно *"
                input-id="signup-cpass"
                input-type="password"
                v-model="form.confirmPassword"
            />
            <Checkbox
                input-id="signup-ordinator"
                v-model="form.ordinator"
            >
              Я являюсь ординатором или очным аспирантом кафедры: пластическая хирургия / челюстно-лицевая хирургия /
              косметология / дерматология.
            </Checkbox>
            <Checkbox
                v-model="$v.form.policy.$model"
                input-id="signup-policy"
            >
              Я согласен с <a href="#">Политикой конфиденциальности</a>
            </Checkbox>
            <div class="form__group">
              <Button class="form__button form__button_prev" text="" @buttonClick="prevPage" type="button"/>
              <Button class="form__button" text="Зарегистрироваться" @buttonClick="signUp"  type="button"/>
            </div>
          </div>
          <div class="form__page success" v-show="formPage === 4">
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
import {required, sameAs} from 'vuelidate/lib/validators'
import axios from "axios";
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "SignUp",
  components: {Checkbox, DateInput, Button, Input, Select},
  data() {
    return {
      formPage: 1,
      form: {
        name: '',
        lastName: '',
        secondName: '',
        birthday: '',
        country: '',
        city: '',
        company: '',
        department: '',
        position: '',
        rank: '',
        degree: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        ordinator: false,
        policy: false,
      },
      country:'',
      // countries: [],
      cities: null,
      departments:[
          'Дерматолог',
          'Косметолог',
          'Хирург',
          'др.'
      ],
      ranks:[
        'Доцент',
        'Профессор',
        'др.'
      ],
      degrees:[
        'Кандидат наук',
        'Доктор наук',
        'др.'
      ],

    }
  },
  validations: {
    country: {
      required
    },
    form: {
      name: {
        required
      },
      lastName: {
        required
      },
      birthday: {
        required
      },
      city: {
        required
      },
      company: {
        required
      },
      department: {
        required
      },
      position: {
        required
      },
      phone: {
        required
      },
      email: {
        required
      },
      password: {
        required
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      },
      policy: {
        required
      }
    }
  },
  computed: {
    ...mapGetters(['countries']),
    progressWidth() {
      return Math.trunc(100 / 4 * this.formPage) + '%'
    },
    countriesWithoutId() {
      return this.countries.map(country => country.name)
    },
  },
  methods: {
    ...mapActions(['fetchCountries']),
    nextPage() {
      this.formPage += 1;
    },
    prevPage() {
      this.formPage -= 1;
    },
    // fetchCountries() {
    //   axios
    //       .get('/api/location/country/')
    //       .then(res => {
    //         const countries = res.data.country;
    //         this.countries = countries
    //       })
    // },
    fetchCities($event) {
      const countryName = $event
      const countryId = this.countries.find(country => country.name === countryName).id;
      this.form.country = countryId;

      axios
          .get(`/api/location/city/${countryId}/`)
          .then(res => {
            const cities = res.data.city;
            this.cities = cities;
          })

    },
    signUp(){
      const vueForm = this.form;
      const formData = {
        name: vueForm.name,
        lastName: vueForm.lastName,
        secondName: vueForm.secondName,
        birthday: vueForm.birthday,
        country: vueForm.country,
        city: vueForm.city,
        phone:vueForm.phone,
        email:vueForm.email,
        company: vueForm.company,
        position: vueForm.position,
        department: vueForm.department,
        rank: vueForm.rank,
        degree: vueForm.degree,
        ordinator: vueForm.ordinator,
        password: vueForm.password,
        confirmPassword: vueForm.confirmPassword
      }

      if (!this.$v.$invalid){
        axios
        .put('/api/signup/',formData)
        .then(res=>{
          this.formPage = 4;
          console.log(res)
        })
      }
    }
  },
  mounted() {
    this.fetchCountries();
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
  @media screen and (min-width: $smWidth) {
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

.success {
  padding-top: 65px;
  text-align: center;
  color: #5E5E5E;

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