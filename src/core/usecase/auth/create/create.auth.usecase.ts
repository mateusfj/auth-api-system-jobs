import { AuthFactory } from 'src/core/domain/auth/factory/auth.factory';
import { AuthInterfaceRespository } from 'src/core/domain/auth/repository/auth.repository.interface';
import { inputCreateAuthDTO, outputCreateAuthDTO } from './create.auth.dto';

export class CreateAuthUseCase {
  constructor(private readonly authRepository: AuthInterfaceRespository) {}

  async execute(data: inputCreateAuthDTO): Promise<outputCreateAuthDTO> {
    console.log('data', data);

    const userExists = await this.authRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error('User already exists with this email');
    }

    const auth = AuthFactory.create({
      _name: data.name,
      _email: data.email,
      _password: data.password,
      _role: data.role,
    });

    await this.authRepository.create(auth);

    return {
      id: auth._id,
      name: auth._name,
      email: auth._email,
      role: auth._role,
      isActive: auth._isActive,
    };
  }
}
