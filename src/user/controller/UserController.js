const Result = require('../../core/result-handler/result');
const UserService = require('../service/UserServices')
const CreateUserRequestDto = require('../dto/CreateUserRequestDto')

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 */

class UserController {

    constructor(userService) {
        this._service = new UserService();
    }

    /**
* @swagger
* /users:
*   post:
*     summary: Post user
*     tags: [Users]
*     requestBody: 
*        description: User data to create a new user
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/User'
*     schema:
*     type: object  
*     responses:
*       200:
*         description: User created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       401:
*         description: Wrong credentials
*/
    static async CreateUser(req, res) {

        var createUserRequest = CreateUserRequestDto.fromRequest(req);

        const result = await this._service.createUser(createUserRequest);

        if (!result.isSuccess()) {
            return res.status(result.StatusCode).json({ error: result.Error.message });
        } else {
            return res.status(result.StatusCode).json(result.Value);
        }
    }

    /**
     * @swagger
     * /users/login:
     *   post:
     *     summary: Log user in
     *     tags: [Users]
     *     requestBody:
     *       description: Login data to authenticate user
     *       required: true
     *       content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/User'
     *     schema:
     *     type: object  
     *     responses:
     *       200:
     *         description: Login successful
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       401:
     *         description: Wrong credentials
     */
    static async Login(req, res) {
        try {
            const result = await this._service.login(req.body);
            if (!result.isSuccess()) {
                return res.status(result.StatusCode).json({ error: result.Error.message });
            } else {
                return res.status(result.StatusCode).json(result.Value);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user data', error: error.message });
        }
    }

}

module.exports = UserController;