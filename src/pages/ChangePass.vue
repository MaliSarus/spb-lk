<template>
  <div class="personal-cab__user-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__user-data">
            <div class="personal-cab__subtitle">
              {{$t('message.changePass.title')}}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="user-data__form form" v-if="page === 1">
            <ChangePassForm @submitForm="page += 1"/>
          </div>
          <div class="user-data__form form" v-if="page === 2">
            <div class="change-pass__success success">
              <div class="success__image">
                <img :src="successIcon" alt="">
              </div>
              <div class="success__text text">
                Данные успешно обновлены!
              </div>
              <div class="success__button">
                <router-link v-if="!user.tildaUser" tag="button" :to="`/user/${userId}`" class="button button_yellow">{{$t('message.userData.success.link')}}</router-link>
                <button v-else type="button" class="button button_yellow" @click="$router.push(`/user/${userId}/user-data`)">{{$t('message.userData.success.link')}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


  import ChangePassForm from "../components/PersonalCab/ChangePass/ChangePassForm";
  import successIcon from "@/assets/img/ui/success-signup.svg";
  // eslint-disable-next-line no-unused-vars
  import setTitle from "../helpers/title";
  import {mapGetters} from 'vuex'

  export default {
    name: "ChangePass",
    components: {ChangePassForm},
    data() {
      return {
        page: 1,
        successIcon,
        userId: this.$route.params.id
      }
    },
    computed:{
      ...mapGetters(["user"])
    },
    // created() {
    //   setTitle(this.$i18n.t('message.pagesTitle.changePass'))
    // }
  }
</script>

<style lang="scss" scoped>
  .change-pass__success{
    width: 100%;
    max-width: 300px;
  }

  .success{
    &__image{
      width: 140px;
      height: 140px;
      margin: 0 auto 15px;
      @media screen and (min-width: $lg-width){
        margin-bottom: 30px;
      }
      img{
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: contain;
      }
    }
    &__text{
      text-align: center;
      font-size: 16px;
      line-height: 18px;
      margin-bottom: 15px;
      @media screen and (min-width: $lg-width){
        font-size: 18px;
        line-height: 21px;
        margin-bottom: 30px;
      }
    }
    &__button{
      button{
        padding-top: 8px;
        padding-bottom: 8px;
        width: 100%;
      }
    }
  }

</style>