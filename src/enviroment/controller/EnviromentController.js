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

}

module.exports = EnviromentController;