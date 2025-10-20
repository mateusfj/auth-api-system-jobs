export interface IJwtInterface {
  sign(payload: string | object | Buffer, options?: object): Promise<string>;
  verify(token: string): Promise<any>;
}

export const JWT_INTERFACE: unique symbol = Symbol('IJwtInterface');
