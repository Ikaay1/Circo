import * as yup from "yup";

export const editProfileSchema = yup.object().shape({
  firstName: yup.string().min(3).max(30),
  lastName: yup.string().min(3).max(30),
  email: yup.string().email().min(3),
  // dob: yup.string(),
  username: yup.string().min(5).max(7),
  // password: yup
  //   .string()
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  //   ),
});
