import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {AddressInfo} from 'net'

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