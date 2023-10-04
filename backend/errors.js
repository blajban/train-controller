class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
    this.status = 401;
    this.message = 'Wrong e-mail or password';
  }
}

class NotEnoughCredentialsError extends Error {
  constructor() {
    super('Not enough input');
    this.status = 400;
    this.message = 'Required input not provided';
  }
}

class UserExistsError extends Error {
  constructor() {
    super('User already exists');
    this.status = 409;
    this.message = 'User already exists. Login instead';
  }
}

class NoTokenError extends Error {
  constructor() {
    super('No token');
    this.status = 403;
    this.message = 'No token provided';
  }
}

class InvalidTokenError extends Error {
  constructor() {
    super('Invalid token');
    this.status = 401;
    this.message = 'Token is invalid';
  }
}

class NotFoundError extends Error {
  constructor(originalUrl) {
    super(`Not Found - ${originalUrl}`);
    this.status = 404;
  }
}

class WrongApiKeyError extends Error {
  constructor() {
    super('Wrong api key');
    this.status = 401;
    this.message = 'API key did not match';
  }
}

class NoApiKeyError extends Error {
  constructor() {
    super('No api key');
    this.status = 403;
    this.message = 'APÌ key missing';
  }
}

module.exports = {
  InvalidCredentialsError,
  NotEnoughCredentialsError,
  UserExistsError,
  NoTokenError,
  InvalidTokenError,
  NotFoundError,
  WrongApiKeyError,
  NoApiKeyError
};

