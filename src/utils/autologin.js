export class AutoLogin {
  token = null;
  constructor() {
    this.params = new URLSearchParams(window.location.search);
    if (this.params.has("auto_login")) {
      this.token = this.params.get("auto_login");
      localStorage.setItem("token", this.token);

      this.params.delete("auto_login");
      const newParams = this.params.toString();
      console.log(newParams);
      window.history.replaceState(
        null,
        null,
        `${window.location.pathname}?${newParams}`
      );
    }
  }

  hasToken() {
    return this.token != null;
  }

  getToken() {
    return this.token;
  }
}
