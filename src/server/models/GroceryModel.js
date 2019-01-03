import { model, Schema } from 'mongoose';

const GrocerySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    max: 100
  },
  purchaseStatus: {
    type: Boolean,
    default: false
  }
});

export default model('Grocery', GrocerySchema);