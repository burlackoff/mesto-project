function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Модальное окно редактирование профиля
//start

const popupInfo = document.querySelector('#popup_info');
const openButtonPopupInfo = document.querySelector('.profile__edit');
const closeButtonPopupInfo = popupInfo.querySelector('.popup__button');

//Открытие модального окна
openButtonPopupInfo.addEventListener('click', function () {
  openPopup(popupInfo);
});

//Закрытие модального окна
closeButtonPopupInfo.addEventListener('click', function () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = professionProfile.textContent;
  closePopup(popupInfo);
})

//Редактирование информации о профиле
const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');

const nameInput = popupInfo.querySelector('.popup__input_info_name');
const jobInput = popupInfo.querySelector('.popup__input_info_profession');

function formSubmitProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  professionProfile.textContent = jobInput.value;
  popupInfo.classList.remove('popup_opened');
};

popupInfo.addEventListener('submit', formSubmitProfile);

//Модальное окно редактирование профиля
//end

//Модальное окно добавления картинки
//start

const popupCard = document.querySelector('#popup_card');
const openButtonPopupCard = document.querySelector('.profile__add');
const closeButtonPopupCard = popupCard.querySelector('.popup__button');

openButtonPopupCard.addEventListener('click', function () {
  openPopup(popupCard);
})

closeButtonPopupCard.addEventListener('click', function () {
  closePopup(popupCard);
})

// Добавление картинки
function formSubmitImage(evt) {
  evt.preventDefault();
  
  const popupImageName = popupCard.querySelector('.popup__input_name_image').value;
  const popupImageUrl = popupCard.querySelector('.popup__input_src_image').value;

  creatCard(popupImageName, popupImageUrl);
};

popupCard.addEventListener('submit', formSubmitImage);

//Модальное окно добавления картинки
//end

//Реализация кнопок лайка, удаления и модального окна просмотра картинки
// const popupImage = document.querySelector('#popup_image');
// const closeButtonPopupImage = popupImage.querySelector('.popup__button');

// const list = document.querySelector('.cards');
// list.addEventListener('click', function (el) {
//   let button = el.target;
//   //Like button
//   if (button.closest('.card__like-button')) {
//     button.closest('.card__like-button').classList.toggle('card__like-button_active');
//   }
//   //delet button
//   else if (button.closest('.card__trash-button')) {
//     button.closest('li').remove();
//   }
//   //Открытие модального окна просмотра картинки
//   else if (button.closest('.card__image')) {
//     openPopup(popupImage);

//     //Заменям картику
//     const imageClick = popupImage.querySelector('.popup__image');
//     imageClick.src = button.closest('.card__image').src;

//     //Заменяем подпись
//     const imageSubtitle = popupImage.querySelector('.popup__subtitle');
//     const card = button.closest('.card__image').closest('.card');
//     subtitle = card.querySelector('.card__title').textContent;
//     imageSubtitle.textContent = subtitle;
//   }
// })

// closeButtonPopupImage.addEventListener('click', function () {
//   closePopup(popupImage);
// });

const listCards = document.querySelector('.cards__list');
const formPopupCard = popupCard.querySelector('form');
const templateCard = document.querySelector('#template_card').content;

//Функция создание карточек
function creatCard(name, link) {
  const templateElement = templateCard.querySelector('li').cloneNode(true); //клонируем карточку
  const buttonLike = templateElement.querySelector('.card__like-button');
  const buttonTrash = templateElement.querySelector('.card__trash-button');
  const buttonImage = templateElement.querySelector('.card__image');

  templateElement.querySelector('.card__title').textContent = name;
  templateElement.querySelector('.card__image').src = link;
  templateElement.querySelector('.card__image').alt = name;
  listCards.prepend(templateElement); //Вставка карточки в начало списка

  popupCard.classList.remove('popup_opened'); //Закрытие модалки после создание карточки
  formPopupCard.reset(); //Обнуление формы модалки создания карточки
  
  buttonLike.addEventListener('click', () => buttonLike.classList.toggle('card__like-button_active')); //Добавление обработчика лайков
  buttonTrash.addEventListener('click', () => buttonTrash.closest('li').remove()); //Добавление обработчика удаление карточки
};

//Функция загрузки стартовых карточек
function renderCard(arrayCard) {
  arrayCard.forEach(item => creatCard(item.name, item.link))
};

renderCard(initialCards);

