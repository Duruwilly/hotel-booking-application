import { omit } from "lodash";

const validatePassword = (e, id, value, passwordErrors, setPasswordErrors) => {
  switch (id) {
    case "password":
      if (
        !new RegExp(
          /(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.*[a-z])(?=.*[A-Z]).{8,}/
        ).test(value)
      ) {
        setPasswordErrors({
          ...passwordErrors,
          password:
            "password must contain at lease one special character, uppercase and lowercase letters with at least a number, and must be 8 character or more",
        });
      } else {
        let newObj = omit(passwordErrors, "password");
        setPasswordErrors(newObj);
      }
      break;

    case "newPassword":
      if (
        document.getElementById("newPassword").value !==
        document.getElementById("password").value
      ) {
        setPasswordErrors({
          ...passwordErrors,
          newPassword: "Password does not match",
        });
      } else {
        let newObj = omit(passwordErrors, "newPassword");
        setPasswordErrors(newObj);
      }
      break;

    default:
      break;
  }
};

const validateEmail = (e, id, value, emailErrors, setEmailErrors) => {
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
        let newObj = omit(emailErrors, "emailError");
        setEmailErrors(newObj);
      }
  }
};

export { validatePassword, validateEmail };
