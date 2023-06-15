"use client"
import { useEffect, useState } from 'react';
import CurrentBalance from '@components/CurrentBalance';

const CoffeeAdmin = () => {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [useEffectFlag,setUseEffectFlag] = useState(false);
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('/api/bank-account?userId=1'); // Replace '1' with the actual user ID
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
        const response = await fetch('/api/transaction-nextclicked');
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          // Handle the error case
          console.error('Failed to fetch transactions:', response.status);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchBalance();
    fetchTransactions();
  }, [transactions]);

  const handleMoveToSupplier = async (transactionId) => {
    try {
      const response = await fetch(`/api/transaction-nextclicked?transactionId=${transactionId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        // Transaction successfully updated
        // Perform any necessary actions or display a success message
        console.log('Transaction moved to product supplier');
        setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction.transaction_id !== transactionId));
       // setUseEffectFlag(!useEffectFlag);
      } else {
        // Handle the error case
        console.error('Failed to move transaction:', response.status);
      }
    } catch (error) {
      console.error('Error moving transaction:', error);
    }
  };

  return (
    <div>
      <h1>CoffeeAdmin</h1>
      <CurrentBalance amount={currentAmount} />
       <br/>
      <div className="grid grid-cols-3 gap-4">
        {
        transactions.length === 0 ? (
          <p className="col-span-3 text-4xl font-bold text-center">Nothing to Process!</p>
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
            onClick={() => handleMoveToSupplier(transaction.transaction_id)}
          >
            Move to Product Supplier
          </button>
        </div>
        
        )))}
      </div>
    </div>
  );
};


export default CoffeeAdmin;
