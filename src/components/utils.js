export function getInputListFromForm(form, selector){
  return form.querySelectorAll(selector);
}

export function getSubmitFromForm(form, selector){
  return form.querySelector(selector);
}
