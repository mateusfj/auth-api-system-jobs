import { ERole } from "src/utils/enums/ERole";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ERole, default: ERole.USER })
  role: ERole;

  @Column()
  isActive: boolean
}

