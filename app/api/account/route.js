import Account from "@models/account";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, accountNumber, key, address } = await request.json();

  try {
    await connectToDB();
    const newAccount = new Account({ user_id: userId, account_number: accountNumber, key, address });

    await newAccount.save();
    return new Response(JSON.stringify(newAccount), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new account", { status: 500 });
  }
};

export const GET = async (request) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  try {

    await connectToDB();

    const account = await Account.findOne({ user_id: userId });
    console.log(account + "dsds");
    if (!account) {
      return new Response("Account not found", { status: 404 });
    }

    return new Response(JSON.stringify(account), { status: 200 });
  } catch (error) {
    return new Response("Failed to get account", { status: 500 });
  }
};
