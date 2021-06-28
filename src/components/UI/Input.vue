<template>
  <div class="form__input">
    <input :type="inputType" :id="inputId" v-model="inputValue" @input="inputEmit" @keyup="validInput">
    <label v-if="label" :for="inputId" :class="{active: labelActive}">{{ label }}</label>
  </div>
</template>

<script>
  import {phoneAllowPattern, emailAllowPattern} from "../../helpers/defaultValues";

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
    methods: {
      inputEmit(e) {
        switch (this.inputType) {
          case 'tel':
            e.target.value = e.target.value.replace(phoneAllowPattern, '');
            break;
          case 'email':
            e.target.value = e.target.value.replace(emailAllowPattern, '');
            break
        }
        this.$emit('input', e)
      },
      validInput() {
        switch (this.inputType) {
          case 'tel':
            // eslint-disable-next-line no-useless-escape
            this.inputValue = this.inputValue.replace(phoneAllowPattern, '');
            break;
          case 'email':
            this.inputValue = this.inputValue.replace(emailAllowPattern, '');
            break
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
</style>