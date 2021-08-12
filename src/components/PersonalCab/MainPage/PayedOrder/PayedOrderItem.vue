<template>
  <li class="order d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-between">
    <div class="order__text">
      <slot/>
    </div>
    <div class="order__button" :class="{'no-link': !hasLink}">
      <a v-if="linkClass !== 'next'"
         class="order__btn"
         :class="linkClass"
         :href="orderInfo.url">
        {{$t('message.mainPage.payedOrders.' + linkClass)}}
      </a>
      <a v-else
         class="order__btn"
         :class="linkClass">{{$t('message.mainPage.payedOrders.' + linkClass)}}</a>
    </div>
  </li>
</template>

<script>
  import moment from 'moment-timezone'
  export default {
    name: "PayedOrderItem",
    props: ['orderInfo'],
    computed: {
      linkClass() {
        // let currentDate = new Date()
        let currentDate = moment().tz('Europe/Moscow').format()
        const hasDate = ({}).hasOwnProperty.call(this.orderInfo, 'date_start')
        const dateStart = hasDate ? moment(this.orderInfo.date_start.replace(/ /g, "T")).format() : null
        const dateEnd = hasDate ? moment(this.orderInfo.date_end.replace(/ /g, "T")).format(): null
        let result = 'link';

        if (dateStart && dateEnd) {
          if (moment(currentDate).isAfter(dateEnd)) {
            result = 'prev'
            return result;
          }
          if (moment(currentDate).isBefore(dateStart)) {
            result = 'next'
            return result;
          }
          if (moment(currentDate).isBetween(dateStart, dateEnd)) {
            result = 'current'
          }
        }

        return result
      },
      hasLink() {
        let result = false
        const hasDate = ({}).hasOwnProperty.call(this.orderInfo, 'date_start')
        if (!hasDate && this.orderInfo.url !== '') {
          result = true
        } else result = this.orderInfo.date_start !== '' && this.orderInfo.url !== '';
        return result

      }
    }
  }
</script>

<style lang="scss" scoped>
  .order {
    padding: 5px;
    @media screen and (min-width: $lg-width) {
      padding: 5px 30px 5px 15px;

    }

    &__text {
      flex-grow: 1;

      p {
        margin: 0;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        @media screen and (min-width: $sm-width) {
          text-align: left;
        }
        @media screen and (min-width: $lg-width) {
          font-size: 16px;
          line-height: 19px;
        }
      }
    }

    &__button {
      width: 100%;
      @media screen and (min-width: $sm-width) {
        max-width: 250px;
      }

      &.no-link {
        a {
          display: none;
        }
      }


    }

    &__btn {
      display: block;
      width: 100%;
      padding: 5px 35px 5px 10px;
      border: 1px solid;
      border-radius: 2px;
      font-size: 14px;
      line-height: 16px;
      text-align: left;
      background-color: white;
      text-decoration: none;
      background-repeat: no-repeat;
      background-position: calc(100% - 9px) center;
      background-size: 25px auto;
      transition: background-color .25s;
      margin: 10px auto 0;
      max-width: 325px;

      @media screen and (min-width: $sm-width) {
        margin: 0;
      }
      @media screen and (min-width: $lg-width) {
        font-size: 16px;
        line-height: 19px;
      }

      &.prev {
        background-color: $yellow-color;
        color: #013066;
        border-color: $yellow-color;
        background-image: url(~@/assets/img/payed-orders/prev.svg);

        &:hover {
         background-color: transparent;
        }
      }

      &.current {
        color: #282828;
        background-color: $yellow-color;
        border-color: $yellow-color;
        background-image: url(~@/assets/img/payed-orders/current.svg);

        &:hover {
          background-color: #fff;
        }
      }

      &.next {
        background-color: #EDEDED;
        border-color: #EDEDED;
        color: $light-text-color;
        background-image: url(~@/assets/img/payed-orders/next.svg);
        cursor: not-allowed;
      }

      &.link {
        color: #282828;
        background-color: $yellow-color;
        border-color: $yellow-color;
        background-image: url(~@/assets/img/payed-orders/link.svg);
        background-position: calc(100% - 20px) center;
        background-size: 5px 10px;

        &:hover {
          background-color: #fff;
        }
      }
    }
  }


</style>
