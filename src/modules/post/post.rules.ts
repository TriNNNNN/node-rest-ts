import { Request } from 'express';
import { check } from 'express-validator';

export const postRules: any = {
  validateSfa: [
    check('title')
      .not()
      .isEmpty()
      .withMessage('Please enter title'),

    check('title')
      .isLength({ min: 10 })
      .withMessage('Title must contains atleast 100 characters'),

    check('content')
      .not()
      .isEmpty()
      .withMessage('Please enter content'),

    check('content')
      .isLength({ min: 10 })
      .withMessage('Content must contains atleast 100 characters')
  ],
  createPost: [
    check('title')
      .not()
      .isEmpty()
      .withMessage('Please enter title'),

    check('title')
      .isLength({ min: 10 })
      .withMessage('Title must contains atleast 100 characters'),

    check('content')
      .not()
      .isEmpty()
      .withMessage('Please enter content'),

    check('content')
      .isLength({ min: 10 })
      .withMessage('Content must contains atleast 100 characters')
  ]
};