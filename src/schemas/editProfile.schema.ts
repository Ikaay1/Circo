import * as yup from 'yup';

export const editProfileSchema = yup.object().shape({
  firstName: yup.string().min(3).max(30).required(),
  lastName: yup.string().min(3).max(30).required(),
  // email: yup.string().email().min(3).required(),
  // dob: yup.string(),
  username: yup.string().min(5).max(30).required(),
});
