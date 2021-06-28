<template>
  <div class="datepicker__wrapper form__input">
    <date-picker
      format="DD.MM.YYYY"
      v-model="date"
      value-type="format"
      :disabled-date="disableDate"
      @input-error="setDefaultValue"
    >
      <template v-slot:input="slotProps">

        <input
          type="text"
          v-model="date"
          v-bind="slotProps.props" v-on="slotProps.events"
          @change="changeInnerInput"
        />
      </template>
    </date-picker>
    <date-picker
      format="DD.MM.YYYY"
      v-model="date"
      value-type="format"
      :disabled-date="disableDate"
      inline
    >
    </date-picker>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  export default {
    name: "TestDatePicker",
    data(){
      return{
        date: this.testDate
      }
    },
    components:{
      DatePicker
    },
    props:['testDate'],
    model:{
      prop:'testDate',
      event: 'testDateUpdate'
    },
    methods:{
      disableDate(date) {
        const d = new Date()
        d.setFullYear(d.getFullYear() - 18)
        return date > d
      },
      changeInnerInput(event){
        if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_MODE === 'test') console.log(event.target.value)
      },
      setDefaultValue(){
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          timezone: 'UTC'
        };
        const d = new Date()
        d.setFullYear(d.getFullYear() - 18)
        this.date = d.toLocaleString("ru", options)
      }
    },
    computed:{
      allowDefaultDate(){
        const d = new Date()
        d.setFullYear(d.getFullYear() - 18)
        return d
      }
    },
    mounted() {
      const d = new Date()
      const td = new Date(this.testDate)
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
      };
      d.setFullYear(d.getFullYear() - 18)
      if (td > d) this.date = d.toLocaleString("ru", options)
    }
  }
</script>

<style scoped lang="scss">

</style>