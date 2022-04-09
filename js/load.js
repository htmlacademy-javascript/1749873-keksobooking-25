const getAds = (onSuccess, onFail) =>{
  fetch(
    'https://25.javascript.pages.academy/keksobooking/data'
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }else {
        onFail();
      }
    })
    .then((data) => {
      onSuccess(data.slice(0,20));
    }).catch(() => {
      onFail();
    });
};

const sendAds = (onSuccess, onFail, body)=>{
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
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
