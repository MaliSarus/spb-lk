<template>
  <section class="personal-cab">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__title">
            <h1>Личный кабинет</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="personal-cab__content-block">
      <form action="#" @submit.prevent="">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="personal-cab__subtitle">Выберите формат и даты участия в конгрессе:</div>
            </div>
            <div class="col-12">
              <div class="personal-cab__dates">
                <ul class="dates__list">
                  <li v-for="(date,index) in dates" :key="'date_'+index">
                    <div class="dates__item date" :class="{
                      'all-dates-checked': isAllDatesChecked
                    }">
                      <div class="date__head">{{ date.date }}</div>
                      <div class="date__content">
                        <div class="date__price">
                          <input
                            :disabled="isAllDatesChecked"
                            type="radio"
                            :name="'radio' + index"
                            v-model="date.style"
                            value="online"
                            @click="uncheckRadio($event,date)"
                            v-show="false"
                            :id="'radio-date'+index"
                          >
                          <label :for="'radio-date'+index">
                            <span class="date__price-name">Онлайн</span>
                            <span class="date__price-empty"></span>
                            <span class="date__price-price price">
                              <span class="price_prev">{{date.onlinePrice}}</span>
                              <span class="price_current">{{date.onlinePrice}}</span>
                            </span>
                          </label>

                        </div>
                        <div class="date__price">
                          <input
                            :disabled="isAllDatesChecked"
                            type="radio"
                            :name="'radio' + index"
                            v-model="date.style"
                            value="offline"
                            @click="uncheckRadio($event,date)"
                            v-show="false"
                            :id="'radio-date'+index"
                          >
                          <label :for="'radio-date'+index">
                            <span class="date__price-name">Оффлайн</span>
                            <span class="date__price-empty"></span>
                            <span class="date__price-price price">
                              <span class="price_prev">{{date.offlinePrice}}</span>
                              <span class="price_current">{{date.offlinePrice}}</span>
                            </span>
                          </label>

                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="dates__item date" :class="{
                      'date-checked': isDateChecked
                    }">
                      <div class="date__head">{{ allDates.date }}</div>
                      <div class="date__content">
                        <div class="date__price"><input type="radio" name="radio-all" v-model="allDates.style"
                                                        value="online" @click="uncheckRadio($event,allDates)">Онлайн {{
                            allDates.onlinePrice
                          }}
                        </div>
                        <div class="date__price"><input type="radio" name="radio-all" v-model="allDates.style"
                                                        value="offline" @click="uncheckRadio($event,allDates)">Оффлайн
                          {{ allDates.offlinePrice }}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "PersonalCab",
  data() {
    return {
      dates: [
        {
          date: '17 июня',
          style: '',
          onlinePrice: 3000,
          offlinePrice: 10000,
        },
        {
          date: '18 июня',
          style: '',
          onlinePrice: 3000,
          offlinePrice: 10000,
        },
        {
          date: '19 июня',
          style: '',
          onlinePrice: 3000,
          offlinePrice: 10000,
        }
      ],
      allDates: {
        date: 'Все дни',
        style: '',
        onlinePrice: 70000,
        offlinePrice: 100000,
      }
    }
  },
  computed: {
    isDateChecked() {
      return this.dates.filter(date => date.style !== '').length !== 0
    },
    isAllDatesChecked() {
      return this.allDates.style !== ''
    }
  },
  methods: {
    uncheckRadio($event, date) {
      if (date.style === $event.target.value) {
        $event.target.checked = false;
        date.style = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-cab {
  flex-grow: 1;
  width: 100%;
  &__title{
    padding-top: 20px;
    padding-bottom: 25px;
    text-align: center;
    h1{
      margin: 0;
      font-weight: bold;
      font-size: 48px;
      line-height: 56px;
      text-align: center;
      color: #013066;
    }
  }
  &__subtitle{
    font-size: 32px;
    line-height: 37px;
    text-align: center;
    color: #000000;
    margin-bottom: 40px;
  }
  &__content{
    &-block{
      width: 100%;
      background: white;
      padding-top: 45px;
      padding-bottom: 110px;
    }
  }
  &__dates{
    .dates{
      &__list{
        list-style: none;
        margin: 0 -15px;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        li{
          flex-basis: calc(100% / 5);
          flex-grow: 1;
          padding: 0 15px;
        }
      }
      &__item{
        background: #F4F9FF;
        border: 1px solid #F3F3F3;
        border-radius: 10px;
        overflow: hidden;
        transition: opacity .2s;
        .date{
          &__head{
            background: #013066;
            font-size: 24px;
            line-height: 28px;
            text-align: center;
            color: #FFFFFF;
            padding: 10px ;
          }
          &__content{
            padding: 30px 15px;
          }
          &__price{
            label{
              display: flex;
            }
            &-empty{
              flex-grow: 1;
              background-image: url("/assets/img/ui/empty-dots.svg");
              background-position: left calc(100% - 2px);
              background-repeat: repeat-x;
              margin: 0 3px;
            }
          }
        }
      }
    }
  }
}

.date-checked, .all-dates-checked {
  opacity: .5;
  pointer-events: none;
}
</style>