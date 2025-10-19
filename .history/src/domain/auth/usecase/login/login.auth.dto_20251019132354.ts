export interface inputLoginAuthDTO {
  email: string;
  password: string;
}

export interface outputLoginAuthDTO {
  token: string;
  refreshToken: string;
}
