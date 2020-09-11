import * as yup from 'yup';

const validators = {
  password: yup.string().min(6, 'Password must contain atleast 6 characters.'),
};

export default (value) => {
  const selected = {};
  Object.keys(value).forEach((key) => {
    selected[key] = validators[key];
  });
  return yup
    .object()
    .shape(selected)
    .validate(value, { abortEarly: false })
    .catch((err) => err.errors);
};
