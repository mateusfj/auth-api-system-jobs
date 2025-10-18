import { LoginAuthUseCase } from './login.auth.usecase';

describe('Login Auth Use Case', () => {
  it('should login user and return tokens', async () => {
    // Mock AuthInterfaceRespository
    const mockAuthRepository = {
      findByEmail: jest.fn().mockResolvedValue({
        _id: 'user123',
        _email: 'mateus@gmail.com',
        _password: 'securepassword',
      }),
    };

    // Mock IJwtInterface
    const mockJwtService = {
      sign: jest
        .fn()
        .mockResolvedValueOnce('access_token_mock') // First call for access token
        .mockResolvedValueOnce('refresh_token_mock'), // Second call for refresh token
    };

    const loginUseCase = new LoginAuthUseCase(
      mockAuthRepository as any,
      mockJwtService as any,
    );

    const inputDTO = {
      email: 'mateus@gmail.com',
      password: 'securepassword',
    };

    const result = await loginUseCase.execute(inputDTO);

    expect(result).toEqual({
      token: 'access_token_mock',
      refreshToken: 'refresh_token_mock',
    });
  });
});
