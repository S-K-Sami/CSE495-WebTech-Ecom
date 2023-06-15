import BankTransaction from "@models/bankTransaction";
import { connectToDB } from "@utils/database";

export const GET = async () => {
    try {
      await connectToDB();
  
      const transactions = await BankTransaction.find();
  
      if (transactions.length === 0) {
        return new Response("No bank accounts found", { status: 404 });
      }
  
      return new Response(JSON.stringify(transactions), { status: 200 });
    } catch (error) {
      return new Response("Failed to get bank accounts", { status: 500 });
    }
  };