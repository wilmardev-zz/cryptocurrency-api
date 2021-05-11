class Message {
  static notFound = (field) => `cryptocurrency '${field}' not exist.`;
  static alreadyExistCrypto = (field) =>
    `cryptocurrency '${field}' is already associated for the current user.`;
  static dataNotProvided = (field) => `the '${field}' field is not provided`;
  static dataNotValid = (field) =>
    `the '${field}' query doesn't contain a valid data.`;
  static passwordNotValid = () =>
    `the 'password' field must be longer than 8 characters`;
  static unauthorized = () => `Unauthorized`;
  static tokenNotValid = () => `Token is not valid or has been expired`;
  static loginInvalid = () => `invalid username or password.`;
  static userExist = (userName) => `UserName '${userName}' already exist.`;
  static generalError = () => "Somenthin went wrong. Please try again";
}

module.exports = { Message };
