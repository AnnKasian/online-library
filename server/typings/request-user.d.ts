declare namespace Express {
  export interface Request {
    user: import('#/packages/user').UserDto;
  }
}
