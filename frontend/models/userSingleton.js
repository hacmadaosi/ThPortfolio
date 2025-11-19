class User {
  constructor({ id, fullName, email, username, password, cart = [] }) {
    if (User.instance) return User.instance;

    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.username = username;
    this.password = password;
    this.cart = cart;

    User.instance = this;
  }

  getInfo() {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      username: this.username,
      cart: this.cart,
    };
  }

  static getDefaultUser() {
    return {
      id: 0,
      fullName: "Lê Khánh Vinh",
      email: "khanhvinh2288@gmail.com",
      username: "admin",
      password: "123456",
      cart: [0, 3],
    };
  }
}
