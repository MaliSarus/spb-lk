<template>
  <div class="form__input form__input-datepicker">
    <input
        type="text"
        :id="inputId"
        v-model="date"
        @focus="datepickerOpen"
        @input="inputChange"
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


export default {
  name: "DateInput",
  data() {
    return {
      date: this.inputDate,
      isDatepickerOpen: false
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
      if ($event.target.value !== '') {
        this.labelActive = true
      } else {
        this.labelActive = false
      }
    },
    pickDate() {
      this.isDatepickerOpen = false
    }
  },
  mounted() {
    const that = this
    document.addEventListener('click', function (event) {
      const elementToDetect = document.querySelectorAll('.form__input-datepicker')[0];
      if (elementToDetect) {
        const isClickInside = elementToDetect.contains(event.target);
        that.isDatepickerOpen = isClickInside;
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.form {
  &__input-datepicker {
    &::before{
      position: absolute;
      right: 15px;
      top: 50%;
      display: block;
      content: '';
      width: 18px;
      height: 18px;
      transform: translateY(-50%);
      background: url("/assets/img/ui/datepicker-icon.svg") center no-repeat;
      background-size: contain;
    }
    input{
      padding-right: 35px;
    }
  }
  &__datepicker {
    width: 100%;
  }
}




</style>