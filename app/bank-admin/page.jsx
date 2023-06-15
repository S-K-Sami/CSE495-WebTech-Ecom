"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
const BankAdmin = () => {
  const [userId, setUserId] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState('');
  const [key, setKey] = useState('');
  const [bankAccounts, setBankAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [bankAccountsFlag, setBankAccountsFlag] = useState(false);
  const [transactionsFlag, setTransactionsFlag] = useState(false);
  const { data: session } = useSession();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/bank-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId : session.user.id,
          accountNumber,
          balance,
          key,
        }),
      });

      if (response.ok) {
        // Account created successfully
        // You can perform additional actions here if needed
        console.log('Bank account created');
        setUserId('');
        setAccountNumber('');
        setBalance('');
        setKey('');
        fetchBankAccounts();
      } else {
        console.error('Failed to create bank account:', response.status);
      }
    } catch (error) {
      console.error('Error creating bank account:', error);
    }
  };

  const fetchBankAccounts = async () => {
    try {
      const response = await fetch('/api/all-bank-account');

      if (response.ok) {
        const data = await response.json();
        setBankAccounts(data);
      } else {
        console.error('Failed to fetch bank accounts:', response.status);
      }
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/get-all-transactions');

      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        console.error('Failed to fetch transactions:', response.status);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchBankAccounts();
    fetchTransactions();
  }, [bankAccountsFlag, transactionsFlag]);

  return (
    <div>
      <div className="flex justify-center items-center mt-8">
        <div className="bg-gray-200 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-4">Bank Account Creation</h2>
          <form onSubmit={handleFormSubmit}>
            
            <div className="mb-4">
              <label htmlFor="accountNumber" className="block font-medium mb-1">
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                className="w-full p-2 border border-gray-300 rounded"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="balance" className="block font-medium mb-1">
                Balance
              </label>
              <input
                type="number"
                id="balance"
                className="w-full p-2 border border-gray-300 rounded"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="key" className="block font-medium mb-1">
                Key
              </label>
              <input
                type="text"
                id="key"
                className="w-full p-2 border border-gray-300 rounded"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">
              Create Bank Account
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Existing Bank Accounts</h2>
        {bankAccounts.length === 0 ? (
          <p>No bank accounts found.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">User ID</th>
                <th className="p-2 border">Account Number</th>
                <th className="p-2 border">Balance</th>
                <th className="p-2 border">Key</th>
              </tr>
            </thead>
            <tbody>
              {bankAccounts.map((account) => (
                <tr key={account._id}>
                  <td className="p-2 border">{account.user_id}</td>
                  <td className="p-2 border">{account.account_number}</td>
                  <td className="p-2 border">{account.balance}</td>
                  <td className="p-2 border">{account.key}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Transactions</h2>
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">User ID</th>
                <th className="p-2 border">Sender Account</th>
                <th className="p-2 border">Receiver Account</th>
                <th className="p-2 border">Transaction ID</th>
                <th className="p-2 border">Sender Address</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Products</th>
                <th className="p-2 border">Processed to Supplier</th>
                <th className="p-2 border">Validated</th>
                <th className="p-2 border">Product Supplied</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="p-2 border">{transaction.user_id}</td>
                  <td className="p-2 border">{transaction.sender_account}</td>
                  <td className="p-2 border">{transaction.receiver_account}</td>
                  <td className="p-2 border">{transaction.transaction_id}</td>
                  <td className="p-2 border">{transaction.sender_address}</td>
                  <td className="p-2 border">{transaction.amount}</td>
                  <td className="p-2 border">
                    {transaction.products.map((product, index) => (
                      <div key={index}>
                        <p>Product Name: {product.productname}</p>
                        <p>Frequency: {product.frequency}</p>
                      </div>
                    ))}
                  </td>
                  <td className="p-2 border">{transaction.next_clicked ? 'Yes' : 'No'}</td>
                  <td className="p-2 border">{transaction.validated ? 'Yes' : 'No'}</td>
                  <td className="p-2 border">{transaction.product_supplied ? 'Yes' : 'No'}</td>
                  <td className="p-2 border">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BankAdmin;
