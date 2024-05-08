export interface ILogin {
  email: string;
  password: string;
}

export interface IVerify {
  email: string;
  code: string;
}

export interface IRegister {
  userName: string;
  email: string;
  country: string;
  phoneNumber: number;
  profileImage: string;
  password: string;
  confirmPassword: string;
}

export interface IChangePassword {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
}

export interface IRequest {
  email: string;
}

export interface IReset {
  email: string,
  password: string,
  confirmPassword: string,
  seed: string
}

