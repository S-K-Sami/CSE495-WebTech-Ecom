import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

const UserInfoForm = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [key, setKey] = useState('');
  const [address, setAddress] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const formRef = useRef(null);
  const { data: session } = useSession();

  const handleSubmit =async (event) => {
    event.preventDefault();

  // Create a user object with form data
  const user = {
    accountNumber,
    key,
    address,
    userId: session.user.id // Assuming the user ID is available in the session
  };

  try {
    // Make the POST request to the account collection
    const response = await fetch('/api/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      // User information successfully saved
      setFormVisible(false);
      setUserExists(true);
      // Reset form fields
      setAccountNumber('');
      setKey('');
      setAddress('');
    } else {
      // Handle the error case
      // Display an error message or perform any desired action
    }
  } catch (error) {
    // Handle any network or server errors
    // Display an error message or perform any desired action
  }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  useEffect(() => {
    if (formVisible && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    // Make a GET request to the account collection using the session
    const fetchAccountData = async () => {
      try {
        // Perform the GET request to check if the user exists in the account collection
        // Replace the API_URL with the appropriate URL to fetch the account data
        const response = await fetch(`/api/account?userId=${session.user.id}`);
        const data = await response.json();
        console.log("dataaaa" + data);
        // If the user exists in the account collection, set userExists to true
        setUserExists(data !== null);
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };

    if (session) {
      fetchAccountData();
    }
  }, [formVisible, session]);

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">User Information</h1>
      <div className="cursor-pointer mb-4" onClick={toggleFormVisibility}>
        {formVisible ? (
          <span className="text-black-500">Hide User Information Form</span>
        ) : (
          <span className="text-black-500">Show User Information Form</span>
        )}
      </div>

      {userExists ? (
        <div className="text-gray-500">User already provided information</div>
      ) : formVisible ? (
        <form className="w-3/4" onSubmit={handleSubmit} ref={formRef}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountNumber">
              Account Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full xl:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="accountNumber"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter Account Number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="key">
              Key
            </label>
            <input
              className="shadow appearance-none border rounded w-full xl:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="key"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter Key"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default UserInfoForm;
