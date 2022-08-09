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

  setUserInfo(data) {
    this._nameProfile.textContent = data.name;
    this._aboutProfile.textContent = data.about;
    this._avatarProfile.src = data.avatar;
  }
}