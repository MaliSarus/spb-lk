<template>
  <div class="form__input form__input-datepicker" v-on-clickaway="closeDatepicker">
    <button type="button" class="form__input-trigger" :style="{backgroundImage: `url('${datepickerIcon}')`}"
            @click="isDatepickerOpen = !isDatepickerOpen"></button>
    <input
        type="text"
        :id="inputId"
        v-model="date"
        @focus="datepickerOpen"
        @input="inputChange"
        ref="dateInput"
    />
    <label v-if="label" :for="inputId" :class="{active: labelActive}">{{ label }}</label>
    <date-picker
        format="DD.MM.YYYY"
        class="form__datepicker"
        :input-attr="{id:inputId}"
        v-model="date"
        value-type="format"
        inline
        :class="{
          open: isDatepickerOpen
        }"
        @pick="pickDate"
    />
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/locale/ru'
  import datepickerIcon from '@/assets/img/ui/datepicker-icon.svg'


  export default {
    name: "DateInput",
    data() {
      return {
        date: this.inputDate,
        isDatepickerOpen: false,
        datepickerIcon
      }
    },
    props: ['inputId', 'inputType', 'label', 'inputDate'],
    model: {
      prop: 'inputDate',
      event: 'inputDateChange'
    },
    components: {
      DatePicker,
    },
    watch: {
      date(val) {
        this.$emit('inputDateChange', val);
      }
    },
    computed: {
      labelActive() {
        return this.date !== '';
      }
    },
    methods: {
      datepickerOpen() {
        this.isDatepickerOpen = true;
      },
      inputChange($event) {
        this.$emit('update:inputText', $event.target.value);
      },
      pickDate() {
        this.isDatepickerOpen = false
      },
      closeDatepicker() {
        this.isDatepickerOpen = false
      }
    },
  }
</script>

<style lang="scss" scoped>
  .form {
    &__input-datepicker {
      input {
        padding-right: 35px;
      }
    }

    &__input-trigger {
      position: absolute;
      right: 15px;
      top: 50%;
      display: block;
      content: '';
      width: 18px;
      height: 18px;
      transform: translateY(-50%);
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      cursor: pointer;
      border: none;
      background-color: transparent;
    }

    &__datepicker {
      width: 100%;
    }
  }


</style>