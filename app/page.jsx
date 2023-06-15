"use client"
import React from 'react';
import UserInfoForm from '@components/UserInfoForm';
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Coffee House
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          Your Coffee At your Door Step!
        </span>
      </h1>
       
      <p className="desc text-center">
       Coffee House is an E-commerce platform where you can order your favourite coffee online and grab it at your doorstep!
      </p>
      {session && <UserInfoForm />}
    
    </section>
  );
}

export default Home;
