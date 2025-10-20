import { ConflictDomainException } from 'src/domain/@shared/exceptions/domain.exceptions';
import { AuthFactory } from '../../factory/auth.factory';
import { AuthInterfaceRepository } from '../../repository/auth.repository.interface';
import { inputCreateAuthDTO, outputCreateAuthDTO } from './create.auth.dto';

export class CreateAuthUseCase {
  constructor(private readonly authRepository: AuthInterfaceRepository) {}

  async execute(data: inputCreateAuthDTO): Promise<outputCreateAuthDTO> {
    const userExists = await this.authRepository.findByEmail(data.email);

    if (userExists) {
      throw new ConflictDomainException('User already exists with this email');
    }

    const auth = AuthFactory.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    });

    await this.authRepository.create(auth);

    return {
      id: auth.id,
      name: auth.name,
      email: auth.email,
      role: auth.role,
      isActive: auth.isActive,
    };
  }
}
