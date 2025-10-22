const Result = require('../../core/result-handler//result');
const EnviromentService = require('../service/EnviromentService')

/**
 * @swagger
 * tags:
 *   name: Enviroment
 *   description: Enviroment management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Enviroment:
 *       type: object
 *         
 */

class EnviromentController {
    constructor(enviromentService) {
        this._service = new EnviromentService();
    }

    /**
     * @swagger
     * /enviroments:
     *   get:
     *     summary: Listar todos los entornos con paginación
     *     tags: [Enviroment]
     *     security: [{ bearerAuth: [] }]
     *     parameters:
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
     *         description: Lista de entornos obtenida exitosamente.
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
     *                   items: { $ref: '#/components/schemas/Enviroment' }
     */
    static async getAllEnviroments(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await this._service.findAllEnviroments(page, limit);
            if (!result.isSuccess()) {
                return res.status(result.StatusCode).json({ error: result.Error.message });
            } else {
                return res.status(result.StatusCode).json(result.Value);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching environments', error: error.message });
        }
    }

        /**
   * @swagger
   * /enviroments/{env_name}/:
   *   get:
   *     summary: Get enviroment by ID
   *     tags: [Enviroment]
   *     parameters:
   *       - in: path
   *         name: env_name
   *         required: true
   *         schema:
   *           type: string
   *         description: Enviroment name
   *     responses:
   *       200:
   *         description: Enviroment found successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Enviroment'
   *       404:
   *         description: Agency not found
   */
    static async getEnviromentByName(req, res) {
        try {
            const result = await this._service.getEnviromentByName(req.params.env_name);
            if (!result.isSuccess()) {
                return res.status(result.StatusCode).json({ error: result.Error.message });
            } else {
                return res.status(result.StatusCode).json(result.Value);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching environment data', error: error.message });
        }
    }

    /**
     * @swagger
     * /enviroments:
     *   post:
     *     summary: Crear un nuevo entorno
     *     tags: [Enviroment]
     *     security:
     *       - bearerAuth: []
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
    static async createEnviroment(req, res) {
        try {
            const result = await this._service.createEnviroment(req.body);
            if (!result.isSuccess()) {
                return res.status(result.StatusCode).json({ error: result.Error.message });
            } else {
                return res.status(result.StatusCode).json(result.Value);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating environment', error: error.message });
        }
    }

    /**
     * @swagger
     * /enviroments/{env_name}:
     *   put:
     *     summary: Actualizar un entorno 
     *     tags: [Enviroment]
     *     security: [{ bearerAuth: [] }]
     *     parameters:
     *       - in: path
     *         name: env_name
     *         required: true
     *         schema: { type: string }
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/components/schemas/Enviroment' }
     *     responses:
     *       200: { description: "Entorno actualizado" }
     *       404: { description: "Entorno no encontrado" }
     *       409: { description: "Conflicto, el nuevo nombre ya existe" }
     */
    static async updateEnviroment(req, res) {
        try {
            const result = await this._service.updateEnviroment(req.params.env_name, req.body);
            if (!result.isSuccess()) {
                return res.status(result.StatusCode).json({ error: result.Error.message });
            } else {
                return res.status(result.StatusCode).json(result.Value);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating environment', error: error.message });
        }
    }

    /**
     * @swagger
     * /enviroments/{env_name}:
     *   patch:
     *     summary: Actualizar un entorno (parcial)
     *     tags: [Enviroment]
     *     security: [{ bearerAuth: [] }]
     *     parameters:
     *       - in: path
     *         name: env_name
     *         required: true
     *         schema: { type: string }
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema: { $ref: '#/components/schemas/Enviroment' }
     *     responses:
     *       200: { description: "Entorno actualizado parcialmente" }
     *       404: { description: "Entorno no encontrado" }
     *       409: { description: "Conflicto, el nuevo nombre ya existe" }
     */
    static async partialUpdateEnviroment(req, res) {
        try {
            const result = await this._service.partialUpdateEnviroment(req.params.env_name, req.body);
            if (!result.isSuccess()) {
                return res.status(result.StatusCode).json({ error: result.Error.message });
            } else {
                return res.status(result.StatusCode).json(result.Value);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error partially updating environment', error: error.message });
        }
    }

     /**
     * @swagger
     * /enviroments/{env_name}:
     *   delete:
     *     summary: Eliminar un entorno
     *     tags: [Enviroment]
     *     security: [{ bearerAuth: [] }]
     *     parameters:
     *       - in: path
     *         name: env_name
     *         required: true
     *         schema: { type: string }
     *     responses:
     *       204: { description: "Entorno eliminado exitosamente" }
     *       404: { description: "Entorno no encontrado" }
     */
    static async deleteEnviroment(req, res) {
        try {
            const result = await this._service.deleteEnviroment(req.params.env_name);
            if (!result.isSuccess()) {
                return res.status(result.StatusCode).json({ error: result.Error.message });
            } else {
                return res.status(result.StatusCode).json(result.Value);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting environment', error: error.message });
        }
    }

}

module.exports = EnviromentController;