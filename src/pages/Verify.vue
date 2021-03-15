<template>
  <div class="personal-cab__user-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__user-data">
            <div class="personal-cab__subtitle">
              Прохождение верификации
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="user-data__form form" v-if="page === 1">
            <form action="#" @submit.prevent="uploadFile">
              <div class="user-data__text text">
                <p>
                  Для прохождения верификации как клинический ординатор или очный аспирант кафедры: пластическая
                  хирургия / челюстно-лицевая хирургия / косметология / дерматология Вам необходимо загрузить скан
                  справки из учебного заведения.
                  <br><br>
                  <b>Принимаемые форматы: JPG, PNG, PDF, DOCX, DOC.</b>
                </p>
              </div>
              <file-selector v-if="!url"
                             accept-extensions=".jpg,.png,.pdf,.doc,.docx"
                             :multiple="false"
                             :max-file-size="5 * 1024 * 1024"
                             @changed="handleFilesChanged"
                             @validated="validation"
              >
                <template v-slot:loader>ЗАГРУЗКА</template>
                Выбрать файл
              </file-selector>
              <div class="preview" v-else-if="isImage">
                <img :src="url"/>
                <button class="change-file" @click="changeFile">Изменить файл</button>
              </div>
              <div class="preview doc" v-else-if="url && !isImage">
                <img :src="docIcon"/>
                <button class="change-file" @click="changeFile">Изменить файл</button>
              </div>
              <p v-if="error">{{error}}</p>
              <div class="verify__controls">
                <Button
                    class="form__button form__button_prev"
                    text=""
                    type="button"
                    @buttonClick="$router.go(-1)"

                />
                <button type="submit" class="button button_yellow user-data__submit">Отправить на верификацию</button>
              </div>
            </form>
          </div>
          <div class="d-flex justify-content-center" v-if="page === 2">
            <form action="#">
              <div class="verify-success">
                <div class="verify-success__image">
                  <img :src="successIcon" alt="">
                </div>
                <div class="verify-success__title">
                  Данные успешно отправлены!
                </div>
                <div class="verify-success__text text">
                  Проверка занимает до двух рабочих дней.
                  <br><br>
                  После проходжения верификации Вы получите письмо на электронную почту, указанную в вашем профиле.
                  Также информация про статус верификации появится в личном кабинете.
                </div>
                <div class="verify-success__button">
                  <router-link tag="button" class="button button_yellow" :to="'/lk/'+userId">Вернуться в личный
                    кабинет
                  </router-link>
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
  import axios from 'axios'
  import docIcon from '@/assets/img/ui/doc.svg'
  import successIcon from '@/assets/img/ui/success-signup.svg'

  export default {
    name: "Verify",
    data() {
      return {
        files: '',
        url: '',
        ext: '',
        docIcon,
        error: false,
        page: 1,
        successIcon,
        userId: this.$route.params.id,
    }
    },
    computed: {
      isImage() {
        const imageExt = this.ext === 'png' || this.ext === 'jpg'
        return imageExt
      }
    },
    methods: {
      handleFilesChanged(files) {
        this.files = files[0];
        this.ext = files[0].name.split('.').pop();
        this.url = URL.createObjectURL(this.files);
        console.log(files[0])
      },
      validation(result) {
        const resultStr = '' + result
        if (resultStr !== 'true') {
          this.error = 'Ошибка файла (расширение или размер)'
        } else {
          this.error = false
        }
      },
      uploadFile() {
        if (this.files) {
          const formData = new FormData();
          formData.append('file', this.files)
          // this.page += 1;
          axios
            .post('/api/user/verify/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            )
            .then(res=>{
              if (res.data.status === 'ok'){
                this.page += 1;
              }
            })
        }
      },
      changeFile() {
        this.files = '';
        this.ext = '';
        this.url = ''
      }
    },
  }
</script>

<style lang="scss">

  .fs-file-selector {
    user-select: none;
    text-align: center;
    background-color: #F4F9FF;
    border: 1px solid #F3F3F3;
    border-radius: 10px;
    transition: all .25s;


    .fs-droppable {
      padding: 25px 0;
      height: 80px;
    }

    .fs-btn-select {
      border-radius: 1px;
      transition: all ease 200ms;
      cursor: pointer;

    }

    .fs-loader {
      background-color: transparent !important;
    }

    &.fs-drag-enter {
      background-color: transparent;
      border-style: dashed;
      border-width: 3px;
    }
  }

  .preview {
    width: 100%;
    position: relative;
    max-width: 240px;
    margin: 0 auto;

    &:hover {
      .change-file {
        opacity: 1;
      }
    }

    &.doc {
      height: 50px;

      img {
        height: 100%;
        object-fit: scale-down;
      }
    }

    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }

    .change-file {
      opacity: 0;
      position: absolute;
      left: 50%;
      top: 50%;
      border: none;
      padding: 10px;
      background: $accent-color;
      color: white;
      font-size: 14px;
      text-align: center;
      transform: translate(-50%, -50%);
      transition: opacity .25s;
      outline: none;
      border-radius: 2px;
    }
  }

  .user-data {
    &__text {
      margin-bottom: 15px;
      @media screen and (min-width: $lg-width) {
        margin-bottom: 20px;
      }

      p {
        font-size: 14px;
        line-height: 16px;
        color: $main-text-color;
        font-weight: normal;
      }

    }

    &__form {
      padding: 0;
    }
  }


  .form__button_prev {
    max-width: 40px;
    height: auto;
    margin-right: 10px;
  }

  .verify {
    &__controls {
      display: flex;
      margin-top: 40px;
      .user-data__submit{
        flex-grow: 1;
      }
      .form__button_prev{
        flex-grow: 1;
        max-width: 45px;
      }
    }
  }

  .verify-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &__image {
      width: 140px;
      height: 140px;
      margin-bottom: 20px;
      @media screen and (min-width: $lg-width) {
        margin-bottom: 30px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }
    }

    &__title {
      font-size: 16px;
      line-height: 18px;
      color: #5E5E5E;
      margin-bottom: 20px;
      @media screen and (min-width: $lg-width) {
        font-size: 18px;
        line-height: 21px;
        margin-bottom: 30px;

      }
    }

    &__text {
      font-size: 14px !important;
      line-height: 16px !important;
      color: $main-text-color !important;
    }

    &__button {
      width: 100%;
      max-width: 300px;
      margin-top: 20px;
      @media screen and (min-width: $lg-width) {
        margin-top: 30px;
      }

      button {
        padding: 8px;
        width: 100%;
        max-width: 300px;
      }
    }
  }
</style>