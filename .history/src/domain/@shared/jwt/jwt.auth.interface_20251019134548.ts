export interface IJwtInterface {
  sign(payload: string | object | Buffer, options?: object): Promise<string>;
  verify(token: string, secret: string, options?: object): Promise<boolean>;
}

export const JWT_INTERFACE: unique symbol = Symbol('IJwtInterface');
