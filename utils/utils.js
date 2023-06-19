/*const Account = require("../models/account");
const BankTransaction = require("../models/bankTransaction");
const BankAccount = require("../models/bankAccount"); */

import BankAccount from "@models/bankAccount";
import BankTransaction from "@models/bankTransaction";
import Account from "@models/account";


async function postTransaction(
  senderAccount,
  receiverAccount,
  balance,
  senderAddress,
  products,
  nextClicked,
  validated,
  productSupplied
) {
  const senderAccountNo = senderAccount.account_number;
  const receiverAccountNo = receiverAccount.account_number;
  const max = 100;
  const randomNumber = parseInt(Math.floor(Math.random() * max));
  const transactionId = `${Date.now()}${randomNumber}`;
  const transaction = new BankTransaction({
    user_id: senderAccount.user_id,
    sender_account: senderAccountNo,
    receiver_account: receiverAccountNo,
    transaction_id: transactionId,
    sender_address: senderAddress,
    amount: balance,
    products: products,
    next_clicked: nextClicked,
    validated: validated,
    product_supplied: productSupplied,
    date: new Date().toISOString(),
  });
  await transaction.save();
  return transactionId;
}


async function makeTransaction(
  senderAccountNo,
  receiverAccountNo,
  balance,
  senderAddress,
  products,
  nextClicked,
  validated,
  productSupplied
) {
  console.log("inside make transaction");
  console.log(senderAccountNo,
    receiverAccountNo,
    balance,
    senderAddress,
    products,
    nextClicked,
    validated,
    productSupplied);
  if (senderAccountNo === receiverAccountNo) {
    throw new Error("Can't make a transaction in the same account.");
  }
  const senderAccount = await BankAccount.findOne({ account_number: senderAccountNo })
  const receiverAccount = await BankAccount.findOne({ account_number: receiverAccountNo })
  if (!senderAccount || !receiverAccount) {
    const message = !senderAccount
      ? "Sender account " + senderAccountNo + " not found"
      : "Receiver account " + receiverAccountNo + " not found";
    throw new Error(message);
  }

  const _senderBalance = senderAccount.balance - balance;
  const _receiverBalance = receiverAccount.balance + balance;

  if (_senderBalance < 0) {
    throw new Error("Insufficient balance to make this transaction");
  }

  await BankAccount.updateOne(
    { account_number: senderAccountNo },
    { $set: { balance: _senderBalance } },
    { upsert: true }
  );

  await BankAccount.updateOne(
    { account_number: receiverAccountNo },
    { $set: { balance: _receiverBalance } },
    { upsert: true }
  );

  const transactionId = await postTransaction(
    senderAccount,
    receiverAccount,
    balance,
    senderAddress,
    products,
    nextClicked,
    validated,
    productSupplied
  );

  return transactionId;
}


module.exports = {
  makeTransaction,
};
