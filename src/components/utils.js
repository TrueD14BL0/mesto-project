const token = 'b342c109-7049-4203-a802-95254b42aad3';
const group = 'plus-cohort-16';

const getRequestToServer = ()=>{
  return fetch(`https://nomoreparties.co/v1/${group}/cards`, {
    headers: {
      authorization: token
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
}

export function getInputListFromForm(form, selector){
  return form.querySelectorAll(selector);
}

export function getSubmitFromForm(form, selector){
  return form.querySelector(selector);
}
