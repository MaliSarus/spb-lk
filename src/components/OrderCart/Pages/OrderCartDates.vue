<template>
  <div>
    <div class="order-cart__dates">
      <p v-if="$attrs.productsDone" class="done-text" style="text-align: center; font-size: 24px;">
        {{$t('message.orderCart.done')}}</p>
      <orders-list v-else/>
    </div>
    <div class="container" v-show="dates">
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <button class="button button_yellow clear-button" type="button" @click="clearSelect">
            {{$t('message.orderCart.orderCartDates.clearSelect')}}
          </button>
        </div>
      </div>
    </div>
    <div class="container" v-show="!$attrs.productsDone">
      <div class="row">
        <div class="col-12">
          <countdown :end-time="new Date(2021, 4, 16).getTime()"
                     v-show="new Date().getTime() < new Date(2021, 4, 16).getTime()"
                     class="order-cart__countdown">
            <template
              v-slot:process="{ timeObj }">

              <span>
                {{$t('message.orderCart.orderCartDates.countdown.text')}}
                <b>
                  {{$t('message.orderCart.orderCartDates.countdown.time',{
                    d:timeObj.d,
                    h: timeObj.h,
                    m:timeObj.m
                  })}}
                </b>
              </span>
            </template>
          </countdown>
          <div class="advantages-table">
            <table>
              <thead>
              <tr>
                <th></th>
                <th>{{$t('message.orderCart.orderCartDates.table.head[0]')}}</th>
                <th>{{$t('message.orderCart.orderCartDates.table.head[1]')}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in tableBody" :key="'tr_'+index">
                <td>{{data.title}}</td>
                <td :class="{yes: data.offline, no: !data.offline }"></td>
                <td :class="{yes: data.offline, no: !data.online}"></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import OrdersList from "@/components/OrderCart/OrdersList";
  import yesIcon from "@/assets/img/ui/yes.svg"
  import noIcon from "@/assets/img/ui/no.svg"
  import {mapMutations, mapGetters} from 'vuex'
  import {eventBus} from "@/main";

  export default {
    name: "OrderCartDates",
    data() {
      return {
        yesIcon,
        noIcon,
      }
    },
    components: {
      OrdersList
    },
    methods: {
      ...mapMutations(["deleteAllDates"]),
      clearSelect() {
        this.deleteAllDates();
        eventBus.$emit('clearDates');
      }
    },
    computed: {
      ...mapGetters(["userCart"]),
      dates() {
        return !!this.userCart.filter(product => product.type === 'single' || product.type === 'all').length
      },
      tableBody() {
        return this.$t('message.orderCart.orderCartDates.table.body');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .advantages-table {
    border-radius: 10px;
    box-shadow: 0px 0px 25px 0px rgb(0 0 0 / 10%);
    overflow: auto;


    table {
      min-width: 700px;
      width: 100%;
      border-collapse: collapse;

      thead {
        background: $yellow-color;

        th {
          font-weight: normal;
        }
      }

      tbody {
        tr {
          &:not(:last-child) {
            border-bottom: 1px solid #eee;
          }
        }

        td {
          background-position: center;
          background-repeat: no-repeat;

          &:not(:last-child) {
            border-right: 1px solid #eee;
          }

          &.yes {
            background-image: url(~@/assets/img/ui/yes.svg);
          }

          &.no {
            background-image: url(~@/assets/img/ui/no.svg);
          }
        }
      }
    }

    th, td {
      padding: 20px;
    }


  }

  .order-cart {
    &__dates {
      margin: 0 auto 30px;
      width: calc(100% - 40px);
      @media screen and (min-width: $xl-width) {
        width: calc(100% - 100px);
        margin: 0 auto 50px;

      }
      @media screen and (min-width: 1440px) {
        width: calc(100% - 200px);
      }
    }

    &__countdown {

      border: 1px solid #CC1E1E;
      background: transparent;
      border-radius: 10px;
      padding: 10px;
      text-align: center;
      display: block;
      color: #CC1E1E;

      margin-bottom: 20px;
      @media screen and (min-width: $lg-width) {
        margin-bottom: 40px;
      }

    }
  }

  .clear-button {
    font-size: 14px;
    font-weight: 500;
    padding: 8px;
    margin-top: -10px;
    margin-bottom: 20px;
    @media screen and (min-width: $lg-width) {
      margin-top: -20px;
      margin-bottom: 40px;

    }
  }
</style>