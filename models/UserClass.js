class UserClass {
  constructor(username, email, password) 
  {
    this.username = username;
    this.password = password;
    this.email = email;
    this.vehicles = [];
    this.authToken = '';
  }  
}
 module.exports = UserClass;