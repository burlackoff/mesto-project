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
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  professionProfile.textContent = jobInput.value;
  closePopup(popupInfo);
  formPopupCard.reset(); //Обнуление формы модалки создания карточки
};

function handleCreatCardFromSubmit(evt) {
  evt.preventDefault();
  const popupImageName = popupCard.querySelector('.popup__input_name_image').value;
  const popupImageUrl = popupCard.querySelector('.popup__input_src_image').value;  
  creatCard(popupImageName, popupImageUrl);
  closePopup(popupCard);
};

function creatCard(name, link) {
  const templateElement = templateCard.querySelector('li').cloneNode(true); //клонируем карточку
  const buttonLike = templateElement.querySelector('.card__like-button');
  const buttonTrash = templateElement.querySelector('.card__trash-button');
  const buttonImage = templateElement.querySelector('.card__image');

  templateElement.querySelector('.card__title').textContent = name;
  templateElement.querySelector('.card__image').src = link;
  templateElement.querySelector('.card__image').alt = name;
  
  appendCard(templateElement); //Вставка карточки
  
  buttonLike.addEventListener('click', () => buttonLike.classList.toggle('card__like-button_active')); //Добавление обработчика лайков
  buttonTrash.addEventListener('click', () => templateElement.remove()); //Добавление обработчика удаление карточки
  //Обработчик просмотра картинки
  buttonImage.addEventListener('click', () => {
    openPopup(popupImage); //Открытие модалки
    imageClick.src = link; //Заменяем картинку
    imageClick.alt = name; //Прописываем alt
    imageSubtitle.textContent = name; //Заменяем подпись    
  });
};

//Функция загрузки стартовых карточек
function renderCard(arrayCard) {
  arrayCard.forEach(item => creatCard(item.name, item.link))
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