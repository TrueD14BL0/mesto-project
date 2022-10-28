const serverToken = 'b342c109-7049-4203-a802-95254b42aad3';
const cohort = 'plus-cohort-16';

function sendRequest(url, method, body=null) {

  const fetchHeaders = { authorization: serverToken,
                         'Content-Type': 'application/json' };
  const fetchParams = { method: method,
                        headers: fetchHeaders };
  if(body!==null){
    fetchParams.body = JSON.stringify(body);
  }

  return fetch(url, fetchParams)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });

}

export const getUserInfo = () => {
  return sendRequest(`https://nomoreparties.co/v1/${cohort}/users/me`, 'GET');
}

export const setUserInfo = (name, about) => {
  return sendRequest(`https://nomoreparties.co/v1/${cohort}/users/me`,
                      'PATCH',
                      {
                        name: name,
                        about: about
                      }
                    );
}

export const getCards = () => {
  return sendRequest(`https://nomoreparties.co/v1/${cohort}/cards`, 'GET');
}

export const setNewCard = (name, link) => {
  return sendRequest(`https://nomoreparties.co/v1/${cohort}/cards`,
                     'POST',
                      {
                        name: name,
                        link: link
                      }
                    );
}

export const delCard = (cardId) => {
  return sendRequest(`https://nomoreparties.co/v1/${cohort}/cards/${cardId}`, 'DELETE');
}

export const setLike = (cardId) => {
  return sendRequest(`https://nomoreparties.co/v1/${cohort}/cards/likes/${cardId}`, 'PUT');
}

export const delLike = (cardId) => {
  return sendRequest(`https://nomoreparties.co/v1/${cohort}/cards/likes/${cardId}`, 'DELETE');
}
