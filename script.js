//Переменные модалки редактирования профиля
const popupInfo = document.querySelector('#popup_info');
const nameInput = popupInfo.querySelector('.popup__input_info_name');
const jobInput = popupInfo.querySelector('.popup__input_info_profession');
const closeButtonPopupInfo = popupInfo.querySelector('.popup__button');
const formPopupInfo = popupInfo.querySelector('form');

//Переменные профиля
const openButtonPopupInfo = document.querySelector('.profile__edit');
const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');

//Переменные модалки карточки
const popupCard = document.querySelector('#popup_card');
const openButtonPopupCard = document.querySelector('.profile__add');
const closeButtonPopupCard = popupCard.querySelector('.popup__button');
const formPopupCard = popupCard.querySelector('form');


//Переменные модалки просмотра картинки
const popupImage = document.querySelector('#popup_image');
const imageClick = popupImage.querySelector('.popup__image');
const imageSubtitle = popupImage.querySelector('.popup__subtitle');
const closeButtonPopupImage = popupImage.querySelector('.popup__button');

const templateCard = document.querySelector('#template_card').content;
const listCards = document.querySelector('.cards__list');


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escClose)
  popup.addEventListener('click', overlayClose)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClose);
  popup.removeEventListener('click', overlayClose);
}

function escClose(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}

function overlayClose(event) {
  const popup = document.querySelector('.popup_opened')
  if (event.target === popup) {
    closePopup(popup)
  }
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  professionProfile.textContent = jobInput.value;
  closePopup(popupInfo);
};

function handleCreatCardFromSubmit(evt) {
  evt.preventDefault();
  const popupImageName = popupCard.querySelector('.popup__input_name_image').value;
  const popupImageUrl = popupCard.querySelector('.popup__input_src_image').value;  
  appendCard(creatCard(popupImageName, popupImageUrl)); //Вставка карточки
  closePopup(popupCard);
  formPopupCard.reset(); //Обнуление формы модалки создания карточки
};

function creatCard(name, link) {
  const templateElement = templateCard.querySelector('li').cloneNode(true); //клонируем карточку
  const buttonLike = templateElement.querySelector('.card__like-button');
  const buttonTrash = templateElement.querySelector('.card__trash-button');
  const buttonImage = templateElement.querySelector('.card__image');

  templateElement.querySelector('.card__title').textContent = name;
  templateElement.querySelector('.card__image').src = link;
  templateElement.querySelector('.card__image').alt = name;
  
  buttonLike.addEventListener('click', () => buttonLike.classList.toggle('card__like-button_active')); //Добавление обработчика лайков
  buttonTrash.addEventListener('click', () => templateElement.remove()); //Добавление обработчика удаление карточки
  //Обработчик просмотра картинки
  buttonImage.addEventListener('click', () => {
    openPopup(popupImage); //Открытие модалки
    imageClick.src = link; //Заменяем картинку
    imageClick.alt = name; //Прописываем alt
    imageSubtitle.textContent = name; //Заменяем подпись      
  });

  return templateElement;
};

//Функция загрузки стартовых карточек
function renderCard(arrayCard) {
  arrayCard.forEach(item => appendCard(creatCard(item.name, item.link)));
};

//Вставка карточки в начало списка
function appendCard(card) {
  listCards.prepend(card);
}

renderCard(initialCards); //Рендеринг стартовых карточек

//Обработчики событий

formPopupInfo.addEventListener('submit', handleProfileEditFormSubmit); //Обработчик отправки формы редактирования профиля
closeButtonPopupImage.addEventListener('click', () => closePopup(popupImage)); //Добавление обработчика закрытие модалки просмотра картинки
formPopupCard.addEventListener('submit', handleCreatCardFromSubmit); //Обработчик отправки формы
openButtonPopupCard.addEventListener('click', () => openPopup(popupCard)); //Обработчик открытия модалки добавление карточки
closeButtonPopupCard.addEventListener('click', () => closePopup(popupCard)); //Обработчик закрытия модалки добавление карточки
//Обработчик открытия модалки редактирования профиля
openButtonPopupInfo.addEventListener('click', () => {
  openPopup(popupInfo)
  nameInput.value = nameProfile.textContent;
  jobInput.value = professionProfile.textContent;
}); 
closeButtonPopupInfo.addEventListener('click', () => closePopup(popupInfo)); //Обработчик закрытия модалки редактирования профиля




function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add('popup__error_active');
  errorElement.textContent = errorMessage;
  // inputElement.classList.add('popup__input_type_error');
  //Добавить стили для класса popup__input_type_error
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('popup__error_active');
  // inputElement.classList.remove('popup__input_type_error');
}

function setEventListener(formElement) {
  const inputElements = formElement.querySelectorAll('.popup__input');
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
    })
  })
}

function enableValidation() {
  const formElements = document.querySelectorAll('.form');
  formElements.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    })

    setEventListener(formElement);
  })
}

enableValidation()