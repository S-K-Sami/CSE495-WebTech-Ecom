import { Schema, model, models } from 'mongoose';

const BankTransactionSchema = new Schema({
  user_id: {
    type: String,
    required: [true, 'User ID is required!'],
  },
  sender_account: {
    type: String,
    required: [true, 'Sender account is required!'],
  },
  receiver_account: {
    type: String,
    required: [true, 'Receiver account is required!'],
  },
  transaction_id: {
    type: String,
    required: [true, 'Transaction ID is required!'],
  },
  sender_address: {
    type: String,
    required: [true, 'Sender address is required!'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required!'],
  },
  products: {
    type: [
      {
        productname: {
          type: String,
          required: true,
        },
        frequency: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
  next_clicked: {
    type: Boolean,
    required: [true, 'Next clicked is required!'],
  },
  validated: {
    type: Boolean,
    required: [true, 'Validated is required!'],
  },
  product_supplied: {
    type: Boolean,
    required: [true, 'Product supplied is required!'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required!'],
  },
});

const BankTransaction = models.BankTransaction || model('BankTransaction', BankTransactionSchema);

export default BankTransaction;
