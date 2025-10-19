import { JwtService } from '@nestjs/jwt';

import { IJwtInterface } from 'src/domain/@shared/jwt/jwt.auth.interface';
import { JwtAuth } from './jwt.auth';

const jwtService: IJwtInterface = new JwtAuth(new JwtService());

const payload = {
  userId: '123',
  email: 'mateus@gmail.com',
  type: 'access_token',
};
const secret = 'test_secret_key';
const options = { expiresIn: '1h' };

describe('JWT Auth Service', () => {
  it('should generate and verify JWT tokens', async () => {
    const token = await jwtService.sign(payload, options);
    expect(token).toBeDefined();
  });

  it('should verify a valid JWT token', async () => {
    const token = await jwtService.sign(payload, options);
    const decoded = jwtService.verify(token, secret);
    expect(decoded).toBeDefined();
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.email).toBe(payload.email);
    expect(decoded.type).toBe(payload.type);
    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();
    expect(decoded.exp).toBeGreaterThan(decoded.iat);
  });
});
