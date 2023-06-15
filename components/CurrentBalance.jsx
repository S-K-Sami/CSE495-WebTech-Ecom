import React from 'react';

const CurrentBalance = ({ amount }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Current Balance:</h3>
      <p className="text-xl font-bold">${amount}</p>
    </div>
  );
};

export default CurrentBalance;
