export const baseURL = 'http://spbcongres.beget.tech';
// eslint-disable-next-line no-useless-escape
export const mailPattern = /^[\.a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
export const namePattern = /^[a-z\s-]+$|^[а-яё\s-]+$/i;
// eslint-disable-next-line no-useless-escape
export const phonePattern = /^[+]?[\d\-\(\)\s]+$/;
// eslint-disable-next-line no-useless-escape
export const phoneAllowPattern = /[^0-9\s+\(\)]/g;
// eslint-disable-next-line no-useless-escape
export const emailAllowPattern = /[^a-z0-9\._@-]/gi;