export default class GetUser {
  constructor(url) {
    this.url = url;
    this.avatar = document.querySelector('#avatar');
    this.name = document.querySelector('.profile h1');
    this.bio = document.querySelector('.profile span');
    this.city = document.querySelector('.city');
    this.company = document.querySelector('.company');
  }

  async fecthData() {
    try {
      const response = await fetch(this.url);
      if (response.ok) {
        this.data = await response.json();
        this.updateProfile();
        this.updateContact();
      } else console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  }

  updateProfile() {
    this.avatar.setAttribute('src', this.data.avatar_url);
    this.name.innerText = this.data.name;
    this.bio.innerText = this.data.bio;
  }

  updateContact() {
    this.city.innerHTML = `<img src="assets/map-pin.svg" alt="">${this.data.location}`;
    this.company.innerHTML = `<img src="assets/briefcase.svg" alt="">${this.data.company}`;
  }

  async init() {
    await this.fecthData();
    return this;
  }
}
