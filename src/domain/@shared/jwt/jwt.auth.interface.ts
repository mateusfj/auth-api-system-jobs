export type RefreshTokenPayload = {
  sub: string;
  type: string;
  email: string;
  role: string;
};

export interface JwtInterface {
  sign(payload: string | object | Buffer, options?: object): Promise<string>;
  verify(token: string): Promise<RefreshTokenPayload>;
}

export const JWT_INTERFACE: unique symbol = Symbol('IJwtInterface');
