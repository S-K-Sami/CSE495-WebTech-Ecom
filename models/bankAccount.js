import { Schema, model, models } from 'mongoose';

const BankAccountSchema = new Schema({
  user_id: {
    type: String,
    required: [true, 'User ID is required!'],
  },
  account_number: {
    type: String,
    required: [true, 'Account number is required!'],
  },
  balance: {
    type: Number,
    // required: [true, 'Balance is required!'],
    default: 100,
  },
  key: {
    type: String,
    required: [true, 'Key is required!'],
  },
});

const BankAccount = models.BankAccount || model('BankAccount', BankAccountSchema);

export default BankAccount;
