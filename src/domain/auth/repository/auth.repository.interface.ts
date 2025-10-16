
import { RepositoryInterface } from "../../@shared/repository/repository.interface";
import { Auth } from "../entity/auth.entity";

export interface AuthInterfaceRespository extends RepositoryInterface<Auth> {
}

export const AUTH_REPOSITORY_INTERFACE: unique symbol = Symbol("AuthInterfaceRespository")