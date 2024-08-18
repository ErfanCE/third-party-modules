const { addUserUsingJoi } = require('./user-crud');

addUserUsingJoi({
  id: 5,
  age: 18,
  gender: 'male',
  firstname: 'amin',
  lastname: 'fatahi',
  username: 'fatahi@jmail.com',
  phoneNumber: '09122222222'
});
