export default class UserInfo {
  constructor(selectors) {
    this._nameProfile = document.querySelector(selectors.name);
    this._aboutProfile = document.querySelector(selectors.about);
    this._avatarProfile = document.querySelector(selectors.avatar);
  }

  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      about: this._aboutProfile.textContent
    }
  }

  setUserInfo({name, about, avatar}) {
    this._nameProfile.textContent = name;
    this._aboutProfile.textContent = about;
    this._avatarProfile.src = avatar;
  }
}