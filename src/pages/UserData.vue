<template>
  <div>
    <div class="personal-cab__user-page">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="personal-cab__user-data">
              <div class="personal-cab__subtitle">
                Персональная информация
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="user-data__form form">
              <form action="#" @submit.prevent="">
                <div class="user-data__name">
                  Длиннофамильная Елизавета Михайловна
                </div>
                <div v-if="user.verify" class="user-data__verify">
                  Вы успешно подтвердили Ваш статус! Ваш аккаунт верифицирован.
                  В разделе “Оформление участия” для Вас специальные цены.
                </div>
                <div class="user-data__form-grid">
                  <label for="user-birth">Дата рождения</label>
                  <DateInput v-model="userData.birthday" input-id="user-birth"/>
                  <label for="user-country">Страна</label>
                  <Select v-model="userData.country" input-id="user-country"/>
                  <label for="user-city">Город</label>
                  <Select v-model="userData.city" input-id="user-city"/>
                  <label for="user-phone">Телефон</label>
                  <Input v-model="userData.phone" input-id="user-phone"/>
                  <label for="user-company">Учреждение</label>
                  <Input v-model="userData.company" input-id="user-company"/>
                  <label for="user-position">Должность</label>
                  <Input v-model="userData.position" input-id="user-position"/>
                  <label for="user-department">Специализация</label>
                  <Select v-model="userData.department" input-id="user-department"/>
                  <label for="user-rank">Ученое звание</label>
                  <Select v-model="userData.rank" input-id="user-rank"/>
                  <label for="user-degree">Ученая степень</label>
                  <Select v-model="userData.degree" input-id="user-degree"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  // import Input from "../components/UI/Input";
  import DateInput from "../components/UI/DateInput";
  import Select from "../components/UI/Select";
  import Input from "../components/UI/Input";

  export default {
    name: "UserData",
    components: {Input, Select, DateInput},
    computed: {
      ...mapGetters(['user']),
      userData:{
        get(){
          return this.user
        },
        set(val){
          this.userData = val;
        }
      }
    },
    methods:{
      ...mapActions(['fetchUser'])
    },
    created() {
      this.fetchUser()
    }
  }
</script>

<style lang="scss" scoped>
  .user-data {
    &__form{
      display: flex;
      justify-content: center;
      width: 100%;
      max-width: none;
      border-radius: 0;
      border: none;
      box-shadow: none;
      form{
        width: 100%;
        max-width: 540px;
      }
    }
    &__form-grid {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 15px 20px;
      align-items: center;

      label {
        grid-column: 1 / 2;
        font-size: 14px;
        line-height: 16px;
        color: #282828;
      }

      .form__input {
        grid-column: 2 / 3;
      }

    }
  }
</style>