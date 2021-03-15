<template>
  <ul class="dates__list">
    <Order v-for="(date, index) in singleDates" @select="selectDate" :date="date" :index="index" type="single"
           :key="'single-date_'+index" :disabled="isAllDatesChecked"/>
    <Order v-for="(date, index) in allDates" @select="selectDate" :date="date" :index="index" type="all"
           :key="'all-dates_' + index" :disabled="isSingleDatesChecked"/>
  </ul>
</template>

<script>
  import Order from "./Order";

  export default {
    name: "OrdersList",
    components: {Order},
    model:{
      props: 'selectDate',
      event: 'selectDate'
    },
    props: {
      dates: Array,
    },
    data() {
      return {
        selectedDates: []
      }
    },
    methods: {
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
      singleDates() {
        return this.dates.filter((date) => date.sectionType === "single")
      },
      allDates() {
        return this.dates.filter((date) => date.sectionType !== "single");
      },
      isSingleDatesChecked() {
        let result = false;
        this.singleDates.forEach(date => {
          date.items.forEach(item => {
            if (this.selectedDates.some(sd => +sd.id === +item.id)) {
              result = true;
            }
          })
        })
        return result;
      },
      isAllDatesChecked() {
        let result = false;
        this.allDates.forEach(date => {
          date.items.forEach(item => {
            if (this.selectedDates.some(sd => +sd.id === +item.id)) {
              result = true;
            }
          })
        })
        return result;
      }
    },
    watch:{
      selectedDates(val){
        this.$emit('selectDate', val)
      }
    }
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
        @media screen and (min-width: $lg-width){
          flex-basis: calc(100% / 5);
          min-width: 200px;
        }
      }
    }
  }

</style>