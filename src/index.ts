import express from 'express'
import cors from 'cors'
const path = require('path');
require('dotenv').config({
  path: path.resolve('.env'),
});
import {AddressInfo} from 'net'
import {userRouter} from './Router/UserRouter'

export const app = express()

app.use(cors({origin: true}))

app.use(express.json())

const server = app.listen(3006, () => {
    if(server){
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    }
    else{
        console.log(`Server failure`)
    }
})

app.use('/user/', userRouter)