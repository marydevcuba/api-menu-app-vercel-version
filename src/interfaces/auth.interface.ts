export interface RegisterAuth extends LoginAuth {
  name: string;
}

export interface LoginAuth {
  email: string;
  password: string;
}
