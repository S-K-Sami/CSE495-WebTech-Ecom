import { connectToDB } from "@utils/database";
import BankTransaction from "@models/bankTransaction";

export const GET = async (request) => {
 

  try {
    await connectToDB();

    const transactions = await BankTransaction.find({  next_clicked: false ,validated: false , product_supplied: false});

    if (transactions.length === 0) {
      return new Response("No transactions found", { status: 404 });
    }

    return new Response(JSON.stringify(transactions), { status: 200 });
  } catch (error) {
    return new Response("Failed to get transactions", { status: 500 });
  }
};


export const PUT = async (request) => {
    const url = new URL(request.url);
    const transactionId = url.searchParams.get('transactionId');
  
    try {
      await connectToDB();
  
      const transaction = await BankTransaction.findOneAndUpdate(
        { transaction_id: transactionId },
        { next_clicked: true },
        { new: true }
      );
  
      if (!transaction) {
        return new Response("Transaction not found", { status: 404 });
      }
  
      return new Response(JSON.stringify(transaction), { status: 200 });
    } catch (error) {
      return new Response("Failed to update transaction", { status: 500 });
    }
  };
  
  