import { Request, Response } from 'express'
import Product from '../models/Product.model'


export const getProducts = async (req: Request, res: Response) => {

    // const products = await Product.findAll()

    const products = await Product.findAll({ // NG - 3
        order: [
            ['id', 'DESC']
        ],
        // order: [
        //     ['price', 'DESC']
        // ], limit: 4,
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })

    res.json({data: products})
}


export const getProductsByID = async (req: Request, res: Response) => {
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    res.json({data: product})
}


export const createProducts = async (req: Request, res: Response) => {

    const product = await Product.create(req.body) // NG - 1.
    res.status(201).json({data: product})
}


export const updateProduct = async (req: Request, res: Response) => {

    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    // Actualizar
    await product.update(req.body)
    await product.save()


    // product.name = req.body.name // NG - 4.
    // product.price = req.body.price
    // product.availability = req.body.availability

    res.json({data: product})
}


export const updateavailability = async (req: Request, res: Response) => {

    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    // Actualizar
    product.availability = !product.dataValues.availability // NG - 5 y 6.
    await product.save()


    // await product.update(req.body)

    res.json({data: product})
}


export const deleteProducts = async (req: Request, res: Response) => {

    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    // Eliminar
    await product.destroy()
    res.json({data: 'Producto eliminado correctamente'})
}


/** NOTAS GENERALES
 * 
 * 1.- Otra forma de escribir la sintaxis de arriba
 * 
 * const product = new Product(req.body)
 * const saveProduct = await product.save()
 * res.json({data: saveProduct})
 * 
 * 2.- Forma de validar desde el handler ---> Se movio hacia el router con otra sintaxis
 * 
 * await check('name')
 * .notEmpty().withMessage('El nombre del producto no puede ir vacío')
 * .run(req)
 * 
 * await check('price')
 * .isNumeric().withMessage('Valor no válido')
 * .notEmpty().withMessage('El precio del producto no puede ir vacío')
 * .custom(value => value > 0).withMessage('Precio no válido')
 * .run(req)
 * 
 * 3.- Con esa sintaxis podemos especificar si queremos retornar los elementos en que order y tomando como referencia que columna. En este caso, está retornando por
 * el precio, trayendolos desde el mas costoso al mas economico. Del mismo modo, al final limitamos cuantos elementos queremos traer, en este caso, estamos
 * estableciendo el limite en 4. Finalmente, mediante el campo attributes, podemos excluir si queremos que no nos retorne algun campo de la consulta.
 * 
 * 4.- El metodo PUT hace modificaciones totales sobre lo que deseemos actualizar. Sin embargo, el metodo update() nos permite controlar que la actualizacion sea
 * parcial. En caso de que queramos hacer una modificacion total, Es con la sintaxis comentada. Es decir, modificamos cada columna individualmente. NOTA: El metodo
 * PUT puede ser destructivo para la modificacion de los datos dato que como bien se indica, este hace una modificacion total de los mismo y no de forma parcial a
 * diferencia del metodo PATCH.
 * 
 * 5.- Si quisieramos no emplear el update() y pasar la actualizacion directamente en la columna, dado que este si es un metodo PATCH, actualizará unicamente el
 * campo a modificar sin eliminar el resto de la informacion a diferencia del metodo PUT.
 * 
 * 6.- Cont el metodo dataValues podemos obtener los datos que estan actualmente en la BD para un determinado registro. Para fines del ejercicio, estamos obteniendo
 * los datos del campo de Disponibilidad y dado que es un boleano, podemos setearlo directamente cambiandolo de true a false o visceversa negando la condicion y sin
 * pasarle nada en el body del request.
*/