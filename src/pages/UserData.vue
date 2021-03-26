<template>
  <div class="personal-cab__user-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__user-data">
            <div class="personal-cab__subtitle">
              {{$t('message.userData.title')}}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="user-data__form form">
            <UserDataForm :ordinator-check="user.ordinator"/>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import UserDataForm from "../components/PersonalCab/UserData/UserDataForm/UserDataForm";
  import {mapGetters} from 'vuex'
  export default {
    name: "UserData",
    components:{
      UserDataForm
    },
    computed:{
      ...mapGetters(["user"])
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