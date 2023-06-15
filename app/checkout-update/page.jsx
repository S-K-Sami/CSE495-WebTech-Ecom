"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
const ProductSupplier = () => {
  const [transactions, setTransactions] = useState([]);
  const { data: session } = useSession();
  const [fetchTransactionFlag,setFetchTransactionFlag] = useState(false);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/transaction-product-supplied?userId=${session.user.id}`);
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

    fetchTransactions();
  }, [transactions]);

  const handleConfirm = async (transactionId) => {
    try {
      const response = await fetch(`/api/transaction-product-supplied?transactionId=${transactionId}`, {
        method: 'PUT',
      });
      if (response.ok) {
        console.log("card confirmed");
        setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction.transaction_id !== transactionId));
       // setFetchTransactionFlag(!fetchTransactionFlag);
        // Transaction updated successfully
        // You can perform additional actions here if needed
      } else {
        console.error('Failed to confirm transaction:', response.status);
      }
    } catch (error) {
      console.error('Error confirming transaction:', error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <h1 className="col-span-3 text-2xl font-bold mb-4">Delivered Orders</h1>
      {transactions.length === 0 ? (
        <p className="col-span-3 text-4xl font-bold text-center">Nothing to deliver yet!</p>
      ) : (
        transactions.map((transaction) => (
         



<div key={transaction._id} className="bg-white rounded-lg p-4 shadow-lg">
<table className="w-full border">
  <tbody>
    <tr className="bg-gray-200">
      <td className="p-2 border font-bold">Transaction ID:</td>
      <td className="p-2 border">{transaction.transaction_id}</td>
    </tr>
    
    <tr className="border">
      <td className="p-2 border font-bold">Amount:</td>
      <td className="p-2 border">{transaction.amount}</td>
    </tr>
    <tr className="border">
      <td className="p-2 border font-bold">Products:</td>
      <td className="p-2 border">
        {transaction.products.map((product, index) => (
          <div key={index}>
            <p>{product.productname}</p>
            <p className="text-sm text-gray-500">{`Count: ${product.frequency || 0}`}</p>
          </div>
        ))}
      </td>
    </tr>
    <tr className="border">
      <td className="p-2 border font-bold">Date:</td>
      <td className="p-2 border">{new Date(transaction.date).toLocaleDateString()}</td>
    </tr>
    <tr className="border">
      <td className="p-2 border font-bold">To the location:</td>
      <td className="p-2 border">{transaction.sender_address}</td>
    </tr>
  </tbody>
</table>

<button
  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 font-bold hover:bg-blue-700 focus:outline-none focus:shadow-outline"
  onClick={() => handleConfirm(transaction.transaction_id)}
>
  Confirm Delivery
</button>
</div>








        ))
      )}
    </div>
  );

};

export default ProductSupplier;
