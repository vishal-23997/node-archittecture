import express from 'express';
import UserController from '../controller/user.constroller';
import ensureToken from '../middleware/ensureToken';
import MediaController from '../controller/media.controller';
import signUpValidate from '../middleware/user_validator/signUp.validator';
import loginValidate from '../middleware/user_validator/login.validator';
import updateProfileValidate from '../middleware/user_validator/updateProfile.validator';

const controller = new UserController();
const mediaController = new MediaController();
const router = express();

router.post('/sign-up',signUpValidate,controller.signup);

router.post('/log-in',loginValidate,controller.login);

router.get('/user/getProfile', ensureToken,controller.getProfile);

router.post('/verifyToken', ensureToken, controller.verifyToken);

router.put('/user/updateProfile', ensureToken,updateProfileValidate,controller.updateProfile);

router.patch('/user/de-activate',ensureToken,controller.deactivate);

router.post('/re-activate',controller.reactivate);

router.post('/upload/single-image',ensureToken, mediaController.singleUpload);

router.post('/upload/multiple-image',ensureToken, mediaController.multipleUpload);

router.post('/upload/video',ensureToken, mediaController.videoUpload);



/**
 * @swagger
 * tags:
 *  name: User
 *  description: User Routes
 */


/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Register user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/SignupDataModel'
 *     responses:
 *       200:
 *         description: Signed-up Successfully
 */


/**
 * @swagger
 * /log-in:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/LoginDataModel'
 *     responses:
 *       200:
 *         description: Logged-in successfully
 */


/**
 * @swagger
 * /user/getProfile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     responses:
 *       200:
 *         description: user profile
 */

/**
 * @swagger
 * /verifyToken:
 *   post:
 *     summary: To verify any JWT
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Verified user
 */


/**
 * @swagger
 * /user/updateProfile:
 *   put:
 *     summary: Update user basic details
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/UpdateDataModel'
 *     responses:
 *       200:
 *         description: Update successfull !
 */


/**
 * @swagger
 * /user/de-activate:
 *   patch:
 *     summary: To de-activate own account
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Account de-activated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */


/**
 * @swagger
 * /user/re-activate:
 *   post:
 *     summary: Account re-activate
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Account re-activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */


// router.post('/extract', mediaController.extract)


// router.post('/publisher',ensureToken,controller.publisher)

//router.get('/subscriber',controller.subscriber)


/*--------------- Swagger Schema Models ---------------------- */


/**
 * @swagger
 * components:
 *   schemas:
 *     SignupDataModel:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - fname
 *         - lname
 *         - mobileNumber
 *         - city
 *       properties:
 *         email:
 *           type: string
 *           description: email in smaller letters
 *         password:
 *           type: string
 *           description: hard password
 *         fname:
 *           type: string
 *           description: first name
 *         lname:
 *           type: string
 *           description: last name
 *         mobileNumber:
 *           type: number
 *           description: mobile number
 *         city:
 *           type: string
 *           descripton: city name *
 *       example:
 *         email: example0123@gmail.com
 *         password: Example@12345
 *         fname: Vishal
 *         lname: Singh
 *         mobileNumber: 9087654321
 *         city: Noida
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginDataModel:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: email in smaller letters
 *         password:
 *           type: string
 *           description: hard password *
 *       example:
 *         email: example0123@gmail.com
 *         password: Example@12345
 *
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateDataModel:
 *       type: object
 *       properties:
 *         newMobileNumber:
 *           type: number
 *           description: mobile number
 *         newCity:
 *           type: string
 *           descripton: city name
 *       example:
 *         newMobileNumber: 9876543210
 *         newCity : Delhi
 *         
 *
 */

export default router;