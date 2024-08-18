const { writeFile, access, constants } = require('node:fs/promises');
const { join } = require('node:path');
const {
  isNumber,
  isString,
  between,
  lengthBetween,
  include,
  isEmpty,
  isPhoneNumber
} = require('./validation');
const Joi = require('joi');

const users = require('./users.json');

const addUser = async ({
  id = null,
  age = null,
  gender = null,
  firstname = null,
  lastname = null,
  username = null,
  phoneNumber = null
}) => {
  try {
    if (!isNumber(id) || !between(id, 0)) throw new Error('invalid (id)');

    if (!isNumber(age) || !between(age, 12, 100)) {
      throw new Error('invalid (age)');
    }

    if (
      !isString(firstname) ||
      !isEmpty(firstname) ||
      !lengthBetween(firstname, 3, 40)
    ) {
      throw new Error('invalid (firstname)');
    }

    if (
      !isString(phoneNumber) ||
      !isEmpty(phoneNumber) ||
      !isPhoneNumber(phoneNumber)
    ) {
      throw new Error('invalid (phoneNumber)');
    }
    if (
      !isString(lastname) ||
      !isEmpty(firstname) ||
      !lengthBetween(lastname, 3, 40)
    ) {
      throw new Error('invalid (lastname)');
    }

    if (
      !isString(username) ||
      !isEmpty(firstname) ||
      !lengthBetween(username, 3, 40)
    ) {
      throw new Error('invalid (username)');
    }

    if (
      !isString(gender) ||
      !isEmpty(firstname) ||
      !include(gender, ['male', 'female', 'not-set'])
    ) {
      throw new Error('invalid (gender)');
    }

    const user = users.find((user) => user.id === id);
    if (!!user) {
      throw new Error('duplicate id');
    }

    const usersData = [
      ...users,
      {
        id,
        age,
        gender,
        firstname,
        lastname,
        username,
        phoneNumber
      }
    ];
    const usersAsText = JSON.stringify(usersData);

    await access(join(__dirname, 'users.json'), constants.F_OK);
    await writeFile(join(__dirname, 'users.json'), usersAsText);

    console.info('user added successfully');
  } catch (err) {
    console.error(err);
  }
};

const addUserUsingJoi = async ({
  id = null,
  age = null,
  gender = null,
  firstname = null,
  lastname = null,
  username = null,
  phoneNumber = null
}) => {
  try {
    const userSchema = Joi.object({
      id: Joi.number().min(0).integer().required(),
      age: Joi.number().min(12).max(100).integer().required(),
      gender: Joi.string().trim().valid('male', 'female', 'not-set').required(),
      firstname: Joi.string().trim().alphanum().min(3).max(40).required(),
      lastname: Joi.string().trim().alphanum().min(3).max(40).required(),
      username: Joi.string().trim().email().required(),
      phoneNumber: Joi.string().trim().length(11).required()
    });

    await userSchema.validateAsync({
      id,
      age,
      gender,
      firstname,
      lastname,
      username,
      phoneNumber
    });

    const user = users.find((user) => user.id === id);
    if (!!user) {
      throw new Error('duplicate id');
    }

    const usersData = [
      ...users,
      {
        id,
        age,
        gender,
        firstname,
        lastname,
        username,
        phoneNumber
      }
    ];
    const usersAsText = JSON.stringify(usersData);

    await access(join(__dirname, 'users.json'), constants.F_OK);
    await writeFile(join(__dirname, 'users.json'), usersAsText);

    console.info('user added successfully');
  } catch (err) {
    console.error(err);
  }
};

module.exports = { addUser, addUserUsingJoi };
