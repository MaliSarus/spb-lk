<template>
  <div class="form__input form__input-datepicker">
    <input
        type="text"
        :id="inputId"
        v-model="date"
        @focus="datepickerOpen"
        @input="inputChange"
    />
    <label :for="inputId" :class="{active: labelActive}">{{ label }}</label>
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
    data(){
      return{
        date:'',
        labelActive: false,
        isDatepickerOpen: false
      }
    },
    props: ['inputId', 'inputType', 'label', 'inputDate'],
    model:{
      prop: 'inputDate',
      event: 'inputDateChange'
    },
    components: {
      DatePicker,
    },
    watch:{
      date(val){
        this.$emit('inputDateChange', val);
        console.log(val)
        if (val) {
          this.labelActive = true
        } else {
          this.labelActive = false
        }
      }
    },
    methods:{
      datepickerOpen(){
        this.isDatepickerOpen = true;
      },
      inputChange($event){
        this.$emit('update:inputText', $event.target.value);
        if ($event.target.value !== ''){
          this.labelActive = true
        }
        else {
          this.labelActive = false
        }
      },
      pickDate(){
        this.isDatepickerOpen = false
      }
    },
    mounted() {

      const that = this;
      document.addEventListener('click', function(event) {
        const datePicker = document.getElementsByClassName('form__input-datepicker')[0];
        const isClickInside = datePicker.contains(event.target)
        if (isClickInside === false) {
          that.isDatepickerOpen = false;
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .form {
    &__input {
      position: relative;
      border: 1px solid #F3F3F3;
      border-radius: 2px;
      background: #F4F9FF;

      label {
        position: absolute;
        top: 15px;
        left: 13px;
        transition: left .25s, top .25s, font-size .25s;

        &.active {
          font-size: 10px;
          left: 13px;
          top: 5px;
        }
      }
      input{
        display: block;
        padding: 15px 13px;
        border: none;
        background: transparent;
        outline: none;
        width: 100%;
        &:focus + label {
          font-size: 10px;
          left: 13px;
          top: 5px;
        }
      }

    }
    &__datepicker {
      width: 100%;
    }

  }
</style>