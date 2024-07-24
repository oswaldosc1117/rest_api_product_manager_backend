import express from 'express'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi, { serve } from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions } from './config/swagger'
import router from './router'
import db from './config/db'

// Conectar a BD

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue.bold('Conexion exitosa a BD'))

    } catch (error) {
        console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a BD'))
    }
}

connectDB()

// Instancia de express
const server = express()

// Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

// Leer los datos de los formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

//docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server

