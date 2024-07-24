import { Router } from "express"
import { body, param } from 'express-validator'
import { createProducts, deleteProducts, getProducts, getProductsByID, updateavailability, updateProduct } from "./handlers/products"
import { handleInputError } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product Name
 *                      example: Monitor Curvo de 49 pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product Price
 *                      example: 800
 *                  availability:
 *                      type: boolean
 *                      description: The Product Availability
 *                      example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
// Obtenener todos los productos
router.get('/', getProducts)


/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Not found
 *              404:
 *                  description: Bas Request - Invalid ID
 */
// Obtener un producto por su ID
router.get('/:id', // NG - 1.
    param('id').isInt().withMessage('ID no Válido'),
    handleInputError,

    getProductsByID
)


/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new Product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo de 49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 800
 *          responses:
 *              201:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - invalid input data
 */
// Crear un nuevo producto
router.post('/', 

    // Validacion
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacío'),

    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del producto no puede ir vacío')
        .custom(value => value > 0).withMessage('Precio no válido'),
    
    handleInputError,

    createProducts
)


/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo de 49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 800
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 */
// Actualizar todo el producto
router.put('/:id',
    
    // Validacion
    param('id').isInt().withMessage('ID no Válido'),

    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacío'),

    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del producto no puede ir vacío')
        .custom(value => value > 0).withMessage('Precio no válido'),

    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    
    handleInputError,
    updateProduct
)


/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update Product availability
 *          tags:
 *              - Products
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found
 */
// Actualizar la disponibilidad del producto
router.patch('/:id', 
    
    param('id').isInt().withMessage('ID no Válido'),

    handleInputError,
    updateavailability
)


/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a Product by ID
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto eliminado correctamente'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found
 */
// Eliminar un producto
router.delete('/:id',
    
    param('id').isInt().withMessage('ID no Válido'),

    handleInputError,
    deleteProducts
)

export default router

/** NOTAS GENERALES
 * 
 * 1.- ':id' hace alusion al parametro que queremos observar. Al llamar a la funcion getProductsByID, esta emplea una funcion con el nombre de findByPk() el cual va
 * a buscar por un primary key. Esta llave primaria, es el parametro que le definimos en la URL, es decir, en nuestro routing. Para validar por este campo, necesitamos
 * llamar al atributo param.
*/