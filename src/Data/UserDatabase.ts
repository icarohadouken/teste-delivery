import {BaseDatabase} from './BaseDatabase'
import {UserModel} from '../Model/UserModel'

export class UserDatabase extends BaseDatabase {
    protected tableName: string = 'users'

    private toModel(dbModel?: any): UserModel | undefined {
        return(
            dbModel && 
            new UserModel (
                dbModel.id,
                dbModel.name,
                dbModel.last_name,
                dbModel.email,
                dbModel.cpf,
                dbModel.password
            )
        )
    }

    public async createUser(user: UserModel): Promise<number> {
        const testing = await super.getConnection()
            .insert(user)
            .into(this.tableName)

        return testing[0]
    }

    public async getUserById(id: number): Promise<UserModel | null> {
        const user = await super.getConnection()
            .select("*")
            .from(this.tableName)
            .where({id})

        return this.toModel(user[0])
    }

    public async getUserByEmail(email: string): Promise<UserModel | null> {
        const user = await super.getConnection()
            .select("*")
            .from(this.tableName)
            .where({email})

        return this.toModel(user[0])
    }
}