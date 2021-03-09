import {InvalidParameterError} from '../Errors/InvalidParameterError'

export enum ROLE{
  ADMIN = "Admin",
  CLIENT = "Client",
  DELIVERYMAN = "Deliveryman"
}

export class UserModel { 
    constructor(
        private id: number,
        private name: string,
        private last_name: string,
        private email: string,
        private cpf: number,
        private password: string
    ) {}

    getId(): number{
        return this.id
    }

    getName(): string{
        return this.name
    }

    getLast_name(): string{
        return this.last_name
    }

    getEmail(): string{
        return this.email
    }

    getCpf(): number{
      return this.cpf
    }

    getPassword(): string{
        return this.password
    }

    
}

export const stringToUserRole = (input: string): ROLE => {
  switch (input) {
      case "Admin":
        return ROLE.ADMIN;
      case "Client":
        return ROLE.CLIENT;
      case "Deliveryman":
        return ROLE.DELIVERYMAN;
      default:
          throw new InvalidParameterError("Invalid user role");
  }
};