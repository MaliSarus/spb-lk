const ru = {
  message: {
    departments:{
      other:'другое'
    },
    header: {
      noname: 'Личный кабинет',
      menu: {
        userData: 'Учетные данные',
        orderCart: 'Оформить участие',
        logout: 'Выход',
      }
    },
    footer: {
      text: 'Все предложения и цены, указанные на сайте, носят информационный характер и не являются публичной офертой (ст. 437 ГК РФ).'
    },
    logIn: {
      title: 'Личный кабинет',
      forgetPass: 'Забыли пароль?',
      buttons: {
        signUp: 'Зарегистрироваться',
        signIn: 'Войти',
      },
      inputs: {
        email: 'Email',
        password: 'Пароль'
      },
      noOneAuth: {
        loading: 'Выходим',
        noLoading: 'Выйти со всех устройств'
      }
    },
    signUp: {
      title: 'Регистрация',
      inputs: {
        name: 'Имя *',
        lastName: 'Фамилия *',
        secondName: "Отчество",
        birthday: "Дата рождения *",
        country: "Страна *",
        city: "Город *",
        company: "Учреждение *",
        department: "Специализация *",
        position: "Должность *",
        rank: "Ученое звание",
        degree: "Ученая степень",
        phone: "Телефон *",
        email: "Email *",
        password: "Пароль (мин. 6 символов) *",
        confirmPassword: "Пароль повторно *",
        ordinator: 'Я являюсь ординатором или очным аспирантом кафедры: пластическая хирургия / челюстно-лицевая хирургия / косметология / дерматология.',
        policy: {
          text: 'Я согласен с',
          link: 'Политикой конфиденциальности'
        },
        otherDepartment: 'Специализация (другое)',
      },
      buttons: {
        next: 'Далее',
        signUp: 'Зарегистрироваться'
      },
      success: {
        title: 'Регистрация прошла успешно!',
        subtitle: 'На Ваш email отправлено письмо с подтверждением, пожалуйста, пройдите по ссылке и активируйте аккаунт',
        link: 'Перейти в личный кабинет'
      }
    },
    personalCab: {
      title: 'Личный кабинет',
    },
    mainPage: {
      title: 'Оплаченные заказы',
      controls: {
        userData: {
          title: 'Личные данные',
          text: 'Просмотреть / изменить персональные данные, пройти верификацию'
        },
        orderCart: {
          title: 'Оформление, заказ услуг',
          text: 'Выбрать даты, формат участия в конгрессе, а также заказать дополнительные услуги'
        },
      },
      payedOrders:{
        current: 'Перейти к трансляции',
        prev: 'Видеозапись',
        next: 'Перейти к трансляции',
        link: 'Подробнее'
      }
    },
    userData: {
      title: 'Персональная информация',
      tooltip: {
        title: 'Эти данные меняются только по официальному запросу.',
        text: 'Заполните форму отправив запрос с просьбой изменить контактую информацию, а также скан документа, подтверждающего личность.',
        link: 'Перейти'
      },
      verify: {
        verified: 'Вы успешно подтвердили Ваш статус! <b>Ваш аккаунт верифицирован.</b>В разделе “Оформление участия” для Вас специальные цены.',
        notVerified: 'Обращаем внимание, что Вам необходимо подтвердить, что Вы являетесь клиническим ординатором или очным аспирантом кафедры: пластическая хирургия / челюстно-лицевая хирургия / косметология / дерматология.',
        checkbox: 'Являюсь клиническим ординатором или очным аспирантом кафедры',
        link: 'Перейти к верификации'
      },
      buttons: {
        changePass: 'Изменить пароль',
        save: 'Сохранить'
      },
      success: {
        text: 'Данные успешно обновлены!',
        link: 'Вернуться в личный кабинет'
      },
      inputs: {
        birthday: "Дата рождения",
        country: "Страна",
        city: "Город",
        company: "Учреждение",
        department: "Специализация",
        position: "Должность",
        rank: "Ученое звание",
        degree: "Ученая степень",
        phone: "Телефон",
        email: "Email",
      }
    },
    verify: {
      title: 'Прохождение верификации',
      text: 'Для прохождения верификации как клинический ординатор или очный аспирант кафедры: пластическая хирургия / челюстно-лицевая хирургия / косметология / дерматология Вам необходимо загрузить скан справки из учебного заведения.<br><br><b>Принимаемые форматы: JPG, PNG, PDF, DOCX, DOC.</b>',
      upload: 'Отправить на верификацию',
      file: {
        choose: 'Выбрать файл',
        change: 'Изменить файл',
        load: 'ЗАГРУЗКА'
      },
      success: {
        title: 'Данные успешно отправлены!',
        text: 'Проверка занимает до двух рабочих дней.<br><br>После проходжения верификации Вы получите письмо на электронную почту, указанную в вашем профиле. Также информация про статус верификации появится в личном кабинете.',
        link: 'Вернуться в личный кабинет',
      }
    },
    changeFio:{
      title: 'Заявка на корректировку ФИО/Email:',
      text: 'Для изменения ФИО отправьте, пожалуйста, скан документа, удостоверяющего личность. Если вы хотите сообщить нам дополнительные сведения (например, для смены email адреса), напишите их в комментарии ниже.<br><br><b>Принимаемые форматы: JPG, PNG, PDF, DOCX, DOC.</b>',
      upload: 'Отправить запрос',
      file: {
        choose: 'Выбрать файл',
        change: 'Изменить файл',
        load: 'ЗАГРУЗКА'
      },
      success: {
        title: 'Данные успешно отправлены!',
        text: 'Проверка занимает до двух рабочих дней.<br><br>После проходжения проверки данные в личном кабинете автомотически обновятся.',
        link: 'Вернуться в личный кабинет',
      }
    },
    changePass: {
      title: ' Изменение пароля',
      labels: {
        newPass: 'Новый пароль',
        confirmPass: 'Подтвердите пароль',
      },
      buttons: {
        save: 'Сохранить'
      }
    },
    orderCart: {
      done: 'Вы уже приобрели полный доступ на конгресс. Спасибо!',
      placeholder: {
        text: 'Функционал покупки появится в ближайшее время',
        link: 'Вернуться назад'
      },
      totalPrice: {
        text: 'ИТОГО',
        discountText: 'Стоимость со скидкой',
        back: 'Назад',
        next: 'Далее',
        makeOrder: 'Перейти к оплате'
      },
      modal: {
        text: `<p>Вы зарегистрировались как клинический ординатор или очный аспирант кафедры: пластическая хирургия / челюстно-лицевая хирургия / косметология / дерматология.</p>
          <p><b>Обращаем внимание, что для получения дополнительной  скидки Вам необходимо пройти верификацию!</b></p>`,
        buttons: {
          verify: 'Пройти верификацию',
          skip: 'Позже'
        }
      },
      orderCartDates: {
        title: 'Выберите формат и даты участия в конгрессе',
        countdown: {
          text: 'Скидка действует при оплате до 15 мая 2021 г. До повышения стомости осталось',
          time: '{d} дн.{h} час. {m} мин.'
        },
        date: {
          offline: 'Офлайн',
          online: 'Онлайн',
        },
        table: {
          head: [
            'ОФЛАЙН доступ',
            'ОНЛАЙН доступ'
          ],
          body: [
            {title: 'Очный доступ на научные заседания Конгресса', offline: true, online: false},
            {title: 'Online доступ на трансляцию Конгресса', offline: true, online: true},
            {title: 'Бесплатный доступ на 6 месяцев к видеозаписям Конгресса', offline: true, online: true},
            {
              title: 'Информационный пакет участника: печатная версия программы, сборник материалов',
              offline: true,
              online: false
            },
            {title: 'Персональный бейдж', offline: true, online: false},
            {title: 'Номерной электронный сертификат участника Конгресса', offline: true, online: true},
            {title: 'Выдача баллов НМО', offline: true, online: true},
            {title: 'Выставка, кофе-брейки, обеды', offline: true, online: false},
          ]
        },
        clearSelect: 'Очистить выбор'
      },
      orderCartWorkshops: {
        title: 'Дополнительные услуги',
        done: 'Вы уже приобрели все дополнительные услуги',
        link: {
          more: 'Подробнее',
          site: 'Сайт партнера'
        }
      },
      orderCartBasket: {
        title: 'Ваш заказ',
        coupon:{
          placeholder: 'Промокод на скидку',
          submit: 'Применить',
          delete: 'Удалить',
          error:'Промокод введен некорректно'
        }
      }
    },
    forgetPass: {
      title: 'Восстановить пароль',
      subtitle: 'Если вы забыли пароль, введите Email. Данные для авторизации будут высланы вам по E-Mail.',
      error: 'Пользователь не найден',
      success: 'Пожалуйста, дождитесь письма, данные для авторизации были высланы на email.',
      submit: 'Получить пароль',
      links: {
        logIn: 'На страницу авторизации',
        back: 'Назад'
      }
    },
    payment: {
      success: {
        title: 'Успешная оплата',
        subtitle: 'Оплата прошла успешно!',
        text: 'Спасибо, заказ #{orderNum} успешно оплачен!',
        link: 'Перейти в личный кабинет',
      },
      error: {
        title: 'Ошибка',
        subtitle: 'Произошла ошибка при оплате',
        link: 'Перейти в личный кабинет',
      }
    },
    errorPage: {
      text: 'Ошибка. Неправильно набран адрес, или такой страницы на сайте больше не существует.',
      link: 'Вернуться на главную страницу'
    },
    pagesTitle:{
      error: 'Страница не найдена',
      logIn: 'Авторизация',
      payment: 'Успешная оплата',
      errorPayment: 'Ошибка при оплате',
      forgetPass: 'Забыли пароль',
      signUp: 'Регистрация',
      personalCab: 'Личный кабинет',
      verify: 'Личный кабинет - Подтверждение статуса',
      orderCart: 'Личный кабинет - Оформить заказ',
      changeFio:'Личный кабинет - Изменить ФИО',
      changePass: 'Личный кабинет - Изменить пароль',
      userData: 'Личный кабинет - Персональная информация',
    }
  }
}

export default ru;