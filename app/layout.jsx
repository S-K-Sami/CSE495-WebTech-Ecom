import "@styles/globals.css";
import Nav from "../components/Nav";
import Provider from "@components/Provider";
import { TransactionContext } from "@components/TransactionContext";
export const metadata = {
    title: "CoffeeHouse",
    description:"Buy Your Favourite Coffee!!"
}
import React from 'react';



const RootLayout = ({ children }) => {
    return (
      <html lang="en">
        <body>
          <Provider>
          
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav/>
            {children}
          </main>
         
          </Provider>
        </body>
      </html>
    );
  };
  
  export default RootLayout;