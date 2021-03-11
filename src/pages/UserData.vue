<template>
    <div class="personal-cab__user-page">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="personal-cab__user-data">
                        <div class="personal-cab__subtitle">
                            Персональная информация
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="user-data__form form">
                        <form action="#" @submit.prevent="changeData">
                            <div class="user-data__name">
                                {{userData.name}}
                                <button class="user-data__rename" @click="()=>{this.isTooltipOpen = !this.isTooltipOpen}" v-tooltip='{
                                  content: `
                                  <div class="tooltip-header">Эти данные меняются только по официальному запросу. </div>
                                  <div class="tooltip-body">Заполните форму отправив запрос с просьбой изменить контактую информацию, а также скан документа подтверждающего личность. </div>
                                  <button class="button button_yellow tooltip-button" >Заполнить заявку</button>
                                  `,
                                  show: isTooltipOpen,
                                  trigger: "manual",
                                  placement: "right",
                                }'>
                                </button>
                            </div>
                            <hr>
                            <div v-if="user.verify" class="user-data__verify">
                                Вы успешно подтвердили Ваш статус! <b>Ваш аккаунт верифицирован.</b>
                                В разделе “Оформление участия” для Вас специальные цены.
                            </div>
                            <Checkbox v-if="!user.verify" v-model="verifyCheck" input-id="user-verify"
                                      class="user-data__verify-check">Являюсь клиническим ординатором или
                                очным аспирантом кафедры
                            </Checkbox>
                            <div class="user-data__verify-no" v-if="verifyCheck">
                                <p>
                                    Обращаем внимание, что Вам необходимо подтвердить, что Вы являетесь клиническим
                                    ординатором или
                                    очным аспирантом кафедры: пластическая хирургия / челюстно-лицевая хирургия /
                                    косметология /
                                    дерматология.
                                </p>
                                <router-link to="/verify" class="form__submit">Перейти к верификации</router-link>
                            </div>
                            <div class="user-data__form-grid">
                                <label for="user-birth">Дата рождения</label>
                                <DateInput v-model="userData.birthday" input-id="user-birth"/>

                                <label for="user-country">Страна</label>
                                <Select v-model="userData.country" input-id="user-country" :options="countriesWithoutId"
                                        @pick="countryToId"/>

                                <label for="user-city">Город</label>
                                <Select v-model="userData.city" input-id="user-city" :options="russiaCities"/>

                                <label for="user-phone">Телефон</label>
                                <Input v-model="userData.phone" input-id="user-phone"/>

                                <label for="user-company">Учреждение</label>
                                <Input v-model="userData.company" input-id="user-company"/>

                                <label for="user-position">Должность</label>
                                <Input v-model="userData.position" input-id="user-position"/>

                                <label for="user-department">Специализация</label>
                                <Select v-model="userData.department" input-id="user-department"
                                        :options="departments"/>

                                <label for="user-rank">Ученое звание</label>
                                <Select v-model="userData.rank" input-id="user-rank" :options="ranks"/>

                                <label for="user-degree">Ученая степень</label>
                                <Select v-model="userData.degree" input-id="user-degree" :options="degrees"/>

                            </div>
                            <div class="user-data__controls">
                                <div class="row">
                                    <div class="col-12 col-lg-6">
                                        <router-link tag="button" :to="{name: 'ChangePass'}"
                                                     class="button button_yellow button_transparent user-data__pass">
                                            Изменить пароль
                                        </router-link>
                                    </div>
                                    <div class="col-12 col-lg-6">
                                        <button type="submit" class="button button_yellow user-data__submit">Сохранить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import {mapGetters} from 'vuex'
    // import axios from 'axios'
    // import Input from "../components/UI/Input";
    import DateInput from "../components/UI/DateInput";
    import Select from "../components/UI/Select";
    import Input from "../components/UI/Input";
    import Checkbox from "../components/UI/Checkbox";

    export default {
        name: "UserData",
        components: {Checkbox, Input, Select, DateInput},
        data() {
            return {
                verifyCheck: false,
                countryId: '',
                isTooltipOpen: false,
            }
        },
        computed: {
            ...mapGetters(['user', "russiaCities", "countries", "departments", "ranks", "degrees"]),
            userData: {
                get() {
                    return this.user
                },
                set(val) {
                    this.userData = val;
                }
            },
            countriesWithoutId() {
                return this.countries.map((country) => country.name);
            },
        },
        methods: {
            countryToId(countryName) {
                this.countryId = +this.countries.find(
                    (country) => country.name === countryName
                ).id;
            },
            changeData() {
                const data = {
                    birthday: this.userData.birthday,
                    country: this.countryId,
                    city: this.userData.city,
                    company: this.userData.company,
                    position: this.userData.position,
                    department: this.userData.department,
                    rank: this.userData.rank,
                    degree: this.userData.degree,
                    ordinator: this.userData.ordinator === 'y',
                }
                console.log(data)
                // axios
                //   .put('/api/user/', data)
                // .then(console.log)
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss">
    hr {
        margin: 15px 0;
        border: none;
        border-top: 1px solid #e1e1e1;
        @media screen and (min-width: $lg-width) {
            margin: 20px 0;
        }
    }

    .user-data {
        &__verify {
            position: relative;
            background: #F1FFEB;
            border-radius: 2px;
            font-size: 14px;
            line-height: 16px;
            padding: 20px 15px 20px 70px;
            color: #375B28;
            margin-bottom: 15px;

            &::before {
                position: absolute;
                left: 15px;
                top: 50%;
                display: block;
                content: '';
                width: 35px;
                height: 35px;
                background-position: 0 0;
                background-repeat: no-repeat;
                transform: translateY(-50%);
            }
        }

        &__verify-no {
            position: relative;
            background: #FFF6F4;
            border-radius: 2px;
            font-size: 14px;
            line-height: 16px;
            padding: 15px;
            color: #975858;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 15px;

            p {
                margin: 0;
                margin-bottom: 10px;
            }

            .form__submit {
                text-decoration: none;
                display: inline-block;
                margin: 0 auto;
                width: auto;
            }
        }

        &__verify-check {
            margin-bottom: 15px;

            label {
                font-size: 14px !important;
                line-height: 16px !important;
                color: $main-text-color !important;
            }
        }

        &__rename {
            position: absolute;
            right: 0;
            top: 50%;
            width: 18px;
            height: 18px;
            transform: translateY(-50%);
            border: none;
        }

        &__name {
            position: relative;
            font-weight: bold;
            font-size: 18px;
            line-height: 22px;
            color: $accent-color;
            padding-right: 18px;

            @media screen and (min-width: $lg-width) {
                font-size: 24px;
                line-height: 28px;
            }
        }

        &__form {
            display: flex;
            justify-content: center;
            width: 100%;
            max-width: none;
            border-radius: 0;
            border: none;
            box-shadow: none;

            form {
                width: 100%;
                max-width: 540px;
            }
        }

        &__form-grid {
            display: grid;
            grid-template-rows: 1fr;
            align-items: center;
            row-gap: 10px;
            @media screen and (min-width: $lg-width) {
                grid-template-columns: 120px 1fr;
                gap: 15px 20px;
            }

            label {

                font-size: 14px;
                line-height: 16px;
                color: #282828;
                @media screen and (min-width: $lg-width) {
                    grid-column: 1 / 2;

                }
            }

            .form__input {
                margin-bottom: 5px;
                @media screen and (min-width: $lg-width) {
                    grid-column: 2 / 3;

                }
            }

        }

        &__controls {
            margin-top: 15px;
            @media screen and (min-width: $lg-width) {
                margin-top: 20px;
            }
        }

        &__submit, &__pass {
            padding: 8px;
            width: 100%;
        }

        &__submit {
            padding-left: 35px;
            padding-right: 35px;
            background-position: calc(100% - 35px) center;
            background-repeat: no-repeat;
        }
    }

    .tooltip {
        display: block !important;
        z-index: 10000;
        max-width: 350px;


        &-header {
            font-weight: bold;
            font-size: 14px;
            line-height: 16px;
            color: $accent-color;
            margin-bottom: 20px;
        }

        &-body {
            font-size: 14px;
            line-height: 16px;
            color: $light-text-color;
            margin-bottom: 20px;
        }

        &-button {
            width: 100%;
            padding: 8px;
            font-size: 14px;
            line-height: 16px;
        }

        .tooltip-inner {
            background: white;
            color: white;
            border-radius: 16px;
            padding: 20px 20px 15px;
            border: 1px solid #EDEDED;
            box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
            border-radius: 10px;
        }

        .tooltip-arrow {
            width: 0;
            height: 0;
            border-style: solid;
            position: absolute;
            margin: 5px;
            border-color: white;
            z-index: 1;
            display: none;
        }

        &[x-placement^="top"] {
            margin-bottom: 5px;

            .tooltip-arrow {
                border-width: 5px 5px 0 5px;
                border-left-color: transparent !important;
                border-right-color: transparent !important;
                border-bottom-color: transparent !important;
                bottom: -5px;
                left: calc(50% - 5px);
                margin-top: 0;
                margin-bottom: 0;
            }
        }

        &[x-placement^="bottom"] {
            margin-top: 5px;

            .tooltip-arrow {
                border-width: 0 5px 5px 5px;
                border-left-color: transparent !important;
                border-right-color: transparent !important;
                border-top-color: transparent !important;
                top: -5px;
                left: calc(50% - 5px);
                margin-top: 0;
                margin-bottom: 0;
            }
        }

        &[x-placement^="right"] {
            margin-left: 10px;

            .tooltip-arrow {
                border-width: 5px 5px 5px 0;
                border-left-color: transparent !important;
                border-top-color: transparent !important;
                border-bottom-color: transparent !important;
                left: -5px;
                top: calc(50% - 5px);
                margin-left: 0;
                margin-right: 0;
            }
        }

        &[x-placement^="left"] {
            margin-right: 5px;

            .tooltip-arrow {
                border-width: 5px 0 5px 5px;
                border-top-color: transparent !important;
                border-right-color: transparent !important;
                border-bottom-color: transparent !important;
                right: -5px;
                top: calc(50% - 5px);
                margin-left: 0;
                margin-right: 0;
            }
        }

        &.popover {
            $color: #f9f9f9;

            .popover-inner {
                background: $color;
                color: black;
                padding: 24px;
                border-radius: 5px;
                box-shadow: 0 5px 30px rgba(black, .1);
            }

            .popover-arrow {
                border-color: $color;
            }
        }

        &[aria-hidden='true'] {
            visibility: hidden;
            opacity: 0;
            transition: opacity .15s, visibility .15s;
        }

        &[aria-hidden='false'] {
            visibility: visible;
            opacity: 1;
            transition: opacity .15s;
        }
    }
</style>