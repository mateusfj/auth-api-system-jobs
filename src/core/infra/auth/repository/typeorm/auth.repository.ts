import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/core/domain/auth/entity/auth.entity';
import { AuthInterfaceRespository } from 'src/core/domain/auth/repository/auth.repository.interface';
import { AuthModel } from 'src/core/infra/auth/repository/typeorm/auth.model';

import { Repository } from 'typeorm';

@Injectable()
export class AuthRespository implements AuthInterfaceRespository {
  constructor(
    @InjectRepository(AuthModel)
    private readonly authRepository: Repository<AuthModel>,
  ) {}

  async create(data: Auth): Promise<void> {
    await this.authRepository.save({
      id: data._id,
      name: data._name,
      email: data._email,
      password: data._password,
      role: data._role,
      isActive: data._isActive,
    });
  }

  async findAll(): Promise<Auth[]> {
    const users = await this.authRepository.find();
    return users.map(
      (user) =>
        new Auth({
          _id: user.id,
          _name: user.name,
          _email: user.email,
          _password: user.password,
          _role: user.role,
          _isActive: user.isActive,
        }),
    );
  }

  async findOne(id: string): Promise<Auth> {
    const user = await this.authRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return new Auth({
      _id: user.id,
      _name: user.name,
      _email: user.email,
      _password: user.password,
      _role: user.role,
      _isActive: user.isActive,
    });
  }

  async delete(id: string): Promise<void> {
    const user = await this.authRepository.findBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    await this.authRepository.softDelete({ id });
  }

  async update(data: Auth): Promise<Auth> {
    const user = await this.authRepository.findOne({ where: { id: data._id } });
    if (!user) {
      throw new Error('User not found');
    }
    user.name = data._name;
    user.email = data._email;
    user.password = data._password;
    user.role = data._role;
    user.isActive = data._isActive;

    await this.authRepository.save(user);
    return new Auth({
      _id: user.id,
      _name: user.name,
      _email: user.email,
      _password: user.password,
      _role: user.role,
      _isActive: user.isActive,
    });
  }
}
