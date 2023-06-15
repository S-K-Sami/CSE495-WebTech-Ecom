import { Schema, model, models } from 'mongoose';

const AccountSchema = new Schema({
  user_id: {
    type: String,
    required: [true, 'User ID is required!'],
  },
  account_number: {
    type: String,
    required: [true, 'Account number is required!'],
  },
  key: {
    type: String,
    required: [true, 'Key is required!'],
  },
  address: {
    type: String,
    required: [true, 'Address is required!'],
  },
});

const Account = models.Account || model('Account', AccountSchema);

export default Account;
