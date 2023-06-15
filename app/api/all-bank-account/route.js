import BankAccount from "@models/bankAccount";
import { connectToDB } from "@utils/database";

export const GET = async () => {
    try {
      await connectToDB();
  
      const bankAccounts = await BankAccount.find();
  
      if (bankAccounts.length === 0) {
        return new Response("No bank accounts found", { status: 404 });
      }
  
      return new Response(JSON.stringify(bankAccounts), { status: 200 });
    } catch (error) {
      return new Response("Failed to get bank accounts", { status: 500 });
    }
  };