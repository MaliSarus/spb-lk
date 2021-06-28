<template>
  <ul class="dates__list">
    <Order
        v-for="(date, index) in singleDates"
        :date="date"
        :index="index"
        type="single"
        :is-all-check="everySingleDatesCheckedToAllId ? true : false"
        :key="'single-date_'+index"
        :disabled="isAllDatesChecked"/>
    <Order
        v-for="(date, index) in allDates"
        @select="selectDate"
        :date="date"
        :index="index"
        type="all"
        :all-check-id="everySingleDatesCheckedToAllId"
        :key="'all-dates_' + index"
        :disabled="isSingleDatesChecked"/>
  </ul>
</template>

<script>
  import Order from "./Order";

  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: "OrdersList",
    components: {Order},
    model: {
      props: 'selectDate',
      event: 'selectDate'
    },
    data() {
      return {
        selectedDates: []
      }
    },
    methods: {
      ...mapMutations(["deleteAllSingleProducts"]),
      selectDate(date) {
        if (date.id) {
          const clearedDates = this.selectedDates.filter((selectedDate) => selectedDate.index !== date.index);
          clearedDates.push(date);
          this.selectedDates = clearedDates;
        } else {
          this.selectedDates = this.selectedDates.filter((selectedDate) => selectedDate.index !== date.index);
        }
      }
    },
    computed: {
      ...mapGetters(["products", "userCart"]),
      singleDates() {
        return this.products.filter((date) => date.sectionType === "single")
      },
      allDates() {
        return this.products.filter((date) => date.sectionType !== "single");
      },
      isSingleDatesChecked() {
        return this.userCart.some(product => product.type === 'single') && !this.isEverySingleDatesChecked;
      },
      isAllDatesChecked() {
        return this.userCart.some(product => product.type === 'all') || this.isEverySingleDatesChecked;
      },
      isEverySingleDatesChecked() {
        const singleDates = this.userCart.filter(product => product.type === 'single');
        const isEveryIsOffline = singleDates.every(product => product.style === 'offline');
        const isEveryIsOnline = singleDates.every(product => product.style === 'online');
        let isEqualLength = false;
        if (isEveryIsOnline || isEveryIsOffline){
             isEqualLength = singleDates.length === this.singleDates.length
        }
        if (this.allDates.length) {
          return isEqualLength || (this.userCart.filter(product => product.type === 'all').length !== 0)
        }
        else {
          return false
        }
      },
      everySingleDatesCheckedToAllId() {
        let checkId = ''
        if (this.isEverySingleDatesChecked) {
          const offlineChecked = this.userCart.filter(product => product.style === 'offline').length === this.singleDates.length
          const onlineChecked = this.userCart.filter(product => product.style === 'online').length === this.singleDates.length;
          if (offlineChecked && this.allDates.length) {
            checkId = this.allDates[0].items.filter(item => item.type === 'all')[0].id
          } else if (onlineChecked && this.allDates.length) {
            checkId = this.allDates[0].items.filter(item => item.type === 'online')[0].id
          }
        }
        return checkId
      }
    },
  }
</script>

<style lang="scss" scoped>
  .dates {
    &__list {
      list-style: none;
      margin: -15px;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      li {
        flex-basis: 100%;
        padding: 15px;
        @media screen and (min-width: $lg-width) {
          flex-basis: calc(100% / 3);
        }
        @media screen and (min-width: 1440px) {
          flex-basis: calc(100% / 5);
          min-width: 200px;
        }
      }
    }
  }

</style>