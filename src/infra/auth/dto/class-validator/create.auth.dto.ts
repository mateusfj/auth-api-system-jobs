import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { inputCreateAuthDTO } from 'src/domain/auth/usecase/create/create.auth.dto';
import { ERole } from 'src/utils/enums/ERole';

export class CreateAuthDto implements inputCreateAuthDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ERole)
  @IsString()
  @IsNotEmpty()
  role: ERole;
}
