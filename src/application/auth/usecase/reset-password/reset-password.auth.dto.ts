export interface inputResetPasswordAuthDTO {
  resetToken: string;
  newPassword: string;
}

export interface outputResetPasswordAuthDTO {
  message: string;
}
