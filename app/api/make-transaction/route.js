import BankAccount from "@models/bankAccount";
import Account from "@models/account";
import BankTransaction from "@models/bankTransaction";

import { connectToDB } from "@utils/database";
import { makeTransaction } from "@utils/utils";


export const POST = async (request) => {
  //  const { userId, accountNumber, balance, key } = await request.json();
   const { senderAccountNo,
  receiverAccountNo,
  balance,
  senderAddress,
  products,
  nextClicked,
  validated,
  productSupplied } = await request.json();
  
  try {
    await connectToDB();
    console.log("i am in");
    const transactionId = await makeTransaction(
        senderAccountNo,
        receiverAccountNo,
        balance,
        senderAddress,
        products,
        nextClicked,
        validated,
        productSupplied
      );
      return new Response(JSON.stringify(transactionId), { status: 201 });
  } catch (error) {
    return new Response("Error Occured while making transaction", { status: 500 });
  }
 

  


}