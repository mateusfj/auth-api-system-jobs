import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { inputLoginAuthDTO } from 'src/core/usecase/auth/login/login.auth.dto';

export class CreateAuthDto implements inputLoginAuthDTO {
  @IsString()
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;
}
