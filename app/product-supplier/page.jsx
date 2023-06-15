"use client"
import { useEffect, useState } from 'react';
import CurrentBalance from '@components/CurrentBalance';

const ProductSupplier = () => {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [transactionFlag,setTransactionFlag] = useState(false);
  
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('/api/bank-account?userId=2'); // Replace '2' with the actual user ID
        if (response.ok) {
          const data = await response.json();
          setCurrentAmount(data.balance); // Assuming the API response has a 'balance' field
        } else {
          // Handle the error case
          console.error('Failed to fetch balance:', response.status);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transaction-validated');
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          // Handle the error case
         // console.error('Failed to fetch transactions:', response.status);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

   
    fetchBalance();
    fetchTransactions();
  }, [transactions]);

 
  const handleValidateTransaction = async (transactionId) => {
         console.log("ARE YOU HERE");
    try {
      console.log("gefefe");
      const selectedTransaction = transactions.find((transaction) => transaction.transaction_id === transactionId);
      
      console.log(selectedTransaction);

      const response = await fetch(`/api/transaction-validated?transactionId=${transactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedTransaction),
      });
     

      if (response.ok) {


        // Manually insert values for specific fields
        const updatedTransaction = {
          senderAccountNo:"daraz1",
  receiverAccountNo:"CoffeeSupplier",
  balance:selectedTransaction.amount,
  senderAddress:"120 main Street",
  products:selectedTransaction.products,
  nextClicked:true,
  validated:true,
  productSupplied:true
        };



        // Call the make-transaction API
        const makeTransactionResponse = await fetch('/api/make-transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTransaction),
        });

        if (makeTransactionResponse.ok) {
          // Transaction successful
          console.log('Transaction successful');

          // Refetch transactions
          setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction.transaction_id !== transactionId));
        } else {
          // Handle the error case for making the transaction
          console.error('Failed to make the transaction:', makeTransactionResponse.status);
        }
      } else {
        // Handle the error case for validating the transaction
        console.error('Failed to validate the transaction:', response.status);
      }
    } catch (error) {
      console.error('Error validating the transaction:', error);
    }
  };

  return (
    <div>
      <h1>Product Supplier</h1>
      <CurrentBalance amount={currentAmount} />
       <br/>
      <div  className="grid grid-cols-3 gap-4">
        {
          transactions.length === 0 ? (
            <p className="col-span-3 text-4xl font-bold text-center">Nothing to Validate</p>
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
      <td className="p-2 border font-bold">Sender Account:</td>
      <td className="p-2 border">{transaction.sender_account}</td>
    </tr>
    <tr className="border">
      <td className="p-2 border font-bold">Receiver Account:</td>
      <td className="p-2 border">{transaction.receiver_account}</td>
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
      <td className="p-2 border font-bold">Sender Address:</td>
      <td className="p-2 border">{transaction.sender_address}</td>
    </tr>
  </tbody>
</table>

<button
  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 font-bold hover:bg-blue-700 focus:outline-none focus:shadow-outline"
  onClick={() => handleValidateTransaction(transaction.transaction_id)}
>
  Validate
</button>
</div>






        )))}
      </div>
    </div>
  );
};

export default ProductSupplier;
