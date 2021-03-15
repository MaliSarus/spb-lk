<template>
  <div class="personal-cab__user-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__user-data">
            <div class="personal-cab__subtitle">
              Заявка на корректировку ФИО:
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
                  Для изменения ФИО отправьте, пожалуйста, скан документа, удостоверяющего личность. Если вы хотите
                  сообщить нам дополнительные сведения, напишите их в комментарии ниже.
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

              <div class="form__textarea">
                <textarea placeholder="Комментарий" v-model="message"></textarea>
              </div>
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
          <div class="user-data__form form" v-if="page === 2">
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
                  После проходжения проверки данные в личном кабинете автомотически обновятся.
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
  import axios from "axios";
  import docIcon from '@/assets/img/ui/doc.svg'
  import successIcon from '@/assets/img/ui/success-signup.svg'

  export default {
    name: "ChangeFIO",
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
        message: ''
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
          formData.append('text', this.message)
          axios
            .post('/api/user/change/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            )
            .then(res => {
              if (res.data.status === 'ok') {
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

<style lang="scss" scoped>
  form{
    width: 100%;
    max-width: 540px;
  }
  .form__textarea {
    width: 100%;
    height: 100px;
    background: #F4F9FF;
    border: 1px solid #F3F3F3;
    border-radius: 2px;
    margin-top: 15px;

    textarea {
      display: block;
      width: 100%;
      height: 100%;
      padding: 15px;
      background: transparent;
      resize: none;
      border: none;
      outline: none;
    }
  }
</style>