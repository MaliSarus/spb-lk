<template>
  <div class="form__input form__input-select"  :class="{open:isOpen}" v-on-clickaway="closeSelect" @click="formInputClick($event)">
    <input type="text" :id="inputId"
           @focus="inputFocus"
           @input="$event => searchString = $event.target.value"
           @keydown.enter="selectOption($event.target.value)"
           autocomplete="nope"
           ref="selectInput"
           :value="searchString"
           :style="{
             opacity: isOpen ? 1 : 0,
             visibility: isOpen ? 'visible' : 'hidden',
           }"
    >
    <label v-if="label" :for="inputId" :class="{active: labelActive}">{{ label }}</label>
    <span v-if="selectedOption" :class="{invisible:isOpen}">{{selectedOption}}</span>
    <div ref="select" class="select-options" v-show="isOpen" :class="selectMenuPos">
      <vuescroll :ops="ops">
        <ul>
          <li v-for="(option, index) in searchingOptions" :key="`option_${option}_${index}`"
              @click="selectOption(option)">{{ option }}
          </li>
        </ul>
      </vuescroll>
    </div>
  </div>
</template>

<script>
  import vuescroll from 'vuescroll'

  export default {
    name: "Select",
    props: ['options', 'inputId', 'inputType', 'label', 'inputOption'],
    model: {
      prop: 'inputOption',
      event: 'selectOption'
    },
    components: {
      vuescroll
    },
    data() {
      return {
        ops: {
          vuescroll: {
            detectResize: true,
            // sizeStrategy: 'number'

          },
          rail: {
            background: '#EDEFF1',
            opacity: 1,
          },
          bar: {
            background: '#C0CDDE',
            onlyShowBarOnScroll: false,
            opacity: 1,
            keepShow: true
          }
        },
        selectedOption: this.inputOption,
        isOpen: false,
        searchString: '',
        selectMenuPos: 'bottom',
        selectMenuOverflow: false,
        selectMenuHeight: 0,
      }
    },
    methods: {
      formInputClick($event){
        if(this.$refs.select.contains($event.target)){
          this.isOpen = false
        }
        else {
          this.isOpen = true
          this.$nextTick(() => {
            this.$refs.selectInput.focus();
          })
        }
      },
      selectOption(option) {
        this.selectedOption = option;
        this.isOpen = false;
        this.$emit('pick', option)
        // this.searchString = ''
      },
      inputFocus() {
        // this.searchString = ''
        this.isOpen = true;
        if (this.selectMenuHeight === 0) {
          this.$nextTick(() => {
            const inputEl = this.$refs.select;
            const inputElBottom = inputEl.getBoundingClientRect().top + inputEl.offsetHeight;
            const windowHeight = window.innerHeight
            this.selectMenuPos = inputElBottom < windowHeight ? 'bottom' : 'top'
            this.selectMenuHeight = inputElBottom
          });
        }
        else {
          const windowHeight = window.innerHeight;
          this.selectMenuPos = this.selectMenuHeight < windowHeight ? 'bottom' : 'top'
        }
      },
      closeSelect() {
        this.isOpen = false;
        this.searchString = ''
      }
    },
    computed: {
      labelActive() {
        return !!this.selectedOption;

      },
      searchingOptions() {
        if (this.searchString !== '') {
          return this.options.filter(option => {
            if (option.toLowerCase().includes(this.searchString.toLowerCase())) {
              return option
            }
          })
        } else {
          return this.options
        }
      },
    },
    watch: {
      selectedOption(val) {
        this.$emit('selectOption', val);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .form {
    &__input-select {
      &::before {
        position: absolute;
        right: 15px;
        top: 50%;
        display: block;
        content: '';
        width: 18px;
        height: 6px;
        transform: translateY(-50%);
        transition: transform .25s;
        background-size: contain;
        cursor: pointer;
      }

      &.open {
        &::before {
          transform: translateY(-50%) rotate(180deg);
        }
      }

      input {
        padding-right: 35px;
      }
    }
  }

  .select-options {
    margin: 0;
    position: absolute;
    left: 0;
    right: 0;
    padding: 18px 15px 18px 18px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background: white;
    overflow: hidden;
    z-index: 10;

    &.bottom {
      bottom: 0;
      transform: translateY(calc(100% + 4px));
    }

    &.top {
      top: 0;
      transform: translateY(calc(-100% - 4px));
    }


    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      max-height: 300px;
    }

    li {
      cursor: pointer;

      &:not(:last-child) {
        margin-bottom: 30px;
      }

      &:hover {
        color: #3b7dee;
      }
    }
  }

  span{
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    &.invisible{
      opacity: 0;
      visibility: hidden;
    }
  }
</style>