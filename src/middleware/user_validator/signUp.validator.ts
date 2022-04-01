import { check, validationResult } from "express-validator";

const signUpValidate = [
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
    .isLength({ min: 8 })
    .withMessage('Password must be more that 8 charecters'),
  check('fname')
    .not()
    .isEmpty()
    .withMessage('First name can not be empty!')
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!'),
  check('mobileNumber')
    .not()
    .isEmpty()
    .withMessage('Mobile number can not be empty!')
    .isLength({ min: 10, max: 10 })
    .withMessage('Mobile number of 10 digit is required!'),
  check('city')
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

export default signUpValidate;