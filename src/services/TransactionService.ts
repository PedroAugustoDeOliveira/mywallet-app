import axios from "axios";

const URL = "https://mywallet-api-nrrz.onrender.com/transactions";

export interface Transaction {
  _id: string;
  createdAt: string;
  description: string;
  value: number;
  type: "income" | "expense";
}

export async function getTransactions(token: string): Promise<Transaction[]> {
  const res = await axios.get(URL, {
    headers: { authorization: "Bearer " + token },
  });
  return res.data;
}

const deleteURL =
  "https://mywallet-api-nrrz.onrender.com/transactions/:transactionId";

export async function deleteTransaction(token: string, transactionId: string) {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.delete(
      deleteURL.replace(":transactionId", transactionId),
      config
    );
    console.log("Deleted successfully");
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("API error", err);
    } else {
      console.error("unexpected error", err);
    }
  }
}
