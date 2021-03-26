<template>
  <li class="add-service__item">
    <div class="add-service__left">
      <div class="add-service__name">
        <input v-if="workshop.availability" :id="'workshop-'+workshop.id" type="checkbox" v-model="checked" :checked="workshop.id"
               style="display: none" @change="check">
        <label :for="workshop.availability ? 'workshop-'+workshop.id : ''" :class="{static:!workshop.availability}"><b>{{workshopFullName.type}}</b>{{workshopFullName.name}}</label>
      </div>
    </div>
    <div class="add-service__right">
      <div class="add-service__price">{{workshop.price.basePrice}} &#8381;</div>
      <div class="add-service__link"><a href="#">{{workshop.availability ? $t('message.orderCart.orderCartWorkshops.link.more') : $t('message.orderCart.orderCartWorkshops.link.site')}}</a></div>
    </div>
  </li>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    name: "AdditionalServicesItem",
    props: ['workshop'],
    data() {
      return {
        checked: false
      }
    },
    methods: {
      ...mapMutations(["addProduct", "deleteProduct"]),
      check(){
        console.log(this.checked)
        if (this.checked){
          this.addProduct({
            id: this.workshop.id,
            price: this.workshop.price.basePrice
          })
        }
        else this.deleteProduct(this.workshop.id)
      }
    },
    computed: {
      workshopFullName() {
        const nameArray = this.workshop.name.split(':');
        if (nameArray.length > 1) {
          return {
            type: nameArray[0] + ':',
            name: nameArray[1]
          }
        } else {
          return {
            type: '',
            name: nameArray[0]
          }
        }
      },
    },

  }
</script>

<style lang="scss" scoped>
  $light-blue: #F4F9FF;

  .add-service {
    &__item {
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 16px;
      @media screen and (min-width: $lg-width) {
        font-size: 18px;
        line-height: 21px;
      }

    }

    &__left {
      flex-grow: 1;
      flex-basis: 100%;
      @media screen and (min-width: $lg-width) {
        flex-basis: 70%;

      }
    }

    &__right {
      flex-grow: 1;
      display: flex;
      @media screen and (min-width: $lg-width) {
        flex-basis: 30%;
      }
    }

    &__name {
      padding-left: 20px;
      @media screen and (min-width: $lg-width) {
        padding: 0 0 0 25px;
      }
      input:checked + label{
        &::before{
          background-image: url(~@/assets/img/ui/checkbox_checked.svg);

        }
      }

      label {
        cursor: pointer;
        position: relative;
        display: block;
        padding:  20px;
        color: $accent-color;
        @media screen and (min-width: $lg-width) {
          padding:  30px 20px 30px 45px;

        }

        &::before {
          position: absolute;
          left: 0;
          top: 50%;
          width: 15px;
          height: 15px;
          content: '';
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          transform: translateY(-50%);
          background-image: url(~@/assets/img/ui/checkbox_unchecked.svg);
          @media screen and (min-width: $lg-width) {
            width: 20px;
            height: 20px;
          }
        }
        &.static{
          &::before{
            content: none;
          }
        }
      }

      &:hover {
        background: $light-blue;
      }
    }

    &__price {
      width: 100%;
      max-width: 50%;
      background: $light-blue;
      padding: 10px;
      @media screen and (min-width: $lg-width) {
        padding: 0 10px;
        max-width: 140px;
      }
    }

    &__link {
      flex-grow: 1;

      a {
        display: flex;
        width: 100%;
        height: 100%;
        color: $main-text-color;
        text-decoration: none;
        justify-content: center;
        align-items: center;
        padding: 10px;
        text-align: center;

        @media screen and (min-width: $lg-width) {
          padding: 0 10px;
        }

        &:hover {
          background: $yellow-color;
        }
      }
    }

    &__price, &__link {
      display: flex;
      justify-content: center;
      align-items: center;

    }
  }
</style>