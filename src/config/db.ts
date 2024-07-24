import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {  // NG - 1.
    models: [__dirname + '/../models/**/*'],
    logging: false
})


export default db


/** NOTAS GENERALES
 * 
 * 1.- El signo de exclamacion es opcional. Es para garantizarle a TypeScript que ese valor existe y no va a ser undefined en caso de que salte algun error.
*/

// Otra forma de especificar una conexion SSL
// const db = new Sequelize(
//     `postgresql://rest_api_node_typescript_xch9_user:EB6yjBMgPbNMB0Vli4XgvTZaPSXNtI9r@dpg-cptlsmo8fa8c738mp8o0-a.virginia-postgres.render.com/rest_api_node_types
//        cript_xch9`, {
//         dialectOptions: {
//             ssl: {
//                 require: false
//             }
//         }
//     }
// )