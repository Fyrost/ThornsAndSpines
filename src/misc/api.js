import Axios from "axios";

const urlRegister = `api/register`;
const urlVerify = `api/email/verify`;
const urlResend = `api/email/resend`;

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

export const createAccount = ({
  email,
  password,
  password1,
  first_name,
  last_name,
  address,
  city,
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
      city,
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
