import { Types } from 'mongoose';
import GroceryModel from '../models/GroceryModel';
import responseInfo from '../helpers/responseInfo';

class GroceryController {
  static serverError = 'Internal server error';

  static itemNotFound = 'Item not currently available';

  static fetchAllItem = (req, res) => {
    GroceryModel.find({}, '_id name purchaseStatus')
      .then((items) => {
        if (items.length < 1) {
          return responseInfo.error(res, 404, 'Sorry! No items in the store');
        }
        return responseInfo.success(res, 200, 'All items are successfully retrieved', items);
      })
      .catch(() => responseInfo.error(res, 500, GroceryController.serverError));
  }

  static createItem = (req, res) => {
    const { name, price } = req.body;
    const grocery = new GroceryModel({ name, price });

    grocery.save()
      .then(item => responseInfo.success(res, 201, 'Grocery successfully added', item))
      .catch(() => responseInfo.error(res, 500, 'Sorry! unable to save grocery item'));
  }

  static updateItem = (req, res) => {
    const { _id } = req.params;

    if (!Types.ObjectId.isValid(_id)) {
      return responseInfo.error(res, 422, 'Sorry!, inavlid grocery id');
    }

    return GroceryModel.findOne({ _id })
      .then((item) => {
        if (!item) {
          return responseInfo.error(res, 404, GroceryController.itemNotFound);
        }
        return GroceryModel.findOneAndUpdate({ _id: item._id },
          { purchaseStatus: !item.purchaseStatus }, { new: true })
          .then((updatedItem) => {
            let message = `${updatedItem.name} has been purchased`;

            if (!updatedItem.purchaseStatus) {
              message = `${updatedItem.name} has been dropped`;
            }
            return responseInfo.success(res, 200, message, updatedItem);
          })
          .catch(() => responseInfo.error(res, 500, GroceryController.serverError));
      })
      .catch(() => responseInfo.error(res, 500, GroceryController.serverError));
  }

  static deleteItem = async (req, res) => {
    const { _id } = req.params;

    if (!Types.ObjectId.isValid(_id)) {
      return responseInfo.error(res, 422, 'Sorry!, inavlid grocery id');
    }

    try {
      const deletedItem = await GroceryModel.findOneAndDelete({ _id });

      if (!deletedItem) {
        return responseInfo.error(res, 404, GroceryController.itemNotFound);
      }
      return responseInfo.success(res, 200, 'Grocery item has been deleted', deletedItem);
    } catch (e) {
      return responseInfo.error(res, 500, GroceryController.serverError);
    }
  }
}

export default GroceryController;