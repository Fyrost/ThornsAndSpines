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
const urlDeleteCart = cartId => `${urlCart}/delete/${cartId}`;
const urlCreateOrder = `api/order/create`;
const urlOrderSummary = `api/order/summary`;
const urlOrder = `api/order`;
const urlShowOrder = code => `api/order/show/${code}`;
const urlUploadReceipt = code => `api/order/update/${code}`;
const urlFAQs = `api/faq`;
const urlFAQShow = id => `api/faq/${id}`;
const urlContact = `api/configuration`;
const urlUserInfo = `api/user/show`;
const urlUserEditInfo = `api/user/edit`;
const urlUserUpdate = `api/user/update`;

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

export const getCity = province_id => {
  return Axios({
    url: urlCity(province_id),
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
  city_province_id,
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

export const getBrowseProduct = ({ type, search }) => {
  return Axios({
    url: `${urlHome}/${type}`,
    params: {
      api_token: global.api_token,
      search
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

export const deleteCart = ({ cartId }) => {
  return Axios({
    url: urlDeleteCart(cartId),
    method: "post",
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

export const getFAQs = () => {
  return Axios({
    url: urlFAQs
  });
};

export const showFAQ = ({ id }) => {
  return Axios({
    url: urlFAQShow(id)
  });
};

export const getContacts = () => {
  return Axios({
    url: urlContact,
    params: {
      api_token: global.api_token
    }
  });
};

export const getUserInfo = () => {
  return Axios({
    url: urlUserInfo,
    params: {
      api_token: global.api_token
    }
  });
};

export const getUserEdit = () => {
  return Axios({
    url: urlUserEditInfo,
    params: {
      api_token: global.api_token
    }
  });
};

export const updateUser = ({
  password,
  password1,
  first_name,
  last_name,
  address,
  city_province_id,
  contact_number
}) => {
  let data = new FormData();
  if (password && password1) {
    data.append("password", password);
    data.append("password1", password1);
  }
  data.append("first_name", first_name);
  data.append("last_name", last_name);
  data.append("address", address);
  data.append("city_province_id", city_province_id);
  data.append("contact_number", contact_number);
  return Axios({
    url: urlUserUpdate,
    method: "post",
    data,
    params: {
      api_token: global.api_token
    }
  });
};
