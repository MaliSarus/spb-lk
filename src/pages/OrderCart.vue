<template>
  <div class="personal-cab__user-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__user-data">
            <div class="personal-cab__subtitle">
              Выберите формат и даты участия в конгрессе:
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="user-data__form form">
            <form action="#" @submit.prevent="">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <Loader v-if="isLoading"/>
                    <div v-else class="personal-cab__dates">
                      <ul class="dates__list">
                        <li v-for="(date, index) in singleDates" :key="'date_' + date.sectionId">
                          <div
                              class="dates__item date"
                              :class="{
                        'all-dates-checked': false,
                      }"
                          >
                            <div class="date__head">{{ date.sectionName}}</div>
                            <div class="date__content">
                              <div class="date__price">
                                <input
                                    :disabled="false"
                                    type="radio"
                                    :name="'radio' + index"
                                    v-model="date.style"
                                    value="online"
                                    @click="uncheckRadio($event, date)"
                                    v-show="false"
                                    :id="'radio-date-' + index + '-online'"
                                />
                                <label :for="'radio-date-' + index + '-online'">
                                  <span class="date__price-name">Онлайн</span>
                                  <span class="date__price-empty"></span>
                                  <span class="date__price-price price">
                              <span class="price_prev"></span>
                              <span class="price_current"
                              >{{ date.items[0].price.basePrice}}&nbsp;&#8381;</span
                              >
                            </span>
                                </label>
                              </div>
                              <div class="date__price">
                                <input
                                    :disabled="false"
                                    type="radio"
                                    :name="'radio' + index"
                                    v-model="date.style"
                                    value="offline"
                                    @click="uncheckRadio($event, date)"
                                    v-show="false"
                                    :id="'radio-date-' + index + '-offline'"
                                />
                                <label :for="'radio-date-' + index + '-offline'">
                                  <span class="date__price-name">Офлайн</span>
                                  <span class="date__price-empty"></span>
                                  <span class="date__price-price price">
                              <span class="price_prev"></span>
                              <span class="price_current"
                              >{{ date.items[1].price.basePrice}}&nbsp;&#8381;</span
                              >
                            </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div
                              class="dates__item date"
                              :class="{
                        'date-checked': false,
                      }"
                          >
                            <div class="date__head">{{ allDates.date }}</div>
                            <div class="date__content">
                              <div class="date__price">
                                <input
                                    type="radio"
                                    name="radio-all"
                                    v-model="allDates.style"
                                    value="online"
                                    @click="uncheckRadio($event, allDates)"
                                    v-show="false"
                                    id="radio-all-online"
                                />
                                <label for="radio-all-online">
                                  <span class="date__price-name">Онлайн</span>
                                  <span class="date__price-empty"></span>
                                  <span class="date__price-price price">
                              <span class="price_prev"></span>
                              <span class="price_current"
                              >{{ allDates.onlinePrice }}&nbsp;&#8381;</span
                              >
                            </span>
                                </label>
                              </div>
                              <div class="date__price">
                                <input
                                    type="radio"
                                    name="radio-all"
                                    v-model="allDates.style"
                                    value="offline"
                                    @click="uncheckRadio($event, allDates)"
                                    v-show="false"
                                    id="radio-all-offline"
                                />
                                <label for="radio-all-offline">
                                  <span class="date__price-name">Офлайн</span>
                                  <span class="date__price-empty"></span>
                                  <span class="date__price-price price">
                              <span class="price_prev">{{
                                allDates.offlinePrice
                              }}</span>
                              <span class="price_current"
                              >{{ allDates.offlinePrice }}&nbsp;&#8381;</span
                              >
                            </span>
                                </label>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import {baseURL} from "@/helpers/defaultValues";
  import Loader from "../components/UI/Loader";

  export default {
    name: "OrderCart",
    components: {Loader},
    data() {
      return {
        isLoading: true,
        dates: []
      };
    },
    computed: {
      // isDateChecked() {
      //   return this.dates.filter((date) => date.style !== "").length !== 0;
      // },
      // isAllDatesChecked() {
      //   return this.allDates.style !== "";
      // },
      singleDates(){
        return this.dates.filter((date)=>date.sectionType === "single")
      },
      allDates(){
        return this.dates.filter((date)=>date.sectionType !== "single")
      }
    },
    methods: {
      uncheckRadio($event, date) {
        if (date.style === $event.target.value) {
          $event.target.checked = false;
          date.style = "";
        }
      },
    },
    mounted() {
      axios
        .get(baseURL + '/api/catalog/items/')
        .then(res => {
          if (res.data.status === 'ok') {
            this.dates = res.data.sections;
            this.isLoading = false;
          }
        })
    }
  };
</script>

<style lang="scss" scoped>
  .personal-cab {
    flex-grow: 1;
    width: 100%;

    &__title {
      padding-top: 20px;
      padding-bottom: 25px;
      text-align: center;

      h1 {
        margin: 0;
        font-weight: bold;
        font-size: 48px;
        line-height: 56px;
        text-align: center;
        color: $accent-color;
      }
    }

    &__subtitle {
      font-size: 32px;
      line-height: 37px;
      text-align: center;
      color: #000000;
      margin-bottom: 40px;
    }

    &__content {
      &-block {
        width: 100%;
        background: white;
        padding-top: 45px;
        padding-bottom: 110px;
        margin-bottom: 35px;
      }
    }

    &__dates {
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

        &__item {
          background: #f4f9ff;
          border: 1px solid #f3f3f3;
          border-radius: 10px;
          overflow: hidden;
          transition: opacity 0.2s;
          //min-width: 315px;
          box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);

          .date {
            &__head {
              background: $accent-color;
              font-size: 24px;
              line-height: 28px;
              text-align: center;
              color: #ffffff;
              padding: 10px;
            }

            &__content {
              padding: 30px 15px;
            }

            &__price {
              &:not(:last-child) {
                margin-bottom: 20px;
              }

              input {
                &:checked ~ label {
                  &::before {
                    background-image: url("/assets/img/ui/radio_checked.svg");
                  }
                }
              }

              label {
                cursor: pointer;
                position: relative;
                display: flex;
                font-weight: 500;
                text-transform: uppercase;
                padding-left: 30px;
                font-size: 14px;
                line-height: 21px;
                @media screen and (min-width: 1200px) {
                  font-size: 16px;
                }

                &::before {
                  position: absolute;
                  left: 0;
                  top: 50%;
                  width: 21px;
                  height: 21px;
                  content: "";
                  background-image: url("/assets/img/ui/radio_unchecked.svg");
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: contain;
                  transform: translateY(-50%);
                }
              }

              &-empty {
                flex-grow: 1;
                background-image: url("/assets/img/ui/empty-dots.svg");
                background-position: left calc(100% - 2px);
                background-repeat: repeat-x;
                margin: 0 3px;
              }

              .price {
                &_prev {
                  position: relative;
                  color: #5e5e5e;
                  margin-right: 5px;

                  &::before {
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 50%;
                    content: "";
                    height: 2px;
                    background: rgba(221, 0, 0, 0.8);
                    transform: translateY(-50%);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .date-checked,
  .all-dates-checked {
    opacity: 0.5;
    pointer-events: none;
  }
</style>