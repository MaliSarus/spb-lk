const en = {
  message: {
    departments:{
      other:'other'
    },
    header: {
      noname: 'Personal room',
      menu: {
        userData: 'Credentials',
        orderCart: 'Register for participation',
        logout: 'Log Out',
      }
    },
    footer: {
      text: 'All offers and prices on the website are for informational purposes only and are not a public offer (Article 437 of the Civil Code of the Russian Federation).'
    },
    logIn: {
      title: 'Personal room',
      forgetPass: 'Forget password?',
      buttons: {
        signUp: 'Sign Up',
        signIn: 'Sign In',
      },
      inputs: {
        email: 'Email',
        password: 'Password'
      },
      noOneAuth: {
        loading: 'Logging out',
        noLoading: 'Log out from all devices'
      }
    },
    signUp: {
      title: 'Sign up',
      inputs: {
        name: 'Name *',
        lastName: 'Last name *',
        secondName: "Second name",
        birthday: "Birthday *",
        country: "Country *",
        city: "City *",
        company: "Company *",
        department: "Department *",
        position: "Position *",
        rank: "Scientist rank",
        degree: "Scientist degree",
        phone: "Phone number *",
        email: "Email *",
        password: "Password (min. 6 symb.) *",
        confirmPassword: "Confirm password *",
        ordinator: 'I am a resident or full-time graduate student of the department: plastic surgery',
        policy: {
          text: 'I agree with',
          link: 'Privacy policy'
        },
        otherDepartment: 'Department (other)',
      },
      buttons: {
        next: 'Next',
        signUp: 'Sign Up'
      },
      success: {
        title: 'Registration completed successfully!',
        subtitle: 'A confirmation email has been sent to your email, please follow the link and activate your account',
        link: 'Go to personal room'
      }
    },
    personalCab: {
      title: 'Personal room'
    },
    mainPage: {
      title: 'Payed orders',
      controls: {
        userData: {
          title: 'Personal data',
          text: 'View / change personal data, pass verification'
        },
        orderCart: {
          title: 'Order services',
          text: 'Select dates, format of participation in the congress, as well as order additional services'
        }
      }
    },
    userData: {
      title: 'Personal Data',
      tooltip: {
        title: 'These data are changed only upon official request.',
        text: 'Fill out the form by sending a request with a request to change contact information, as well as a scan of an identity document.',
        link: 'Go to'
      },
      verify: {
        verified: 'You have successfully verified your status! <b> Your account has been verified. </b> In the section “Registration of participation” there are special prices for you.',
        notVerified: 'Please note that you need to confirm that you are a clinical resident or full-time graduate student of the department: plastic surgery',
        checkbox: 'I am a resident or full-time graduate student of the department',
        link: 'Go to verification'
      },
      buttons: {
        changePass: 'Change password',
        save: 'Save'
      },
      success: {
        text: 'Data updated successfully!',
        link: 'Return to personal room'
      },
      inputs: {
        birthday: "Birthday",
        country: "Country",
        city: "City",
        company: "Company",
        department: "Department",
        position: "Position",
        rank: "Scientist rank",
        degree: "Scientist degree",
        phone: "Phone number",
        email: "Email",
      }
    },
    verify: {
      title: 'Verification passing',
      text: 'To pass verification as a clinical resident or full-time postgraduate student of the department: plastic surgery / maxillofacial surgery / cosmetology / dermatology, you need to download a scan of the certificate from the educational institution. <br> <br> <b> Accepted formats: JPG, PNG, PDF, DOCX , DOC. </b>',
      upload: 'Send for verification',
      file: {
        choose: 'Choose file',
        change: 'Change file',
        load: 'Load'
      },
      success: {
        title: 'Data sent successfully!',
        text: 'Verification takes up to two working days. <br> <br> After passing the verification, you will receive an email to the email specified in your profile. Also, information about the verification status will appear in your personal account.',
        link: 'Return to personal room',
      }
    },
    changeFio:{
      title: 'Request for correction of full name / Email:',
      text: 'To change your full name, please send a scan of your identity document. If you want to tell us additional information (for example, to change your email address), write them in the comments below. <br> <br> <b> Accepted formats: JPG, PNG, PDF, DOCX, DOC. </b>',
      upload: 'Send request',
      file: {
        choose: 'Choose file',
        change: 'Change file',
        load: 'LOAD'
      },
      success: {
        title: 'Data sent successfully!',
        text: 'Verification takes up to two working days. <br> <br> After passing the verification, the data in your personal account will be automatically updated.',
        link: 'Return to personal room',
      }
    },
    changePass: {
      title: 'Change password',
      labels: {
        newPass: 'New password',
        confirmPass: 'Confirm password',
      },
      buttons: {
        save: 'Save'
      }
    },
    orderCart: {
      done: 'You have already purchased full congress access. Thanks!',
      placeholder: {
        text: 'Purchase functionality coming soon',
        link: 'Go back'
      },
      totalPrice: {
        text: 'TOTAL',
        discountText: 'Price with discount',
        back: 'Back',
        next: 'Next',
        makeOrder: 'Make order'
      },
      modal: {
        text: `<p> You have registered as a clinical resident or full-time postgraduate student of the department: plastic surgery / maxillofacial surgery / cosmetology / dermatology. </p>
          <p> <b> Please note that in order to receive an additional discount, you need to go through verification! </b> </p>`,
        buttons: {
          verify: 'Pass verification',
          skip: 'Skip'
        }
      },
      orderCartDates: {
        title: 'Select the format and dates of participation in the congress',
        countdown: {
          text: 'The discount is valid if paid before April 30, 2021. Until the cost increase is',
          time: '{d} d. {h} h. {m} m.'
        },
        date: {
          offline: 'Offline',
          online: 'Online',
        },
        table: {
          head: [
            'OFFLINE access',
            'ONLINE access'
          ],
          body: [
            {title: 'Access to scientist conversation', offline: true, online: false},
            {title: 'Online access to streams', offline: true, online: true},
            {title: 'Free access on 6 months to videos', offline: true, online: true},
            {
              title: 'Participant information package: printed version of the program, collection of materials',
              offline: true,
              online: false
            },
            {title: 'Personal badge', offline: true, online: false},
            {title: 'Numbered electronic certificate of the Congress participant', offline: true, online: true},
            {title: 'Issuance of CME points', offline: true, online: true},
            {title: 'Exhibition, coffee breaks, lunches', offline: true, online: false},
          ]
        },
        clearSelect: 'Clear select'
      },
      orderCartWorkshops: {
        title: 'Additional services',
        done: 'You have already purchased all optional services',
        link: {
          more: 'More details',
          site: 'Partner\'s site'
        }
      },
      orderCartBasket: {
        title: 'Your order',
        coupon:{
          placeholder: 'Discount promo code',
          submit: 'Apply',
          delete: 'Delete',
          error:'The promo code was entered incorrectly'
        }
      }
    },
    forgetPass: {
      title: 'Restore password',
      subtitle: 'If you forgot your password, enter your Email. Authorization data will be sent to you by E-Mail.',
      error: 'User is not found',
      success: 'Please wait for the letter, the authorization data has been sent to your email.',
      submit: 'Get password',
      links: {
        logIn: 'Go to log in',
        back: 'Back'
      }
    },
    payment: {
      success: {
        title: 'Successful payment',
        subtitle: 'The payment was successful!',
        text: 'Thank you, order #{orderNum} has been successfully paid!',
        link: 'Go to personal room',
      },
      error: {
        title: 'Error',
        subtitle: 'An error in payment has occurred',
        link: 'Go to personal room',
      }
    },
    errorPage: {
      text: 'Mistake. The address is incorrectly typed, or such a page on the site no longer exists.',
      link: 'Return to the homepage'
    },
    pagesTitle:{
      error: 'Page not found',
      logIn: 'Log In',
      payment: 'Successful payment',
      errorPayment: 'Error in payment',
      forgetPass: 'Forget pass',
      signUp: 'Sign Up',
      personalCab: 'Personal room',
      verify: 'Personal room - Confirming status',
      orderCart: 'Personal room - Place an order',
      changeFio:'Personal room - Change name',
      changePass: 'Personal room - Change password',
      userData: 'Personal room - Personal information',
    }
  }
}

export default en;