<template>
  <ul class="dates__list">
    <Order v-for="(date, index) in singleDates" @select="selectDate" :date="date" :index="index" type="single"
           :key="'single-date_'+index" :disabled="isAllDatesChecked"/>
    <Order v-for="(date, index) in allDates" @select="selectDate" :date="date" :index="index" type="all"
           :key="'all-dates_' + index" :disabled="isSingleDatesChecked"/>
    <!--    <li v-for="date in allDates" :key="'all-date_'+date.sectionId">-->
    <!--      <div-->
    <!--              class="dates__item date"-->
    <!--              :class="{-->
    <!--                                    'date-checked': false,-->
    <!--                                  }"-->
    <!--      >-->
    <!--        <div class="date__head">{{ date.sectionName }}</div>-->
    <!--        <div class="date__content">-->
    <!--          <div class="date__price">-->
    <!--            <input-->
    <!--                    type="radio"-->
    <!--                    name="radio-all"-->
    <!--                    v-model="allDates.style"-->
    <!--                    value="online"-->
    <!--                    @click="uncheckRadio($event, allDates)"-->
    <!--                    v-show="false"-->
    <!--                    id="radio-all-online"-->
    <!--            />-->
    <!--            <label for="radio-all-online">-->
    <!--              <span class="date__price-name">Онлайн</span>-->
    <!--              <span class="date__price-empty"></span>-->
    <!--              <span class="date__price-price price">-->
    <!--                              <span class="price_prev"></span>-->
    <!--                              <span class="price_current"-->
    <!--                              >{{ date.items[0].price.basePrice}}&nbsp;&#8381;</span-->
    <!--                              >-->
    <!--                            </span>-->
    <!--            </label>-->
    <!--          </div>-->
    <!--          <div class="date__price">-->
    <!--            <input-->
    <!--                    type="radio"-->
    <!--                    name="radio-all"-->
    <!--                    v-model="allDates.style"-->
    <!--                    value="offline"-->
    <!--                    @click="uncheckRadio($event, allDates)"-->
    <!--                    v-show="false"-->
    <!--                    id="radio-all-offline"-->
    <!--            />-->
    <!--            <label for="radio-all-offline">-->
    <!--              <span class="date__price-name">Офлайн</span>-->
    <!--              <span class="date__price-empty"></span>-->
    <!--              <span class="date__price-price price">-->
    <!--                                    <span class="price_prev"></span>-->
    <!--                                    <span class="price_current">{{ date.items[1].price.basePrice }}&nbsp;&#8381;</span>-->
    <!--                                  </span>-->
    <!--            </label>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </li>-->
  </ul>
</template>

<script>
  import Order from "./Order";

  export default {
    name: "OrdersList",
    components: {Order},
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
        flex-basis: calc(100% / 5);
        padding: 15px;
      }
    }
  }

</style>