export const breakpoints = {
  xsWidth: 0,
  smWidth: 576,
  mdWidth: 768,
  lgWidth: 992,
  xlWidth: 1200,
}

export let baseURL = 'http://test.spbcongres.beget.tech';

if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_MODE !== 'test') {
  baseURL = 'https://spbcongress.com';
} else if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_MODE === 'test') {
  baseURL = 'http://test.spbcongres.beget.tech';
}


// eslint-disable-next-line no-useless-escape
export const mailPattern = /^[\.a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;

export const namePattern = /^[a-z\s-]+$|^[а-яё\s-]+$/i;
// eslint-disable-next-line no-useless-escape
export const phonePattern = /^[+]?[\d\-\(\)\s]+$/;
// eslint-disable-next-line no-useless-escape
export const phoneAllowPattern = /[^0-9\s+\(\)]/g;
// eslint-disable-next-line no-useless-escape
export const emailAllowPattern = /[^a-z0-9\._@-]/gi;

let isUserAuth = false
export const getIsUserAuth = () => {
  return isUserAuth;
}
export const setIsUserAuth = (value) =>{
  isUserAuth = value;
}

let isTildaUser = false;
export const getIsTildaUser = () => {
  return isTildaUser;
}
export const setIsTildaUser = (value) =>{
  isTildaUser = value;
}