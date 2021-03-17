<template>
  <div class="form__input">
    <input :type="inputType" :id="inputId" v-model="inputValue" @input="$emit('input', $event)">
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
  props: ['inputId', 'inputType', 'label', 'inputText'],
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

}
</script>

<style lang="scss" scoped>
</style>