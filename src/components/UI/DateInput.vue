<template>
  <div class="form__input">
    <label :for="inputId" :class="{active: labelActive}">{{ label }}</label>
    <date-picker
        format="DD.MM.YYYY"
        class="form__datepicker"
        :input-attr="{id:inputId}"
        v-model="date"
        value-type="format"
        :width="datepickerWidth"
        inline
    />
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker';

  export default {
    name: "DateInput",
    data(){
      return{
        date:'',
        labelActive: false,
        datepickerWidth: 0,
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
    mounted() {
      this.datepickerWidth = document.querySelector('.form__datepicker').offsetWidth
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

    }
    &__datepicker {
      width: 100%;
      .mx-input{

        &:focus + label {
          font-size: 10px;
          left: 13px;
          top: 5px;
        }
      }
    }

  }
</style>