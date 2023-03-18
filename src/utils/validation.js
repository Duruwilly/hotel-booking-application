import { omit } from "lodash";

const validatePassword = (e, id, value, passwordErrors, setPasswordErrors) => {
  switch (id) {
    case "newPassword":
      if (
        !new RegExp(
          /(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.*[a-z])(?=.*[A-Z]).{8,}/
        ).test(value)
      ) {
        setPasswordErrors({
          ...passwordErrors,
          newPassword:
            "password must contain at lease one special character, uppercase and lowercase letters with at least a number, and must be 8 character or more",
        });
      } else {
        let newObj = omit(passwordErrors, "newPassword");
        setPasswordErrors(newObj);
      }
      break;

    case "password":
      if (
        document.getElementById("password").value !==
        document.getElementById("newPassword").value
      ) {
        setPasswordErrors({
          ...passwordErrors,
          password: "Password does not match",
        });
      } else {
        let newObj = omit(passwordErrors, "password");
        setPasswordErrors(newObj);
      }
      break;

    default:
      break;
  }
};

const validateEmail = ({ id, value, setEmailErrors, emailErrors }) => {
  switch (id) {
    case "email":
      if (
        !new RegExp(
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        ).test(value)
      ) {
        setEmailErrors({
          ...emailErrors,
          emailError: "Email not valid",
        });
      } else {
        let newObj = omit(emailErrors, "email");
        setEmailErrors(newObj);
      }
  }
};

export { validatePassword, validateEmail };
