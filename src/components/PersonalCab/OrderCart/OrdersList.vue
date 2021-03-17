<template>
  <ul class="dates__list">
    <Order
            v-for="(date, index) in singleDates"
            :date="date"
            :index="index"
            type="single"
            :is-all-check="everyDingleDatesCheckedToAllId ? true : false"
            :key="'single-date_'+index"
            :disabled="isAllDatesChecked"/>
    <Order
            v-for="(date, index) in allDates"
            @select="selectDate"
            :date="date"
            :index="index"
            type="all"
            :all-check-id="everyDingleDatesCheckedToAllId"
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
        const allChecked = this.userCart.filter(product => product.type === 'single').length === this.singleDates.length;
        return allChecked
      },
      everyDingleDatesCheckedToAllId() {
        let checkId = ''
        if (this.isEverySingleDatesChecked) {
          const offlineChecked = this.userCart.every(product => product.style === 'offline')
          const onlineChecked = this.userCart.every(product => product.style === 'online')
          console.log(offlineChecked)
          if (offlineChecked) {
            checkId = this.allDates[0].items.filter(item => item.type === 'offline')[0].id
          } else if (onlineChecked){
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
          flex-basis: calc(100% / 5);
          min-width: 200px;
        }
      }
    }
  }

</style>