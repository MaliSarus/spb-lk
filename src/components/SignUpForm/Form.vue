<template>
  <form action="#" @submit.prevent="submitSignUp">
    <div class="row">
      <div class="col-12">
        <div class="form__page" v-if="formPage === 1">
          <Input :class="{invalid: validForm.lastName}"
                 :label="$t('message.signUp.inputs.lastName')"
                 input-id="signup-lastname"
                 input-type="text"
                 v-model="$v.form.lastName.$model"
                 @input="validate($event,'lastName')"
          />
          <Input :class="{invalid: validForm.name}"
                 :label="$t('message.signUp.inputs.name')"
                 input-id="signup-name"
                 input-type="text"
                 v-model="$v.form.name.$model"
                 @input="validate($event,'name')"
          />

          <Input
              :label="$t('message.signUp.inputs.secondName')"
              input-id="signup-secondname"
              input-type="text"
              v-model="form.secondName"
          />
          <DateInput :class="{invalid: validForm.birthday}"
                     v-model="$v.form.birthday.$model"
                     :label="$t('message.signUp.inputs.birthday')"
                     input-id="signup-birthday"
                     @inputDateChange="validateDate($event,'birthday')"/>
          <Select :class="{invalid: validForm.country}"
                  v-model="$v.country.$model"
                  :label="$t('message.signUp.inputs.country')"
                  input-id="signup-country"
                  :options="countriesWithoutId"
                  @pick="countryToId($event,'country')"
          />
          <Select :class="{invalid: validForm.city}"
                  v-if="form.country === 1"
                  v-model="$v.form.city.$model"
                  :label="$t('message.signUp.inputs.city')"
                  input-id="signup-city"
                  :options="russiaCities"
                  @pick="validateSelect($event,'city')"
          />
          <Button
              class="button button_blue form__button signup__next"
              :text="$t('message.signUp.buttons.next')"
              @buttonClick="nextPage"
              type="button"
          />
        </div>

        <div class="form__page" v-show="formPage === 2">
          <Input
              :label="$t('message.signUp.inputs.company')"
              input-id="signup-company"
              input-type="text"
              v-model="form.company"
              :class="{invalid: this.validForm.company}"
              @input="validate($event,'company')"

          />
          <Input
              :label="$t('message.signUp.inputs.position')"
              input-id="signup-position"
              input-type="text"
              v-model="$v.form.position.$model"
              :class="{invalid: this.validForm.position}"
              @input="validate($event,'position')"

          />
          <Select
              v-model="$v.form.department.$model"
              :label="$t('message.signUp.inputs.department')"
              input-id="signup-department"
              :options="departments"
              :class="{invalid: this.validForm.department}"
              @pick="validateSelect($event,'department')"
          />
          <Input
              v-if="form.department === 'другое'"
              :label="$t('message.signUp.inputs.otherDepartment')"
              input-id="signup-department-other"
              input-type="text"
              v-model="form.otherDepartment"
              :class="{invalid: this.validForm.otherDepartment}"
              @input="validate($event,'otherDepartment')"

          />
          <Select
              v-model="form.rank"
              :label="$t('message.signUp.inputs.rank')"
              input-id="signup-rank"
              :options="ranks"
          />
          <Select
              v-model="form.degree"
              :label="$t('message.signUp.inputs.degree')"
              input-id="signup-degree"
              :options="degrees"
          />

          <div class="form__group">
            <Button
                class="form__button_prev"
                text=""
                @buttonClick="prevPage"
                type="button"
            />
            <Button
                class="button_blue button form__button signup__next"
                :text="$t('message.signUp.buttons.next')"
                @buttonClick="nextPage"
                type="button"
            />
          </div>
        </div>
        <div class="form__page" v-show="formPage === 3">
          <Input
              :label="$t('message.signUp.inputs.phone')"
              input-id="signup-phone"
              input-type="tel"
              v-model="$v.form.phone.$model"
              :class="{invalid: this.validForm.phone}"
              @input="validate($event,'phone')"
          />
          <Input
              :label="$t('message.signUp.inputs.email')"
              input-id="signup-email"
              input-type="email"
              v-model="$v.form.email.$model"
              :class="{invalid: this.validForm.email}"
              @input="validate($event,'email')"
          />
          <Input
              :label="$t('message.signUp.inputs.password')"
              input-id="signup-pass"
              input-type="password"
              v-model="$v.form.password.$model"
              :class="{invalid: this.validForm.password}"
              @input="validate($event,'password')"
          />
          <Input
              :label="$t('message.signUp.inputs.confirmPassword')"
              input-id="signup-cpass"
              input-type="password"
              v-model="form.confirmPassword"
              :class="{invalid: this.validForm.confirmPassword}"
              @input="validate($event,'confirmPassword')"
          />
          <Checkbox input-id="signup-ordinator" v-model="form.ordinator">
            {{$t('message.signUp.inputs.ordinator')}}
          </Checkbox>
          <Checkbox v-model="$v.form.policy.$model" :class="{invalid:validForm.policy}" input-id="signup-policy"
                    @check="validateCheckBox($event, 'policy')">
            {{$t('message.signUp.inputs.policy.text')}} <a href="#">{{$t('message.signUp.inputs.policy.link')}}</a>
          </Checkbox>
          <div class="error-message" v-if="errorMessage">
            <p>{{errorMessage}}</p>
          </div>
          <div class="form__group">
            <Button
                class="form__button form__button_prev"
                text=""
                @buttonClick="prevPage"
                type="button"
            />
            <Button
                class="button button_blue form__button signup__submit"
                :text="$t('message.signUp.buttons.signUp')"
                @buttonClick="signUp"
                type="button"
            />
          </div>
        </div>
        <div class="form__page success" v-show="formPage === 4">
          <div class="success__image">
            <img :src="images.successImage" alt=""/>
          </div>
          <p class="success__title">{{$t('message.signUp.success.title')}}</p>
          <p class="success__subtitle">{{$t('message.signUp.success.subtitle')}}</p>
          <router-link tag="button" :to="{name: 'LogIn'}" class="button button_yellow">
            {{$t('message.signUp.success.link')}}
          </router-link>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import Input from "@/components/UI/Input";
  import Button from "@/components/UI/Button";
  import DateInput from "@/components/UI/DateInput";
  import Select from "@/components/UI/Select";
  import Checkbox from "@/components/UI/Checkbox";
  import {required, sameAs} from "vuelidate/lib/validators";
  import axios from "axios";
  import {mapGetters} from "vuex";
  import successImage from "@/assets/img/ui/success-signup.svg"
  import {mailPattern, namePattern, phonePattern} from "../../helpers/defaultValues";


  export default {
    name: "SignUpForm",
    components: {Checkbox, DateInput, Button, Input, Select},
    props: ["page"],
    watch: {
      formPage(val) {
        this.$emit("update:page", val);
      },
    },
    data() {
      return {
        images: {
          successImage
        },
        formPage: this.page,
        form: {
          name: "",
          lastName: "",
          secondName: "",
          birthday: "",
          country: "",
          city: "",
          company: "",
          department: "",
          position: "",
          rank: "",
          degree: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          ordinator: false,
          policy: false,
          otherDepartment: '',
        },
        country: "",
        validForm: {
          name: false,
          lastName: false,
          birthday: false,
          city: false,
          country: false,
          company: false,
          department: false,
          position: false,
          phone: false,
          email: false,
          password: false,
          confirmPassword: false,
          policy: false,
          otherDepartment: false,
        },
        errorMessage: ''
      };
    },
    validations() {
      if (this.form.country === 1) {
        return {
          country: {
            required,
          },
          form: {
            name: {
              required,
              alpha: (val) => namePattern.test(val)

            },
            lastName: {
              required,
              alpha: (val) => namePattern.test(val)

            },
            birthday: {
              required,
            },
            city: {
              required
            },
            company: {
              required,
            },
            department: {
              required,
            },
            position: {
              required,
            },
            phone: {
              required,
              alpha: (val) => phonePattern.test(val)

            },
            email: {
              required,
              alpha: (val) => mailPattern.test(val)
            },
            password: {
              required,
            },
            confirmPassword: {
              sameAsPassword: sameAs("password"),
            },
            policy: {
              sameAs: sameAs(() => true)
            },
          }
        }
      } else return {
        country: {
          required,
        },
        form: {
          name: {
            required,
            alpha: (val) => namePattern.test(val)

          },
          lastName: {
            required,
            alpha: (val) => namePattern.test(val)

          },
          birthday: {
            required,
          },
          company: {
            required,
          },
          department: {
            required,
          },
          position: {
            required,
          },
          phone: {
            required,
            alpha: (val) => phonePattern.test(val)

          },
          email: {
            required,
            alpha: (val) => mailPattern.test(val)
          },
          password: {
            required,
          },
          confirmPassword: {
            sameAsPassword: sameAs("password"),
          },
          policy: {
            sameAs: sameAs(() => true)
          },
        },
      }
    },
    computed: {
      ...mapGetters([
        "countries",
        "departments",
        "degrees",
        "ranks",
        "russiaCities",
      ]),
      countriesWithoutId() {
        return this.countries.map((country) => country.name);
      },
      pageValidate() {
        const validateHandler = this.$v;
        console.log(validateHandler.form.city ? validateHandler.form.city.$invalid : false)
        switch (this.formPage) {
          case 1: {
            const city = validateHandler.form.city ? validateHandler.form.city.$invalid : false;
            return validateHandler.form.name.$invalid ||
              validateHandler.form.lastName.$invalid ||
              validateHandler.form.birthday.$invalid ||
              city ||
              validateHandler.country.$invalid;
          }
          case 2: {
            const otherDepartment = this.form.department === "другое" ? this.form.otherDepartment === '' : false;
            return validateHandler.form.company.$invalid ||
              validateHandler.form.position.$invalid ||
              validateHandler.form.department.$invalid ||
              otherDepartment;
          }
          case 3:
            return validateHandler.form.phone.$invalid ||
              validateHandler.form.email.$invalid ||
              validateHandler.form.password.$invalid ||
              validateHandler.form.confirmPassword.$invalid ||
              validateHandler.form.policy.$invalid;
          default:
            return true
        }
      }
    },
    methods: {

      validate(event, validFormField) {
        this.validForm[validFormField] = event.target.value === '';
      },
      validateDate(event, validFormField) {
        this.validForm[validFormField] = event === '';
      },
      validateSelect(event, validFormField) {
        this.validForm[validFormField] = event === '';

      },
      validateCheckBox(value, validFormField) {
        this.validForm[validFormField] = value !== true;
      },
      nextPage() {
        if (this.pageValidate) {
          const validForm = this.validForm;
          switch (this.formPage) {
            case 1: {
              validForm.name = this.$v.form.name.$invalid;
              validForm.lastName = this.$v.form.lastName.$invalid;
              validForm.birthday = this.$v.form.birthday.$invalid;
              validForm.country = this.$v.country.$invalid;
              validForm.city = this.$v.form.city ? this.$v.form.city.$invalid : false;
              break;
            }
            case 2: {
              validForm.company = this.$v.form.company.$invalid;
              validForm.position = this.$v.form.position.$invalid;
              validForm.department = this.$v.form.department.$invalid;
              validForm.otherDepartment = this.form.department === 'другое' ? this.form.otherDepartment === '' : false
              break;
            }
            case 3: {
              validForm.phone = this.$v.form.phone.$invalid
              validForm.email = this.$v.form.email.$invalid
              validForm.password = this.$v.form.password.$invalid
              validForm.confirmPassword = this.$v.form.confirmPassword.$invalid;
              validForm.policy = this.$v.form.policy.$invalid;
            }
          }
        } else {
          for (const key in this.validForm) {
            this.validForm[key] = false;
          }
          this.formPage += 1;
        }
      },
      prevPage() {
        this.formPage -= 1;
      },
      countryToId(countryName, validFormField) {
        this.form.country = +this.countries.find(
          (country) => country.name === countryName
        ).id;

        this.validForm[validFormField] = countryName === '';

      },
      signUp() {
        const vueForm = this.form;
        if (this.pageValidate) {
          const validForm = this.validForm;
          validForm.phone = this.$v.form.phone.$invalid
          validForm.email = this.$v.form.email.$invalid
          validForm.password = this.$v.form.password.$invalid
          validForm.confirmPassword = this.$v.form.confirmPassword.$invalid;
          validForm.policy = this.$v.form.policy.$invalid;
        } else {
          for (const key in this.validForm) {
            this.validForm[key] = false;
          }
          const formData = {
            name: vueForm.name,
            lastName: vueForm.lastName,
            secondName: vueForm.secondName,
            birthday: vueForm.birthday,
            country: vueForm.country,
            city: vueForm.city,
            phone: vueForm.phone,
            email: vueForm.email,
            company: vueForm.company,
            position: vueForm.position,
            department: vueForm.otherDepartment ? vueForm.otherDepartment : vueForm.department,
            rank: vueForm.rank,
            degree: vueForm.degree,
            ordinator: vueForm.ordinator,
            password: vueForm.password,
            confirmPassword: vueForm.confirmPassword,
          };
          if (!this.$v.$invalid) {
            axios.put("/api/signup/", formData).then((res) => {
              console.log(res)
              if (res.data.status === 'ok') {
                this.formPage = 4
              } else {
                this.errorMessage = res.data.error;
              }
            });
          }
        }
      },

    },
  };
</script>


<style lang="scss" scoped>
  $smWidth: 557px;
  .error-message {
    p {
      color: red;
      margin: 0;
      font-size: 14px;
      text-align: center;
      margin-top: 20px;
    }
  }

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

    &__button {
      width: 100%;
    }

    &__group {
      display: flex;

      .form__button:not(.form__button_prev) {
        flex-grow: 1;
        width: auto;
      }
    }

    &__button {
      &_prev {
        margin-right: 15px;
        max-width: 45px;
        flex-grow: 1;
      }
    }

    &__input {
      margin-bottom: 15px;

      &.invalid {
        border-color: red;
      }
    }

    &__button {
      margin-top: 30px;

      &_prev {
        margin-top: 30px;
      }
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

  .signup__next{
    padding-left: 30px;
    padding-right: 30px;
    background-image: url(~@/assets/img/ui/arrow_white.svg);
    background-repeat: no-repeat;
    background-position: calc(100% - 20px) center;
    background-size: 9px 16px;
    &:hover{
      background-image: url(~@/assets/img/ui/arrow.svg);
    }
  }
  .signup__submit{
    padding-left: 30px;
    padding-right: 15px;
    background-image: url(~@/assets/img/ui/submit-icon_white.svg);
    background-position: calc(0% + 12px) center;
    background-size: 16px 12px;
    background-repeat: no-repeat;
    &:hover{
      background-image: url(~@/assets/img/ui/submit-icon.svg);
    }
  }
</style>