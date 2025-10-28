const Result = require('../../core/result-handler//result');
const VariableService = require('../service/VariableService')
const CreateVariableRequestDto = require('../dto/CreateVariableRequestDto');

/**
 * @swagger
 * tags:
 *   name: Variable
 *   description: Variable management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Variable:
 *       type: object
 *         
 */

class VariableController {
    constructor(variableService) {
        this._service = new VariableService();
    }

    /**
     * @swagger
     * /enviroments/{env_name}/variables:
     *   get:
     *     summary: Listar todas las variables de un entorno
     *     tags: [Variable]
     *     security: [{ bearerAuth: [] }]
     *     parameters:
     *       - in: path
     *         name: env_name
     *         required: true
     *         schema:
     *          type: string
     *         description: Nombre del entorno
     *       - in: query
     *         name: page
     *         schema: { type: integer, default: 1 }
     *         description: Número de la página a solicitar.
     *       - in: query
     *         name: limit
     *         schema: { type: integer, default: 10 }
     *         description: Cantidad de resultados por página.
     *     responses:
     *       200:
     *         description: Lista de variables obtenida exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 count: { type: integer, example: 50 }
     *                 next: { type: string, nullable: true, example: "/enviroments?page=2&limit=10" }
     *                 previous: { type: string, nullable: true, example: null }
     *                 results:
     *                   type: array
     *                   items: { $ref: '#/components/schemas/Variable' }
     */
    static async getAllVariables(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await this._service.findAllVariables(page, limit, req.params.env_name);
            if (!result.isSuccess()) {
                return res.status(result.StatusCode).json({ error: result.Error.message });
            } else {
                return res.status(result.StatusCode).json(result.Value);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching variables   ', error: error.message });
        }
    }

    /**
     * @swagger
     * /enviroments/{env_name}/variables:
     *   post:
     *     summary: Crear una nueva variable en un entorno
     *     tags: [Variable]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: env_name
     *         required: true
     *         schema:
     *          type: string
     *         description: Nombre del entorno
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *             required:
     *               - name
     *             example:
     *               name: "staging"
     *               description: "Entorno de pruebas pre-producción"
     *     responses:
     *       201:
     *         description: Entorno creado exitosamente
     *       400:
     *         description: Datos de entrada inválidos
     *       401:
     *         description: No autorizado
     *       409:
     *         description: El entorno ya existe
     */
    static async createVariable(req, res) {
        try {
            const result = await this._service.createVariable(CreateVariableRequestDto.fromRequest(req));
            if (!result.isSuccess()) {
                return res.status(result.StatusCode).json({ error: result.Error.message });
            } else {
                return res.status(result.StatusCode).json(result.Value);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating variable', error: error.message });
        }
    }

    //     /**
    //  * @swagger
    //  * /enviroments/{env_name}.json:
    //  *   get:
    //  *     summary: Devuelve el json de variables de un entorno
    //  *     tags: [Variable]
    //  *     security:
    //  *       - bearerAuth: []
    //  *     parameters:
    //  *       - in: path
    //  *         name: env_name
    //  *         required: true
    //  *         schema:
    //  *          type: string
    //  *         description: Nombre del entorno
    //  *     responses:
    //  *       201:
    //  *         description: Entorno creado exitosamente
    //  *       400:
    //  *         description: Datos de entrada inválidos
    //  *       401:
    //  *         description: No autorizado
    //  *       409:
    //  *         description: El entorno ya existe
    //  */
    // static async getVariablesJsonByEnviroment(req, res) {
    //     try {
    //         var env_name = req.params.env_name;
    //         env_name = env_name.replace('.json', '');
    //         console.log("Env name:", env_name);
    //         const result = await this._service.getVariablesJsonByEnviroment(env_name);
    //         if (!result.isSuccess()) {
    //             return res.status(result.StatusCode).json({ error: result.Error.message });
    //         } else {
    //             return res.status(result.StatusCode).json(result.Value);
    //         }
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error creating variable', error: error.message });
    //     }
    // }
   

}

module.exports = VariableController;