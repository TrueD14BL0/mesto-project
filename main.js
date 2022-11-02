/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";function t(t,e){return t.querySelectorAll(e)}function e(t,e){return t.querySelector(e)}function r(r){n(t(r,".form__text-input"),e(r,".form__button"),"popup__button_disabled")}var n=function(t,e,r){!function(t){return Array.from(t).some((function(t){return!t.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove(r)):(e.disabled=!0,e.classList.add(r))};function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function i(){i=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},c=n.iterator||"@@iterator",a=n.asyncIterator||"@@asyncIterator",u=n.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof p?e:p,i=Object.create(o.prototype),c=new x(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var c=r.delegate;if(c){var a=w(c,r);if(a){if(a===d)continue;return a}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=f(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===d)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,c),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var d={};function p(){}function v(){}function h(){}var m={};l(m,c,(function(){return this}));var y=Object.getPrototypeOf,_=y&&y(y(k([])));_&&_!==e&&r.call(_,c)&&(m=_);var g=h.prototype=p.prototype=Object.create(m);function L(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function n(i,c,a,u){var l=f(t[i],t,c);if("throw"!==l.type){var s=l.arg,d=s.value;return d&&"object"==o(d)&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,a,u)}),(function(t){n("throw",t,a,u)})):e.resolve(d).then((function(t){s.value=t,a(s)}),(function(t){return n("throw",t,a,u)}))}u(l.arg)}var i;this._invoke=function(t,r){function o(){return new e((function(e,o){n(t,r,e,o)}))}return i=i?i.then(o,o):o()}}function w(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,w(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var n=f(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,d;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function b(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function x(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function k(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:q}}function q(){return{value:void 0,done:!0}}return v.prototype=h,l(g,"constructor",h),l(h,"constructor",v),v.displayName=l(h,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,l(t,u,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},L(E.prototype),l(E.prototype,a,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var c=new E(s(e,r,n,o),i);return t.isGeneratorFunction(r)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},L(g),l(g,u,"Generator"),l(g,c,(function(){return this})),l(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=k,x.prototype={constructor:x,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(b),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return c.type="throw",c.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var a=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(a&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(a){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var c=i?i.completion:{};return c.type=t,c.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),b(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;b(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},t}function c(t,e,r,n,o,i,c){try{var a=t[i](c),u=a.value}catch(t){return void r(t)}a.done?e(u):Promise.resolve(u).then(n,o)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){c(i,n,o,a,u,"next",t)}function u(t){c(i,n,o,a,u,"throw",t)}a(void 0)}))}}var u="b342c109-7049-4203-a802-95254b42aad3",l="plus-cohort-16";function s(t,e){return f.apply(this,arguments)}function f(){return f=a(i().mark((function t(e,r){var n,o,c,a=arguments;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=a.length>2&&void 0!==a[2]?a[2]:null,o={method:r,headers:{authorization:u,"Content-Type":"application/json"}},null!==n&&(o.body=JSON.stringify(n)),t.next=7,fetch(e,o);case 7:if(!(c=t.sent).ok){t.next=10;break}return t.abrupt("return",c.json());case 10:return t.next=12,Promise.reject("Ошибка: ".concat(c.status));case 12:return t.abrupt("return",t.sent);case 13:case"end":return t.stop()}}),t)}))),f.apply(this,arguments)}var d="",p=function(){return d},v=document.querySelector(".profile__title"),h=document.querySelector(".profile__subtitle"),m=document.querySelector(".profile__avatar"),y=document.querySelector(".profile__edit-button"),_=document.querySelector(".popup_type_edit-form"),g=document.querySelector(".form-profile-edit"),L=document.querySelector(".form-profile-edit__name"),E=document.querySelector(".form-profile-edit__job"),w=g.querySelector(".form__button"),S=document.querySelector(".profile__avatar-edit-btn"),b=document.querySelector(".popup_type_edit-avatar-form"),x=document.querySelector(".form-edit-avatar"),k=document.querySelector(".form-edit-avatar__url"),q=x.querySelector(".form__button"),C=document.querySelector(".profile__add-button"),j=document.querySelector(".form-new-place"),O=j.querySelector(".form__button"),P=document.querySelector(".form-del-card"),T=document.querySelector(".popup_type_add-form"),G=document.querySelector(".cards"),N=document.querySelector(".popup__description"),A=document.querySelector(".popup__picture"),D=document.querySelector(".popup_type_picture"),F=document.querySelector(".form-new-place__name"),I=document.querySelector(".form-new-place__url"),B=document.querySelector(".popup_type_del-card-form"),H=function(){return document.querySelector(".card_to-del")};function M(){var t;null!==(t=H())&&t.classList.remove("card_to-del"),document.querySelector(".popup_opened").classList.remove("popup_opened"),document.removeEventListener("keydown",Y),document.removeEventListener("mousedown",z)}function Y(t){"Escape"==t.key&&M()}function z(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close-button"))&&M()}function J(t){t.classList.add("popup_opened"),document.addEventListener("keydown",Y),document.addEventListener("mousedown",z)}var U=document.querySelector("#card-template").content;function K(t){t.classList.add("card__like_active")}function Q(t,e){t.querySelector(".card__like-count").textContent=e}function R(t,e,r,n,o){var i=U.querySelector(".card").cloneNode(!0),c=i.querySelector(".card__image"),a=i.querySelector(".card__like");i.dataset.cardId=t._id,Q(i,t.likes.length),t.likes.some((function(t){return t._id===e}))&&K(a);var u=i.querySelector(".card__delete");return t.owner._id!==e&&u.remove(),u.addEventListener("click",(function(){i.classList.add("card_to-del"),n()})),a.addEventListener("click",(function(e){return function(t,e,r,n){r.classList.contains("card__like_active")?n.delLike(t,e,r):n.setLike(t,e,r)}(i,t._id,e.target,o)})),c.src=t.link,c.alt=t.name,i.querySelector(".card__text").textContent=t.name,c.addEventListener("click",r),i}!function(){var o,i=this;o={formSelector:".form",inputSelector:".form__text-input",submitButtonSelector:".form__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"form__text-input_error",errorClass:"form__span_active"},document.querySelectorAll(o.formSelector).forEach((function(r){!function(r,o){var i=t(r,o.inputSelector),c=e(r,o.submitButtonSelector);i.forEach((function(t){t.addEventListener("input",(function(){(function(t,e,r){e.validity.valid?function(t,e,r,n){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(r),o.classList.remove(n),o.textContent=" "}(t,e,r.inputErrorClass,r.errorClass):function(t,e,r,n,o){var i=t.querySelector(".".concat(e.id,"-error"));e.classList.add(n),i.textContent=r,i.classList.add(o)}(t,e,function(t){return t.validity.patternMismatch?t.dataset.customError:t.validationMessage}(e),r.inputErrorClass,r.errorClass)})(r,t,o),n(i,c,o.inactiveButtonClass)}))}))}(r,o)}));var c=function(e){t(e.target,".form__text-input")||i.submit()};function a(){J(B)}function u(t,e,r){(function(t){return s("https://nomoreparties.co/v1/".concat(l,"/cards/likes/").concat(t),"DELETE")})(e).then((function(e){Q(t,e.likes.length),r.classList.remove("card__like_active")})).catch((function(t){console.log(t)}))}function f(t,e,r){(function(t){return s("https://nomoreparties.co/v1/".concat(l,"/cards/likes/").concat(t),"PUT")})(e).then((function(e){K(r),Q(t,e.likes.length)})).catch((function(t){console.log(t)}))}var Y=function(t){t.stopPropagation(),J(D),function(t){var e=t.target.closest(".card"),r=e.querySelector(".card__text").textContent;N.textContent=r,A.src=e.querySelector(".card__image").src,A.alt=r}(t)};C.addEventListener("click",(function(){J(T),j.reset(),F.dispatchEvent(new Event("input")),I.dispatchEvent(new Event("input")),r(T)})),j.addEventListener("submit",(function(t){var e,r;t.preventDefault(),O.value="Сохранение...",(e=F.value,r=I.value,s("https://nomoreparties.co/v1/".concat(l,"/cards"),"POST",{name:e,link:r})).then((function(t){G.append(R(t,p(),Y,a,{setLike:f,delLike:u})),M()})).catch((function(t){console.log(t)})).finally(O.value="Сохранить")})),j.addEventListener("keydown",(function(){return c})),P.addEventListener("submit",(function(t){var e,r;t.preventDefault(),null!==(r=H())&&(e=r.dataset.cardId,s("https://nomoreparties.co/v1/".concat(l,"/cards/").concat(e),"DELETE")).then((function(){r.remove(),M()})).catch((function(t){console.log(t)}))})),y.addEventListener("click",(function(){J(_),L.value=v.textContent,L.dispatchEvent(new Event("input")),E.value=h.textContent,E.dispatchEvent(new Event("input")),r(_)})),S.addEventListener("click",(function(){J(b),k.value=m.src,k.dispatchEvent(new Event("input")),r(b)})),g.addEventListener("submit",(function(t){var e,r;t.preventDefault(),w.value="Сохранение...",(e=L.value,r=E.value,s("https://nomoreparties.co/v1/".concat(l,"/users/me"),"PATCH",{name:e,about:r})).then((function(t){v.textContent=t.name,h.textContent=t.about,M()})).catch((function(t){console.log(t)})).finally(w.value="Сохранить"),g.reset()})),g.addEventListener("keydown",c),x.addEventListener("submit",(function(t){var e;t.preventDefault(),q.value="Сохранение...",(e=k.value,s("https://nomoreparties.co/v1/".concat(l,"/users/me/avatar"),"PATCH",{avatar:e})).then((function(t){m.src=t.avatar})).catch((function(t){console.log(t)})).finally(q.value="Сохранить"),M()})),x.addEventListener("keydown",c),s("https://nomoreparties.co/v1/".concat(l,"/users/me"),"GET").then((function(t){var e;e=t._id,d=e,s("https://nomoreparties.co/v1/".concat(l,"/cards"),"GET").then((function(t){t.forEach((function(t){G.append(R(t,p(),Y,a,{setLike:f,delLike:u}))}))})).catch((function(t){console.log(t)})),v.textContent=t.name,h.textContent=t.about,m.src=t.avatar})).catch((function(t){console.log(t)}))}()})();