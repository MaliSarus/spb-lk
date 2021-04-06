<template>
  <div class="form__input form__input-select" :class="{open:isOpen}" v-on-clickaway="closeSelect"
       @mousedown="inputClick">
    <button type="button" class="form__input-trigger" :style="{backgroundImage: `url('${selectIcon}')`}"
            @click="triggerClick"></button>
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
  import selectIcon from '@/assets/img/ui/select-icon.svg'

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
        selectIcon
      }
    },
    methods: {
      triggerClick() {
        this.isOpen = !this.isOpen
      },
      inputClick($event) {
        console.log('click')
        if (!$event.target.classList.contains('form__input-trigger')) {
          if (!this.isOpen) {
            this.isOpen = true;
            this.$nextTick(() => {
              this.$refs.selectInput.focus();
            })
          }
        }
      },

      selectOption(option) {
        this.selectedOption = option;
        this.isOpen = false;
        this.$emit('pick', option)
      },
      inputFocus() {
        console.log('focus')
        // const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        // const headerHeight = header.getBoundingClientRect().top + header.offsetHeight;
        const footerTop = footer.getBoundingClientRect().top
        this.isOpen = true;
        this.selectMenuPos = 'bottom';
        const inputEl = this.$refs.select;
        const selectUl = inputEl.querySelector('ul');
        selectUl.removeAttribute('style');
        this.$nextTick(() => {
          const inputElBottom = inputEl.getBoundingClientRect().top + inputEl.offsetHeight;
          const diff = inputElBottom - footerTop;
          if (diff < 0) {
            this.selectMenuPos = 'bottom';
          } else {
            this.selectMenuPos = 'top'
            selectUl.style.maxHeight = '200px'
          }
        });

      },
      closeSelect() {
        this.isOpen = false;
        this.searchString = ''
      }
    }
    ,
    computed: {
      labelActive() {
        return !!this.selectedOption;

      }
      ,
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
      }
      ,
    }
    ,
    watch: {
      selectedOption(val) {
        this.$emit('selectOption', val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form {
    &__input-select {
      cursor: pointer;

      &.open {
        z-index: 10;
        .form__input-trigger {
          transform: translateY(-50%) rotate(180deg);
        }
      }

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
      height: 6px;
      transform: translateY(-50%);
      transition: transform .25s;
      background-size: contain;
      cursor: pointer;
      border: none;
      background-position: center;
      background-repeat: no-repeat;
      background-color: transparent;
    }
  }

  .select-options {
    margin: 0;
    position: absolute;
    left: 0;
    right: 0;
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
      padding: 18px 15px 18px 18px;


      &:hover {
        background-color: rgba(59, 125, 238, 0.2);
      }
    }
  }

  span {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);

    &.invisible {
      opacity: 0;
      visibility: hidden;
    }
  }
</style>