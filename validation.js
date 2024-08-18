const isString = (value) => {
  return typeof value === 'string';
};

const isNumber = (value) => {
  return typeof value === 'number';
};

const between = (value, min = 0, max = value) => {
  if (value < min) return false;
  if (value > max) return false;

  return true;
};

const lengthBetween = (value, minLegth = 0, maxLength = value.length) => {
  if (value.length < minLegth) return false;
  if (value.length > maxLength) return false;

  return true;
};

const include = (value, validValues) => {
  return validValues.includes(value);
};

const isEmpty = (value) => {
  return !!value.trim();
};

const isPhoneNumber = (value) => {
  if (!value.startsWith('0') && !value.startsWith('+98')) {
    return false;
  }

  let formattedValue = '';

  if (value.startsWith('0')) {
    formattedValue = value.replace('0', '');
  } else {
    formattedValue = value.replace('+98', '');
  }

  if (formattedValue.length !== 10) {
    return false;
  }

  return true;
};

module.exports = {
  isString,
  isNumber,
  between,
  lengthBetween,
  include,
  isEmpty,
  isPhoneNumber
};
