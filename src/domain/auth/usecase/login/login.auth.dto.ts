export interface inputLoginAuthDTO {
  email: string;
  password: string;
}

export interface outputLoginAuthDTO {
  accessToken: string;
  refreshToken: string;
}
