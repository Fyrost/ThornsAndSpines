import Axios from "axios";

const urlProvince = `api/shipping/province`;
const urlCity = provinceId => `api/shipping/province/${provinceId}/city`;
const urlRegister = `api/register`;
const urlVerify = `api/email/verify`;
const urlResend = `api/email/resend`;
const urlLoginAccount = `api/login`;

export const catchError = err => {
  err.config && console.log(err.config);
  if (err.response) {
    switch (err.response.status) {
      case 401:
      case 422:
      case 429:
        return err.response.data.message;
      case 500:
        return "internal server error";
      default:
        return `error ${err.response.status}`;
    }
  } else if (err.request) {
    console.log(err.request);
    return "No Response";
  } else {
    return `Error ${err.message}`;
  }
};

export const getProvince = () => {
  return Axios({
    url: urlProvince,
    method: "get"
  });
};

export const getCity = provinceId => {
  return Axios({
    url: urlCity(provinceId),
    method: "get"
  });
};

export const createAccount = ({
  email,
  password,
  password1,
  first_name,
  last_name,
  address,
  shipping_fees_id,
  contact_number
}) => {
  return Axios({
    url: urlRegister,
    method: "post",
    data: {
      email,
      password,
      password1,
      first_name,
      last_name,
      address,
      shipping_fees_id,
      contact_number
    }
  });
};

export const verifyCode = ({ token }) => {
  return Axios({
    url: urlVerify,
    method: "post",
    data: {
      token
    }
  });
};

export const resendCode = ({ email }) => {
  return Axios({
    url: urlResend,
    method: "post",
    data: {
      email
    }
  });
};

export const loginAccount = ({ email, password }) => {
  return Axios({
    url: urlLoginAccount,
    method: "post",
    data: {
      email,
      password
    }
  });
};
