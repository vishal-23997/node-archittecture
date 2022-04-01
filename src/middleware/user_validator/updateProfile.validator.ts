import { check, validationResult } from "express-validator";

const updateProfileValidate = [
    check('newMobileNumber')
        .not()
        .isEmpty()
        .withMessage('Mobile number can not be empty!')
        .isLength({ min: 10, max: 10 })
        .withMessage('Mobile number of 10 digit is required!'),
    check('newCity')
        .not()
        .isEmpty()
        .withMessage('City can not be empty!'),
    (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

export default updateProfileValidate;