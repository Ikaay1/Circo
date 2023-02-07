import * as yup from 'yup';

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Old Password is required'),
  newPassword: yup.string().max(20).required('Password is required'),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/,
  //   "Should contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  // ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});
