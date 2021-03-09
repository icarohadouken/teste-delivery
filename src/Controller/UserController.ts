import {Request, Response} from 'express'
import {UserBusiness} from '../Business/UserBusiness'
import {UserDatabase} from '../Data/UserDatabase'
import {Authenticator} from '../Services/Authenticator'
import {IdGenerator} from '../Services/IdGenerator'
import {HashManager} from '../Services/HashManager'
import {UnauthorizedError} from '../Errors/UnauthorizedError'

export class UserController {
    private static UserBusiness = new UserBusiness(
        new UserDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    )

    public async signup(req: Request, res: Response) {
        try{
            const result = await UserController.UserBusiness.signup(
                req.body.name,
                req.body.last_name,
                req.body.email,
                req.body.cpf,
                req.body.password
            )

            res.status(200).send({
                token: result
            })
        }
        catch(err){
            res.status(err.errorCode || 404).send({message: err.message})
        }
    }

    public async login(req: Request, res: Response){
        try{
            const result = await UserController.UserBusiness.login(
                req.body.email,
                req.body.password
            )

            res.status(200).send({
                message: "sucess"
            })
        }
        catch(err){
            res.status(err.errorCode || 404).send({message: err.message})
        }
    }
}