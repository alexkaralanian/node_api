import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import {
  handleInputErrors,
  validateUpdateId,
  validateUpdate,
  validateProduct,
  validateProductId,
} from './modules/middleware';

const router = Router();

/* Product */
router.get('/product', (req, res) => {
  res.json({ message: 'product' });
});
router.get('/product/:id', (req, res) => {});
router.put(
  '/product/:id',
  validateProductId,
  (req: Request, res: Response) => {}
);
router.post('/product', validateProduct, (req: Request, res: Response) => {});
router.delete('/product/:id', (req, res) => {});

/* Update */
router.get('/update', (req, res) => {});
router.get('/update/:id', (req, res) => {});
router.put(
  '/update/:id',
  validateUpdateId,

  (req: Request, res: Response) => {
    res.json('UPDATE ID');
  }
);
router.post('/update', validateUpdate, (req: Request, res: Response) => {});
router.delete('/update/:id', (req, res) => {});

/* UpdatePoint */
router.get('/updatepoint', (req, res) => {});
router.get('/updatepoint/:id', (req, res) => {});
router.post('/updatepoint', (req, res) => {});
router.put('/updatepoint/:id', (req, res) => {});
router.delete('/updatepoint/:id', (req, res) => {});

export default router;
