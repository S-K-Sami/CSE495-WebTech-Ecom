"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'bankadmin' && password === 'bankadmin') {
      router.push('/bank-admin');
    } else if (username === 'productsupplier' && password === 'productsupplier') {
      router.push('/product-supplier');
    } else if (username === 'coffeeadmin' && password === 'coffeeadmin') {
      router.push('/coffee-admin');
    } else {
      // Invalid login credentials
      alert('Invalid username or password');
    }
  };

  return (
    <div className="flex justify-center items-start h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-96" onSubmit={handleLogin}>
        <h2 className="text-3xl font-bold text-center mb-6">Login To System</h2>
        <div className="mb-6">
          <label htmlFor="username" className="block font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-3 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-md w-full" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
