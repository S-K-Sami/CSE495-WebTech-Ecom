"use client"
import React, { createContext, useState } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactionData, setTransactionData] = useState(null);

  const setTransaction = (data) => {
    setTransactionData(data);
  };

  return (
    <TransactionContext.Provider value={{ transactionData, setTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
