<template>
  <div class="form__input">
    <input :type="inputType" :id="inputId" v-model="inputValue" @keydown="checkPattern">
    <label :for="inputId" :class="{active: labelActive}">{{ label }}</label>
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
      if (this.validPattern) {
        const pattern = new RegExp(this.validPattern);
        val = val.replace(pattern, '')
        this.$emit('change', val.replace(pattern, ''));

      }
      else {
        this.$emit('change', val);
      }
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
    checkPattern() {
      // if (this.validPattern) {
      //   const pattern = new RegExp(this.validPattern);
      //   console.log(!pattern.test($event.key))
      //   if (!pattern.test($event.key)){
      //     $event.preventDefault();
      //     return false;
      //
      //   }
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>