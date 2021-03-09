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
                  <DateInput input-id="user-birth"/>
                  <label for="user-birth">Дата рождения</label>
                  <DateInput input-id="user-birth"/>
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
  import {mapGetters} from 'vuex'
  // import Input from "../components/UI/Input";
  import DateInput from "../components/UI/DateInput";

  export default {
    name: "UserData",
    components: {DateInput},
    computed: {
      ...mapGetters(['user'])
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