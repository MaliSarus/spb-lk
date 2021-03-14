<template>
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
            <UserDataForm/>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import UserDataForm from "../components/PersonalCab/UserData/UserDataForm/UserDataForm";
  export default {
    name: "UserData",
    components:{
      UserDataForm
    }
  }
</script>

<style lang="scss" >
.user-data{
  &__form{
    display: flex;
    justify-content: center;
  }
}
</style>