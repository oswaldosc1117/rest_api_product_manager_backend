import {connectDB} from "../server";
import db from "../config/db";

jest.mock('../config/db')

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar a BD'))

        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Hubo un error al conectar a BD'))
    })
})

// describe('Nuestro primer test', () => { // NG- 1.
//     it('Debe revisar que 1 + 1 sean 2', () => { // NG - 2.
//         expect(1 + 1).toBe(2)
//     })

//     test('Debe revisar que 1 + 1 no sean 4', () => { // NG - 2.
//         expect(1 + 1).not.toBe(4)
//     })
// })

/** NOTAS GENERALES
 * 
 * 1.- Describe es una funcion habilitada globalmente al instalar jest. Aqui se describen los test y luego estos se ejecutan individualmente.
 * 
 * 2.- Los test se mandan a llamar individualmente con la funcion it o test. Ambas hacen la misma funcion sin diferencias entre si. A estas se le especifica lo que
 * se quiere testear y luego se le asignan dos valore: expect() o los parametros que se van testeat y toBe() que es el resultado que se espera de dicho test. En caso
 * de que querer que la comparacion de un resultado que no esperamos, (es decir, comprobar que algo 'no' sea igual al elemento esperado), se le agrega el not tal cual
 * como en el 2do ejemplo.
*/