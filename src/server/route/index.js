import express from 'express';
import groceryController from '../controllers/groceryController';

const router = express.Router();

router.route('/items')
  .get(groceryController.fetchAllItem)
  .post(groceryController.createItem);

router.route('/item/:_id')
  .put(groceryController.updateItem)
  .delete(groceryController.deleteItem);

export default router;