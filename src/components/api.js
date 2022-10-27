const serverToken = 'b342c109-7049-4203-a802-95254b42aad3';
const cohort = 'plus-cohort-16';

function sendRequest(url, method, body) {

  const fetchHeaders = { authorization: serverToken };
  const fetchParams = { method: method,
                        headers: fetchHeaders };

  return fetch(url, fetchParams)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });

}

export function getUserInfo() {
  return sendRequest(`https://nomoreparties.co/v1/${cohort}/users/me`, 'GET');
}

export function getCards() {
  return sendRequest(`https://nomoreparties.co/v1/${cohort}/cards`, 'GET');
}

export const getInitialCards = () => {
  return fetch()
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}
