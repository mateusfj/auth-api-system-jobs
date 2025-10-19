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

  async findByEmail(email: string): Promise<Auth | null> {
    const user = await this.authRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      return null;
    }

    return new Auth({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isActive: user.isActive,
    });
  }

  async create(data: Auth): Promise<void> {
    await this.authRepository.save({
      id: data._id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      isActive: data.isActive,
    });
  }

  async findAll(): Promise<Auth[]> {
    const users = await this.authRepository.find();
    return users.map(
      (user) =>
        new Auth({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
          isActive: user.isActive,
        }),
    );
  }

  async findOne(id: string): Promise<Auth> {
    const user = await this.authRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return new Auth({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isActive: user.isActive,
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
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.role = data.role;
    user.isActive = data.isActive;

    await this.authRepository.save(user);
    return new Auth({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isActive: user.isActive,
    });
  }
}
