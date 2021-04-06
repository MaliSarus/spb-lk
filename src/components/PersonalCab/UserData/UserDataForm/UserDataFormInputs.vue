<template>
  <div class="user-data__form-grid">
    <label for="user-birth">{{$t('message.userData.inputs.birthday')}}</label>
    <DateInput v-model="formInputs.birthday" input-id="user-birth"/>

    <label for="user-country">{{$t('message.userData.inputs.country')}}</label>
    <Select v-model="formInputs.country" input-id="user-country" :options="countriesWithoutId"/>

    <label for="user-city" v-if="countryId === 1">{{$t('message.userData.inputs.city')}}</label>
    <Select v-model="formInputs.city" input-id="user-city" :options="russiaCities" v-if="countryId === 1"/>

    <label for="user-phone">{{$t('message.userData.inputs.phone')}}</label>
    <Input v-model="formInputs.phone" input-id="user-phone" input-type="tel" @input="inputCheck"/>

    <label for="user-company">{{$t('message.userData.inputs.company')}}</label>
    <Input v-model="formInputs.company" input-id="user-company"/>

    <label for="user-position">{{$t('message.userData.inputs.position')}}</label>
    <Input v-model="formInputs.position" input-id="user-position"/>

    <label for="user-department">{{$t('message.userData.inputs.department')}}</label>
    <Select v-model="formInputs.department" input-id="user-department"
            :options="departments"/>

    <label for="user-rank">{{$t('message.userData.inputs.rank')}}</label>
    <Select v-model="formInputs.rank" input-id="user-rank" :options="ranks"/>

    <label for="user-degree">{{$t('message.userData.inputs.degree')}}</label>
    <Select v-model="formInputs.degree" input-id="user-degree" :options="degrees"/>

  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Select from "@/components/UI/Select";
  import Input from "@/components/UI/Input";
  import DateInput from "@/components/UI/DateInput";

  export default {
    name: "UserDataFormInputs",
    components: {
      Select, Input, DateInput
    },
    props: ['formInputs'],
    model: {
      prop: 'formInputs',
      event: 'formInputsChange',
    },
    methods: {
      inputCheck(e) {
        console.log(e)
      }
    },
    computed: {
      ...mapGetters(["russiaCities", "countries", "departments", "ranks", "degrees"]),
      countriesWithoutId() {
        return this.countries.map((country) => country.name);
      },
      countryId() {
        if (this.formInputs.country) {
          return +this.countries.find(
            (country) => country.name === this.formInputs.country
          ).id
        } else {
          return ''
        }
      },
    },

  }
</script>

<style lang="scss" scoped>
  .user-data {
    &__form {
      display: flex;
      justify-content: center;
      width: 100%;
      max-width: none;
      border-radius: 0;
      border: none;
      box-shadow: none;

      form {
        width: 100%;
        max-width: 540px;
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
          grid-column: 2 / 3;

        }
      }

    }
  }

</style>