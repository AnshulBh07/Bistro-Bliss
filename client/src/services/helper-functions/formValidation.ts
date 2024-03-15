import { ISignupState } from "./interfaces";

const validateName = (name: string) => {
  // a valid name should not contain any numbers, special characters or empty spaces
  const n = name.length;
  const s = name.toLowerCase();
  let ans = true;

  for (let i = 0; i < n; i++) {
    ans = ans && s[i] >= "a" && s[i] <= "z";
  }
  return ans;
};

const validateUsername = (username: string) => {
  // must be 6-30 characters long
  // can contain numbers, letters and periods (.)
  // cannot start or end with a period
  // cannot contain any other special characters or more than 1 periods in a row
  const n = username.length;
  const uname = username.toLowerCase();
  let ans = true;

  if (n > 30 || n < 6) return false;

  if (uname[0] == "." || uname[n - 1] == ".") return false;

  for (let i = 0; i < n; i++) {
    const ch = uname[i];

    ans =
      ans &&
      ((ch >= "a" && ch <= "z") || (ch >= "0" && ch <= "9") || ch == ".");

    if (ans == false) return false;

    // check for more than one periods
    if (uname[i] == "." && uname[i + 1] == ".") return false;
  }

  return true;
};

export const validateEmail = (email: string) => {
  // eslint-disable-next-line
  const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!mailRegex.test(email)) return false;

  return true;
};

export const validatePassword = (pwd: string) => {
  // should not contain white spaces
  // should contain at least one digit from 0-9
  // length between 8-15
  // contain at least one lowercase and one uppercase
  // at least one special character
  const n = pwd.length;
  let digits = 0,
    lowercase = 0,
    uppercase = 0;

  for (let i = 0; i < n; i++) {
    if (pwd[i] == " ") return false;

    if (pwd[i] >= "a" && pwd[i] <= "z") lowercase++;
    if (pwd[i] >= "A" && pwd[i] <= "Z") uppercase++;
    if (pwd[i] >= "0" && pwd[i] <= "9") digits++;
  }
  if (uppercase < 1 || lowercase < 1 || digits < 1) return false;

  //   eslint-disable-next-line
  const specialRegex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;

  if (!specialRegex.test(pwd)) return false;

  return true;
};

// function that validates form , returns a tuple of boolean and message for toast
export const validateForm: (obj: ISignupState) => [boolean, string] = (
  signupState
) => {
  const { first_name, last_name, email, password, username } = signupState;

  if (!validateName(first_name)) return [false, "Invalid first name!"];

  if (!validateName(last_name)) return [false, "Invalid last name!"];

  if (!validateUsername(username)) return [false, "Invalid username!"];

  if (!validateEmail(email)) return [false, "Invalid email!"];

  if (!validatePassword(password)) return [false, "Invalid Password!"];

  return [true, ""];
};
