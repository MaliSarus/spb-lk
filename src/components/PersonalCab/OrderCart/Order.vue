<template>
  <li>
    <div class="dates__item date" :class="{'disabled': disabled}">
      <div class="date__head" :class="{yellow: type!=='single'}">{{ date.sectionName}}</div>
      <div class="date__content">
        <div class="date__price" v-for="(onlineDate) in dateOnlineItems" :key="onlineDate.type + '_' + onlineDate.id">
          <input ref="onlineCheck"
                 :disabled="disabled"
                 type="radio"
                 :name="onlineDate.type  + '-' + onlineDate.id"
                 v-model="checkedDate"
                 :value="onlineDate.id"
                 @click="uncheckRadio($event, onlineDate,date.sectionType)"
                 v-show="false"
                 :id="onlineDate.type  + '-' + onlineDate.id"
          />
          <label :for="onlineDate.type  + '-' +onlineDate.id">
            <span class="date__price-name">Онлайн</span>
            <span class="date__price-empty"></span>
            <span class="date__price-price price">
              <span class="price_prev"></span>
              <span class="price_current">
                {{ onlineDate.price.basePrice}}&nbsp;&#8381;
              </span>
            </span>
          </label>
        </div>
        <div class="date__price" v-for="(offlineDate) in dateOfflineItems"
             :key="offlineDate.type + '_' + offlineDate.id">
          <input ref="offlineCheck"
                 :disabled="disabled"
                 type="radio"
                 :name="offlineDate.type + '-' + offlineDate.id"
                 v-model="checkedDate"
                 :value="offlineDate.id"
                 @click="uncheckRadio($event, offlineDate,date.sectionType)"
                 v-show="false"
                 :id="offlineDate.type + '-' + offlineDate.id"
          />
          <label :for="offlineDate.type + '-' + offlineDate.id">
            <span class="date__price-name">Офлайн</span>
            <span class="date__price-empty"></span>
            <span class="date__price-price price">
              <span class="price_prev"></span>
              <span class="price_current">
                {{ offlineDate.price.basePrice}}&nbsp;&#8381;
              </span>
            </span>
          </label>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
  import {mapMutations} from "vuex";

  export default {
    name: "Order",
    props: [
      'type', 'date', 'index', 'selectDate', 'disabled', 'allCheckId'
    ],
    data() {
      return {
        checkedDate: ''
      }
    },
    computed: {
      dateOfflineItems() {
        return this.date.items.filter(item => item.type == 'offline')
      },
      dateOnlineItems() {
        return this.date.items.filter(item => item.type == 'online')
      }
    },
    methods: {
      ...mapMutations(["addProduct", "deleteProduct"]),
      uncheckRadio($event, product, productType) {
        if (this.checkedDate === +$event.target.value) {
          $event.target.checked = false;
          this.deleteProduct(this.checkedDate)
          this.dateType = "";
        } else {
          if (!this.checkedDate) {
            this.deleteProduct(this.checkedDate)
          }
          const selectDate = {
            name: this.date.sectionName,
            id: $event.target.value,
            price: product.price.basePrice,
            type: productType,
            style: product.type,
          }
          this.addProduct(selectDate)
        }
      }
    },
    updated() {
      if (this.allCheckId){
        this.checkedDate = this.allCheckId
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dates {
    &__item {
      background: #f4f9ff;
      border: 1px solid #f3f3f3;
      border-radius: 10px;
      overflow: hidden;
      transition: opacity 0.2s;
      //min-width: 315px;
      height: 100%;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);

      .date {
        &__head {
          background: $accent-color;
          font-size: 24px;
          line-height: 28px;
          text-align: center;
          color: #ffffff;
          padding: 10px;

          &.yellow {
            background: $yellow-color;
            color: $main-text-color;
          }
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

  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }

</style>