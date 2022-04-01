import { check, validationResult } from "express-validator";

const loginValidate = [
    check('email')
        .not()
        .isEmpty()
        .withMessage('Email can not be empty!')
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required!'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password cannot be empty')
        .isAlphanumeric()
        .withMessage('Password must be alpha numeric!')
        .isLength({ min: 8 })
        .withMessage('Password must be more that 6 charecters'),

    (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

export default loginValidate;