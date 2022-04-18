const GET_URL = 'https://25.javascript.pages.academy/keksobooking/data';
const SEND_URL = 'https://25.javascript.pages.academy/keksobooking';

const getAds = (onSuccess, onFail) =>{
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }else {
        onFail();
      }
    })
    .then((data) => {
      onSuccess(data);
    }).catch(() => {
      onFail();
    });
};

const sendAds = (onSuccess, onFail, body)=>{
  fetch(SEND_URL,
    {
      method:'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export{getAds,sendAds};
