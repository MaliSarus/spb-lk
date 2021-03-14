<template>
  <form action="#" @submit.prevent="changeData">
    <div class="user-data__name">
      {{userForm.name}}
      <div class="user-data__rename" @click="()=>{this.isTooltipOpen = !this.isTooltipOpen}">
      </div>
    </div>
    <hr>
    <div v-if="userForm.verify" class="user-data__verify">
      Вы успешно подтвердили Ваш статус! <b>Ваш аккаунт верифицирован.</b>
      В разделе “Оформление участия” для Вас специальные цены.
    </div>
    <Checkbox v-if="!userForm.verify" v-model="verifyCheck" input-id="user-verify"
              class="user-data__verify-check">Являюсь клиническим ординатором или
      очным аспирантом кафедры
    </Checkbox>
    <div class="user-data__verify-no" v-if="verifyCheck">
      <p>
        Обращаем внимание, что Вам необходимо подтвердить, что Вы являетесь клиническим
        ординатором или
        очным аспирантом кафедры: пластическая хирургия / челюстно-лицевая хирургия /
        косметология /
        дерматология.
      </p>
      <router-link :to="{name:'Verify'}" class="form__submit">Перейти к верификации</router-link>
    </div>

    <UserDataFormInputs v-model="userForm"/>

    <div class="user-data__controls">
      <div class="row">
        <div class="col-12 col-lg-6">
          <router-link tag="button" :to="{name: 'ChangePass'}"
                       class="button button_yellow button_transparent user-data__pass">
            Изменить пароль
          </router-link>
        </div>
        <div class="col-12 col-lg-6">
          <button type="submit" class="button button_yellow user-data__submit">Сохранить
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import axios from "axios";
  import Checkbox from "../../../UI/Checkbox";
  import {mapGetters, mapMutations} from 'vuex'
  import UserDataFormInputs from "./UserDataFormInputs";

  export default {
    name: "UserDataForm",
    components: {UserDataFormInputs, Checkbox},
    data() {
      return {
        verifyCheck: false,
        isTooltipOpen: false,
      }
    },
    computed: {
      ...mapGetters(['user','countries']),
      userForm: {
        get() {
          return this.user
        },
        set(value) {
          this.setUser(value)
        }
      },
    },

    methods: {
      ...mapMutations(["setUser"]),
      countryToId(countryName) {
        return +this.countries.find(
          (country) => country.name === countryName
        ).id;
      },

      changeData() {

        const data = {
          birthday: this.userForm.birthday,
          country: this.countryToId(this.userForm.country),
          city: this.userForm.city,
          company: this.userForm.company,
          position: this.userForm.position,
          department: this.userForm.department,
          rank: this.userForm.rank,
          degree: this.userForm.degree,
          ordinator: this.userForm.ordinator,
        }
        axios
          .put('/api/user/', data)
          .then(console.log)
      }
    },
  }
</script>

<style scoped>

</style>