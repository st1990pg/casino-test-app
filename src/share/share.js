import React from 'react';

let strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const checkInputs = async (obj) => {
  let error = await {};
  await Object.entries(obj).forEach(([key, value]) => {
    if (key) {
      let dataStruc = sampleDataStructure.find((item) => item.code === key);

      if (dataStruc) {
        switch (key) {
          case 'fname':
          case 'lname':
          case 'address':
          case 'username':
          case 'email':
            if (typeof value === dataStruc.fieldType) {
              dataStruc.validators.forEach((item) => {
                if (
                  item.key === 'minLength' &&
                  value.length < item.parameters.targetLength
                ) {
                  error[key] = item;
                } else if (
                  item.key === 'maxLength' &&
                  value.length > item.parameters.targetLength
                ) {
                  error[key] = item;
                } else if (
                  item.key === 'emailValidator' &&
                  (!value || !validateEmail(value) || value.length < 5)
                ) {
                  error[key] = item.invalid_message;
                }
              });
            }
            break;
          case 'password':
            if (!value || value.length < 1 || !strongPassword.test(value)) {
              error[key] = {};
              error[key].code = 'error';
              error[key].message = 'password_strength_failed';
            }
            break;
          case 'password_confirm':
            if (!value || value.length < 1 || value !== obj.password) {
              error[key] = 'password_confirm_failed';
            }
          default:
            return;
        }
      }
    }
  });

  if (Object.keys(error).length > 0) {
    throw error;
  } else {
    return error;
  }
};

export const checkPassword = (value) => {
  if (strongPassword.test(value)) {
    return { code: 'strong', message: 'password_is_strong' };
  } else {
    return { code: 'error', message: 'password_strength_failed' };
  }
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

let sampleDataStructure = [
  {
    code: 'fname',
    name: 'First name',
    fieldType: 'string',
    defaultValue: '',
    required: true,
    validators: [
      {
        key: 'minLength',
        name: 'minLength',
        invalid_message: 'min_length_not_met',
        description:
          'Checks if input value length is greater than targetLength. In case it is less, method will return an error',
        parameters: {
          targetLength: 2,
        },
      },
      {
        key: 'maxLength',
        name: 'maxLength',
        invalid_message: 'max_length_not_met',
        description:
          'Checks if input value length is less than targetLength. In case it is greater than that, method will return an error',
        parameters: {
          targetLength: 25,
        },
      },
    ],
  },
  {
    code: 'lname',
    name: 'Last name',
    fieldType: 'string',
    defaultValue: '',
    validators: [
      {
        key: 'minLength',
        name: 'minLength',
        invalid_message: 'min_length_not_met',
        description:
          'Checks if input value length is greater than targetLength. In case it is less, method will return an error',
        parameters: {
          targetLength: 2,
        },
      },
      {
        key: 'maxLength',
        name: 'maxLength',
        invalid_message: 'max_length_not_met',
        description:
          'Checks if input value length is less than targetLength. In case it is greater than that, method will return an error',
        parameters: {
          targetLength: 25,
        },
      },
      {
        key: 'lettersOnlyValidator',
        name: 'lettersOnlyValidator',
        invalid_message: 'lettersOnlyValidator_failed',
        description: '',
        parameters: {},
      },
    ],
  },
  {
    code: 'address',
    name: 'Address',
    fieldType: 'string',
    dataType: 'string',
    HTML5Hint: '',
    cssclass: '',
    order: 4,
    group: '',
    defaultValue: '',
    required: true,
    Updatable: true,
    valueList: [],
    validators: [
      {
        key: 'maxLength',
        name: 'maxLength',
        warning: false,
        invalid_message: 'max_length_not_met',
        description:
          'Checks if input value length is less than targetLength. In case it is greater than that, method will return an error',
        parameters: {
          targetLength: 50,
        },
      },
    ],
  },
  {
    code: 'username',
    name: 'Username',
    fieldType: 'string',
    defaultValue: '',
    validators: [
      {
        key: 'minLength',
        name: 'minLength',
        warning: false,
        invalid_message: 'min_length_not_met',
        description:
          'Checks if input value length is greater than targetLength. In case it is less, method will return an error',
        parameters: {
          targetLength: 4,
        },
      },
      {
        key: 'maxLength',
        name: 'maxLength',
        warning: false,
        invalid_message: 'max_length_not_met',
        description:
          'Checks if input value length is less than targetLength. In case it is greater than that, method will return an error',
        parameters: {
          targetLength: 20,
        },
      },
    ],
  },
  {
    code: 'email',
    name: 'E-mail',
    fieldType: 'string',
    dataType: 'string',
    validators: [
      {
        key: 'emailValidator',
        name: 'emailValidator',
        warning: false,
        invalid_message: 'email_validation_failed',
        description: 'Email validation failed',
        parameters: {},
      },
    ],
  },
  {
    code: 'password',
    name: 'Password',
    fieldType: 'password',
    dataType: 'password',
    validators: [
      {
        key: 'passwordStrength',
        name: 'passwordStrength',
        warning: false,
        invalid_message: 'password_strength_failed',
        description: '',
        parameters: {
          regex: '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$',
        },
      },
    ],
  },
  {
    code: 'password_confirm',
    name: 'Password Confirmation',
    fieldType: 'password',
    dataType: 'password',
    validators: [
      {
        key: 'passwordStrength',
        name: 'passwordStrength',
        invalid_message: 'password_confirm_failed',
        description: '',
        parameters: {
          regex: '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$',
        },
      },
    ],
  },
];
