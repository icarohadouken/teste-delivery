import {HashManager} from '../Services/HashManager'
import {Authenticator} from '../Services/Authenticator'
import {IdGenerator} from '../Services/IdGenerator'
import {UserModel} from '../Model/UserModel'
import {UserDatabase} from '../Data/UserDatabase'
import {InvalidParameterError} from '../Errors/InvalidParameterError'
import {UnauthorizedError} from '../Errors/UnauthorizedError'
import {GenericError} from '../Errors/GenericError'
import {NotFoundError} from '../Errors/NotFoundError'

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ) {}

    public async signup(
        name: string,
        last_name: string,
        email: string,
        cpf: number,
        password: string
    ) {
        if(!name || !last_name || !email || !cpf || !password){
            throw new InvalidParameterError("Missing input")
        }

        if(email.indexOf("@") === -1){
            throw new InvalidParameterError("Invalid email")
        }

        if(password.length < 6){
            throw new InvalidParameterError("Password must contain at least 6 characters")
        }

        const hashPassword = this.hashManager.cipher(password)

        const user = await this.userDatabase.createUser(new UserModel(null, name, last_name, email, cpf, hashPassword))

        const token = this.authenticator.generateUserToken({id: user})

        console.log(token)

        return token
    
    }

    public async login(
        email: string,
        password: string
    ){
        if(!email || !password){
            throw new InvalidParameterError("Missing input")
        }

        const user = await this.userDatabase.getUserByEmail(email)

        console.log(this.hashManager.decipher(user.getPassword()))
    }
}