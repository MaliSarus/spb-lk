<template>
  <div class="form__input">
    <input :type="inputType" :id="inputId" v-model="inputValue" @keydown="checkPattern">
    <label v-if="label" :for="inputId" :class="{active: labelActive}">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "Input",
  model: {
    prop: 'inputText',
    event: 'change'
  },
  props: ['inputId', 'inputType', 'label', 'inputText', 'validPattern'],
  data() {
    return {
      inputValue: this.inputText,
    }
  },
  watch: {
    inputValue(val) {
     
        this.$emit('change', val);
      
    }
  },
  computed: {
    labelActive() {
      if (this.inputValue !== '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    checkPattern($event) {
      if (this.validPattern) {
        const pattern = new RegExp(this.validPattern);
        console.log(pattern)
        console.log($event.key)
        if (!pattern.test($event.key)){
          $event.preventDefault();      
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>