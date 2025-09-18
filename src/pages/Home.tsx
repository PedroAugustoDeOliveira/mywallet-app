import vector from "./../assets/Vector.png";
import styled from "styled-components";
import HomeButtons from "./../components/HomeButtons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TransactionItem from "../components/TransactionItem";

import { getUser } from "../services/UserService";
import { getTransactions, Transaction } from "../services/TransactionService";

import { deleteTransaction } from "../services/TransactionService";

export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = React.useState<string>("");
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in");
      navigate("/");
      return;
    }

    async function fetchData(token: string) {
      try {
        const user = await getUser(token);
        setName(user.name);

        const tsx = await getTransactions(token);
        setTransactions(tsx);
      } catch (err: any) {
        console.error(err);
        if (err.response?.status === 401) navigate("/");
      }
    }
    fetchData(token);
  }, [navigate]);

  const balance = transactions.reduce((acc, t) => {
    if (t.type === "income") {
      return acc + Number(t.value);
    } else {
      return acc - Number(t.value);
    }
  }, 0);

  async function handleDelete(transactionId: string) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      await deleteTransaction(token, transactionId);
      setTransactions((prev) => prev.filter((t) => t._id !== transactionId));
    } catch (err) {
      console.error("Error deleting transaction", err);
      alert("Failed to delete transaction");
    }
  }

  return (
    <main>
      <Div>
        <div className="top">
          <h1>Hello {name}</h1>
          <img
            src={vector}
            alt="logout"
            style={{ cursor: "pointer" }}
            onClick={() => {
              const confirmLogout = window.confirm(
                "Are you sure you want to logout?"
              );
              if (confirmLogout) {
                localStorage.removeItem("token");
                navigate("/");
              }
            }}
          />
        </div>

        <div className="register-wallet">
          {transactions.length === 0 ? (
            <span>Não tem registro de entrada ou saída</span>
          ) : (
            transactions.map((t) => (
              <TransactionItem
                key={t._id}
                _id={t._id}
                description={t.description}
                value={Number(t.value)}
                type={t.type}
                onDelete={() => handleDelete(t._id)}
              />
            ))
          )}
          <div className="balance">
            <h2>Balance: {balance.toFixed(2)}</h2>
          </div>
        </div>

        <div className="wallet-buttons">
          <Link to={"/newincome"}>
            <HomeButtons text="Nova Entrada" />
          </Link>
          <Link to={"/newexpense"}>
            <HomeButtons text="Nova Saída" />
          </Link>
        </div>
      </Div>
    </main>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;

  .top {
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    font-size: 26px;
    font-weight: 700;
    font-family: "Raleway", sans-serif;
  }

  .register-wallet {
    width: 326px;
    height: 446px;
    background-color: #ffffff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 400;
    font-family: "Raleway", sans-serif;
    color: #868686;

    overflow-y: auto;
    padding: 10px;
  }

  .wallet-buttons {
    display: flex;
    justify-content: space-between;
  }
  .balance {
    margin-top: 15px;
    font-size: 20px;
    font-weight: 700;
    color: #000; /* pode trocar pra verde/vermelho se quiser */
  }
`;
