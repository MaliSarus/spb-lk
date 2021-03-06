<template>
  <div class="form-wrapper">
    <form action="#" @submit.prevent="changeData" v-if="page === 1">
      <div class="user-data__name">
        {{userForm.name}}
        <div class="user-data__email">
          {{userForm.email}}
        </div>
        <div class="user-data__rename">
          <v-popover offset="20" placement="right" style="height: 100%">
            <!-- This will be the popover target (for the events and position) -->
            <div style="width: 18px;height: 18px;"></div>
            <!-- This will be the content of the popover -->
            <template slot="popover">
              <button class="tooltip__close" v-close-popover :style="{backgroundImage:`url(${tooltipClose})`}"></button>
              <div class="tooltip__title">
                {{$t('message.userData.tooltip.title')}}

              </div>
              <div class="tooltip__body text">
                {{$t('message.userData.tooltip.text')}}

              </div>
              <router-link :to="{name:'ChangeFIO'}" tag="button" class="tooltip__button button button_yellow" >
                {{$t('message.userData.tooltip.link')}}
              </router-link>
            </template>
          </v-popover>
        </div>

      </div>
      <hr>
      <div v-if="isVerify" class="user-data__verify" v-html="$t('message.userData.verify.verified')"/>
      <Checkbox v-if="!isVerify" v-model="verifyCheck" input-id="user-verify"
                class="user-data__verify-check">
        {{$t('message.userData.verify.checkbox')}}
      </Checkbox>
      <div class="user-data__verify-no" v-if="!isVerify && verifyCheck">
        <p>
          {{$t('message.userData.verify.notVerified')}}
        </p>
        <button class="button button_yellow" @click="toVerify">{{$t('message.userData.verify.link')}}</button>
      </div>

      <UserDataFormInputs v-model="userForm" @otherDepartmentChange="otherDepartment = $event"/>

      <div class="user-data__controls">
        <div class="row">
          <div class="col-12 col-lg-6">
            <router-link tag="button" type="button" :to="{name: 'ChangePass'}"
                         class="button button_yellow button_transparent user-data__pass">
              {{$t('message.userData.buttons.changePass')}}
            </router-link>
          </div>
          <div class="col-12 col-lg-6">
            <button type="submit" class="button button_yellow user-data__submit">
              {{$t('message.userData.buttons.save')}}
            </button>
          </div>
        </div>
      </div>
    </form>
    <form @submit.prevent="page = 1" v-if="page === 2">
      <div class="user-data__success-image"><img :src="succesIcon" alt=""></div>
      <div class="user-data__success-text">{{$t('message.userData.success.text')}}</div>
      <div class="user-data__success-button">
        <router-link v-if="!user.tildaUser" tag="button" :to="'/user/' + $route.params.id" class="button button_yellow">
          {{$t('message.userData.success.link')}}
        </router-link>
        <button v-else type="submit" class="button button_yellow">{{$t('message.userData.success.link')}}</button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from "axios";
  import Checkbox from "../../../UI/Checkbox";
  import {mapGetters, mapMutations} from 'vuex'
  import UserDataFormInputs from "./UserDataFormInputs";
  import tooltipClose from "@/assets/img/ui/tooltip-close.svg"
  import succesIcon from "@/assets/img/ui/success-signup.svg"
  import {setIsTildaUser} from "@/helpers/defaultValues";

  export default {
    name: "UserDataForm",
    components: {UserDataFormInputs, Checkbox},
    data() {
      return {
        page: 1,
        isTooltipOpen: false,
        tooltipClose,
        succesIcon,
        verifyCheck: this.ordinatorCheck,
        otherDepartment: '',
      }
    },
    props:['ordinatorCheck'],
    computed: {
      ...mapGetters(['user', 'countries']),
      userForm: {
        get() {
          return this.user
        },
        set(value) {
          this.setUser(value)
        }
      },
      isVerify() {
        return this.userForm.ordinator && this.userForm.verify
      }
    },

    methods: {
      ...mapMutations(["setUser"]),
      toVerify(){
        this.$router.push({name:'Verify'})
        this.changeData();
      },
      countryToId(countryName) {
        return +this.countries.find(
          (country) => country.name === countryName
        ).id;
      },

      changeData() {
        const data = {
          birthday: this.userForm.birthday,
          country: this.countryToId(this.userForm.country),
          city: this.countryToId(this.userForm.country) === 1 ? this.userForm.city : '',
          company: this.userForm.company,
          position: this.userForm.position,
          department: this.otherDepartment !== '' ? this.otherDepartment : this.userForm.department,
          rank: this.userForm.rank,
          degree: this.userForm.degree,
          ordinator: this.verifyCheck,
          phone: this.userForm.phone
        }
        axios
          .put('/api/user/', data)
          .then(res => {
            if (res.data.status === 'ok') {
              this.page = 2;
              this.setUser(res.data.user)
              setIsTildaUser(res.data.user.tildaUser)
            }
          })
      }
    },
  }
</script>

<style lang="scss" scoped>
  hr {
    margin: 15px 0;
    border: none;
    border-top: 1px solid #e1e1e1;
    @media screen and (min-width: $lg-width) {
      margin: 20px 0;
    }
  }

  .form-wrapper {
    width: 100%;
    max-width: 540px;
  }

  form {
    width: 100%;
  }

  .v-popover {
    display: flex;
    cursor: pointer;
  }

  .tooltip {
    &__close {
      position: absolute;
      right: 10px;
      top: 10px;
      background-repeat: no-repeat;
      background-color: transparent;
      background-size: 13px;
      background-position: center;
      width: 25px;
      height: 25px;
      border: none;
      outline: none;
      border-radius: 100%;
      transition: box-shadow .2s;

      &:hover {
        box-shadow: 0 0 10px rgba($accent-color, .1);
      }
    }

    &__title {
      color: $accent-color;
      font-weight: bold;
      margin-bottom: 30px;
    }

    &__body {
      color: $main-text-color;
      font-size: 14px;
      line-height: 16px;
    }

    &__button {
      width: 100%;
      padding-top: 8px;
      padding-bottom: 8px;
      margin-top: 20px;
    }
  }

  .user-data {
    &__verify {
      position: relative;
      background: #F1FFEB;
      border-radius: 2px;
      font-size: 14px;
      line-height: 16px;
      padding: 20px 15px 20px 70px;
      color: #375B28;
      margin-bottom: 15px;

      &::before {
        position: absolute;
        left: 15px;
        top: 50%;
        display: block;
        content: '';
        width: 35px;
        height: 35px;
        background-position: 0 0;
        background-repeat: no-repeat;
        transform: translateY(-50%);
      }
    }

    &__verify-no {
      position: relative;
      background: #FFF6F4;
      border-radius: 2px;
      font-size: 14px;
      line-height: 16px;
      padding: 15px;
      color: #975858;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;

      p {
        margin: 0;
        margin-bottom: 10px;
      }

      .form__submit {
        text-decoration: none;
        display: inline-block;
        margin: 0 auto;
        width: auto;
      }
    }

    &__verify-check {
      margin-bottom: 15px;

      label {
        font-size: 14px !important;
        line-height: 16px !important;
        color: $main-text-color !important;
      }
    }

    &__rename {
      position: absolute;
      right: 0;
      top: 50%;
      width: 18px;
      height: 18px;
      transform: translateY(-50%);
      border: none;
    }

    &__name {
      position: relative;
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
      color: $accent-color;
      padding-right: 18px;

      @media screen and (min-width: $lg-width) {
        font-size: 24px;
        line-height: 28px;
      }
      .user-data__email{
        color: $light-text-color;
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        @media screen and (min-width: $lg-width) {
          font-size: 16px;
          line-height: 20px;

        }
      }
    }


    &__controls {
      margin-top: 15px;
      @media screen and (min-width: $lg-width) {
        margin-top: 20px;
      }
    }

    &__submit, &__pass {
      width: 100%;
    }

    &__pass {
      margin-bottom: 15px;
      @media screen and (min-width: $lg-width) {
        margin-bottom: 0;

      }
    }

    &__submit {
      padding-left: 35px;
      padding-right: 35px;
      background-position: calc(100% - 35px) center;
      background-repeat: no-repeat;
    }
  }

  .user-data__rename-tooltip {
    display: block !important;
    z-index: 10000;
    max-width: 350px;
  }

  .tooltip {

    &-header {
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: $accent-color;
      margin-bottom: 20px;
    }

    &-body {
      font-size: 14px;
      line-height: 16px;
      color: $light-text-color;
      margin-bottom: 20px;
    }

    &-button {
      width: 100%;
      padding: 8px;
      font-size: 14px;
      line-height: 16px;
    }
  }
  .user-data__success{
    &-image{
      width: 140px;
      height: 140px;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    &-text{
      font-size: 18px;
      line-height: 21px;
      text-align: center;
      margin-bottom: 30px;
    }
    &-button{
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      button{
        width: 100%;
      }
    }
  }
</style>