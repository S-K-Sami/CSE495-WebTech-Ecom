"use client"
import { useEffect, useState } from 'react';
import ProductCard from '@components/ProductCard';
import { useSession } from 'next-auth/react';
import Cart from '@components/Cart';
import { useRouter } from 'next/navigation';
import CurrentBalance from '@components/CurrentBalance';

const Buy = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [balanceUpdateFlag,setbalanceUpdateFlag] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [keyAccount, setKeyAccount] = useState('');
  const [keyBankAccount, setKeyBankAccount] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);
  const [bankAccountInfo, setBankAccountInfo] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        console.log("HYSDSDS" +  session.user.id);
        const response = await fetch(`/api/bank-account?userId=${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setCurrentAmount(data.balance);
          console.log(currentAmount);
          setKeyBankAccount(data.key);
          setBankAccountInfo(data);
        } else {
          console.error('Failed to fetch balance:', response.status);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }

      try {
        const response2 = await fetch(`/api/account?userId=${session?.user.id}`);
        if (response2.ok) {
          const data = await response2.json();
          setKeyAccount(data.key);
          setAccountInfo(data);
        } else {
          console.error('Failed to fetch balance:', response2.status);
        }
      } catch (error) {
        console.error('Error fetching key from account:', error);
      }
    };

    fetchBalance();
  }, [session,balanceUpdateFlag]);

  const products = [
    { id: 1, name: 'Cappuccino', price: 30, image: '/assets/images/cappachino.jpg' },
    { id: 2, name: 'Cold Brew', price: 40, image: '/assets/images/coldBrew.jpg' },
    { id: 3, name: 'Espresso', price: 50, image: '/assets/images/expresso.jpg' },
  ];


  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.product.id !== product.id);
    setCart(updatedCart);
  };

  const updateQuantity = (product, quantity) => {
    const updatedCart = cart.map((item) => {
      if (item.product.id === product.id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const proceedToCheckout = async () => {
    if (keyAccount === keyBankAccount) {
      setShowCheckOut(true);

      try {
        const response = await fetch('/api/make-transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderAccountNo: bankAccountInfo.account_number,
            receiverAccountNo: 'daraz1',
            balance: cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
            senderAddress: accountInfo.address,
            products: cart.map((item) => ({
              productname: item.product.name,
              frequency: item.quantity,
            })),
            nextClicked: false,
            validated: false,
            productSupplied: false,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("successfully transaction acccomplished");
         
          setTransactionDetails(data);
        } else {
          console.error('Transaction failed:', response.status);
        }
      } catch (error) {
        console.error('Error making transaction:', error);
      }
    }
  };

  const handleOkButton = () => {
   
    setShowCheckOut(false);
    setbalanceUpdateFlag(!balanceUpdateFlag);
  //  router.push('/checkout-update');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-2">
        <CurrentBalance amount={currentAmount} />
        <br/>
        <h2 className="text-2xl font-bold mb-4">Products</h2>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
      <div>
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          proceedToCheckout={proceedToCheckout}
        />
      </div>
      {showCheckOut && (
       <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div className="bg-white rounded-lg p-8 max-w-md">
      <p className="text-xl font-bold mb-4">
        Key Verified! Request Sent to the Coffee-Admin.Stay tuned for checkout update!
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        onClick={handleOkButton}
      >
        OK
      </button>
    </div>
  </div>

      )}
    </div>
  );
};

export default Buy;
