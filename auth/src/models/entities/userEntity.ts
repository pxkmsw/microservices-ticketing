export interface UserEntityInt {
  getUserInfo(): UserInfo;
}

export interface UserInfo {
  email: string;
  password: string;
}

export class UserEntity implements UserEntityInt {
  constructor(private userInfo: UserInfo) {}

  getUserInfo = (): UserInfo => this.userInfo;
}
