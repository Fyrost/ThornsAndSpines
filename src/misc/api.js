import Axios from "axios";

const urlProvince = `api/shipping/province`;
const urlCity = provinceId => `api/shipping/province/${provinceId}/city`;
const urlRegister = `api/register`;
const urlVerify = `api/email/verify`;
const urlResend = `api/email/resend`;
const urlLoginAccount = `api/login`;
const urlHome = `api/product`;
const urlProduct = code => `api/product/${code}`;
const urlCart = `api/cart`;
const urlUpdateCart = cartId => `${urlCart}/update/${cartId}`;
const urlCreateOrder = `api/order/create`;
const urlOrderSummary = `api/order/summary`;
const urlOrder = `api/order`;
const urlShowOrder = code => `api/order/show/${code}`;
const urlUploadReceipt = code => `api/order/update/${code}`;

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
      city_province_id,
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

export const getHome = () => {
  return Axios({
    url: urlHome,
    params: {
      api_token: global.api_token
    },
    method: "get"
  });
};

export const getProduct = code => {
  return Axios({
    url: urlProduct(code),
    params: {
      api_token: global.api_token
    }
  });
};

export const addToCart = ({ product_id, pot_id }) => {
  return Axios({
    url: urlCart,
    method: "post",
    data: {
      product_id,
      pot_id,
      quantity: "1"
    },
    params: {
      api_token: global.api_token
    }
  });
};

export const getCart = () => {
  return Axios({
    url: urlCart,
    params: {
      api_token: global.api_token
    }
  });
};

export const updateCart = ({ cartId, quantity }) => {
  return Axios({
    url: urlUpdateCart(cartId),
    method: "post",
    data: {
      quantity
    },
    params: {
      api_token: global.api_token
    }
  });
};

export const getRecipient = () => {
  return Axios({
    url: urlCreateOrder,
    params: {
      api_token: global.api_token
    }
  });
};

export const getSummary = ({
  city_province_id,
  courier_id,
  use_loyalty_points,
  use_mine,
  delivery_date
}) => {
  return Axios({
    url: urlOrderSummary,
    method: "post",
    data: {
      city_province_id,
      courier_id,
      use_loyalty_points,
      delivery_date,
      use_mine
    },
    params: {
      api_token: global.api_token
    }
  });
};

export const finalizeOrder = ({
  remark,
  city_province_id,
  payment_method,
  recipient_first,
  recipient_last,
  recipient_address,
  recipient_email,
  recipient_contact_number,
  delivery_date,
  courier_id,
  use_loyalty_points
}) => {
  return Axios({
    url: urlOrder,
    method: "post",
    data: {
      remark,
      city_province_id,
      payment_method,
      recipient_first,
      recipient_last,
      recipient_address,
      recipient_email,
      recipient_contact_number,
      delivery_date,
      courier_id,
      use_loyalty_points
    },
    params: {
      api_token: global.api_token
    }
  });
};

export const getOrders = () => {
  return Axios({
    url: urlOrder,
    params: {
      api_token: global.api_token,
      status: "all"
    }
  });
};

export const showOrder = code => {
  return Axios({
    url: urlShowOrder(code),
    params: {
      api_token: global.api_token
    }
  });
};

export const uploadReceipt = ({ img, code }) => {
  let data = new FormData();
  img.forEach(image_file => {
    data.append("img[]", image_file);
  });
  return Axios({
    url: urlUploadReceipt(code),
    method: "post",
    data,
    params: {
      api_token: global.api_token
    }
  });
};
