"use client"
import React from 'react';

const Cart = ({ cart, removeFromCart, updateQuantity, proceedToCheckout }) => {
  const calculateTotalCost = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <div className="bg-gray-102 p-8 rounded-lg w-96">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product.id} className="border">
                  <td className="p-2 border font-bold">{item.product.name}</td>
                  <td className="p-2 border font-bold">{item.quantity}</td>
                  <td className="p-2 border">
                    <div className="flex space-x-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => removeFromCart(item.product)}
                      >
                        Remove
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => updateQuantity(item.product, item.quantity - 1)}
                      >
                        Decrease
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => updateQuantity(item.product, item.quantity + 1)}
                      >
                        Increase
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-lg mt-4">
            Total Cost: <span className="font-bold text-xl">${calculateTotalCost()}</span>
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            onClick={proceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
  
  
 
};

export default Cart;
