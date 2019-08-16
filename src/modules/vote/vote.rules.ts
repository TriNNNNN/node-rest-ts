import { Request } from 'express';
import { check } from 'express-validator';

export const voteRules: any = {
  upVote: [
    check('postId')
      .not()
      .isEmpty()
      .withMessage('postId is mandatory'),
    
    check('postId')
      .isString()
      .withMessage('postId must be of type string'),

    check('email')
      .not()
      .isEmpty()
      .withMessage('email is mandatory'),
    
    check('email')
      .isString()
      .withMessage('Email must be of type string'),

    check('upVote')
      .not()
      .isEmpty()
      .withMessage('upVote is mandatory'),
    
    check('upVote')
      .isNumeric()
      .withMessage('upVote must be number')
  ],
  downVote: [
    check('postId')
      .not()
      .isEmpty()
      .withMessage('postId is mandatory'),
    
    check('postId')
      .isString()
      .withMessage('postId must be of type string'),

    check('email')
      .not()
      .isEmpty()
      .withMessage('email is mandatory'),
    
    check('email')
      .isString()
      .withMessage('Email must be of type string'),

    check('downVote')
      .not()
      .isEmpty()
      .withMessage('downVote is mandatory'),
    
    check('downVote')
      .isNumeric()
      .withMessage('downVote must be number')
  ]
};