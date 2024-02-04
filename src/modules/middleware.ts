import { validationResult, body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next();
  }
};

export const validateUpdate = [
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  handleInputErrors,
];

export const validateUpdateId = [
  body('title').isString(),
  body('body').isString().optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  handleInputErrors,
];

export const validateProduct = [body('name').isString(), handleInputErrors];

export const validateProductId = [body('name').isString(), handleInputErrors];
