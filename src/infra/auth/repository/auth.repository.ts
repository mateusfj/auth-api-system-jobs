import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthInterfaceRespository } from "src/domain/auth/repository/auth.repository.interface";
import { AuthModel } from "src/infra/auth/repository/auth.model";
import { Repository } from "typeorm";



@Injectable()
export class AuthRespository implements AuthInterfaceRespository {
  constructor(
    @InjectRepository(AuthModel)
    private readonly authRepository: Repository<AuthModel>,
  ) { }

  async create(data: any): Promise<any> {
    console.log(data)
  };

  async findAll(): Promise<any> {
    const res = await this.authRepository.find()
    if (res.length > 0) {
      return res
    }
    return { mensage: "Sem Resultados" }
  };



  delete(id: string): void {
    const user = this.authRepository.findBy({ id })
    if (user) {
      this.authRepository.softDelete
    }
    throw new Error("adawdwadaw")
  }

  findOne(id: string): void {
    const user = this.authRepository.findBy({ id })
    if (user) {
      return
    }
    throw new Error("adawdwadaw")
  }

  update(data: any): void {
    console.log("atualizado")
  }
}

