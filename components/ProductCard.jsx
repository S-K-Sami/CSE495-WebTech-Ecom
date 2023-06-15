import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  const { name, price, image } = product;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src={image} alt={name} className="w-full h-32 object-cover mb-4" />
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 font-semibold">${price}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
