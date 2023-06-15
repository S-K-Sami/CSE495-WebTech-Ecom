import React from 'react';

const TransactionIdCard = ({ sender, receiver, transactionAmount, products, frequency, currentDate, transactionId, deliveryAddress }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Transaction ID: {transactionId}</h3>
          <p className="text-gray-500">Date: {currentDate}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Transaction Amount: ${transactionAmount}</h3>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-500">Sender: {sender}</p>
        <p className="text-gray-500">Receiver: {receiver}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Delivery Address:</h3>
        <p>{deliveryAddress}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Products:</h3>
        <ul className="list-disc pl-6">
          {products.map((product, index) => (
            <li key={index}>{product.name} - {frequency[index]}x</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionIdCard;
