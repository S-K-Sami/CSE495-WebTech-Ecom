
import BankAccount from "@models/bankAccount";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, accountNumber, balance, key } = await request.json();

  try {
    await connectToDB();
    const newBankAccount = new BankAccount({
      user_id: userId,
      account_number: accountNumber,
      balance,
      key,
    });

    await newBankAccount.save();
    return new Response(JSON.stringify(newBankAccount), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new bank account", { status: 500 });
  }
};

export const GET = async (request) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  try {
    await connectToDB();
   
    const bankAccount = await BankAccount.findOne({ user_id: userId });
    console.log("fff");
    if (!bankAccount) {
      return new Response("Bank account not found", { status: 404 });
    }

    return new Response(JSON.stringify(bankAccount), { status: 200 });
  } catch (error) {
    return new Response("Failed to get bank account", { status: 500 });
  }
}; 






/*
export const GET = async (request) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  try {
    await connectToDB();
   
    const bankAccount = await BankAccount.findOne({ user_id: userId });
    console.log("fff");
    if (!bankAccount) {
      return new Response("Bank account not found", { status: 404 });
    }

    return new Response(JSON.stringify(bankAccount), { status: 200 });
  } catch (error) {
    return new Response("Failed to get bank account", { status: 500 });
  }
}; */
