import * as yup from 'yup';

const validators = {
  seats: yup
  .string()
  .matches(/^[0-9]*$/, 'Seats must be only  numbers.')
  .required('Seats Is required.'),
  plateNo: yup
  .string()
  .matches(/^[R][A][A-Z] [0-9]{3}[A-Z]{1}$/, 'Invalid Plate No. (Ex. RAA 001A)')
  .required('Plate No Is required.'),
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
