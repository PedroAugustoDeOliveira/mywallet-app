import styled from "styled-components";
import InputField from "../components/InputField";
import ButtonField from "../components/ButtonField";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewIncome() {
  const URL = "https://mywallet-api-nrrz.onrender.com/expense";
  const [value, setValue] = React.useState<string>("");
  const [description, setDescriptions] = React.useState<string>("");
  const Navigate = useNavigate();

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };

  const body = {
    value: Number(value),
    description,
    type: "expense",
  };

  async function postExpense() {
    try {
      if (!value || !description) {
        return alert("Please, fill all fields!");
      }
      await axios.post(URL, body, config);
      alert("Expense registered successfully!");
      Navigate("/home");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("API error", err);
        alert("Error to save expense, try again.");
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await postExpense();
  }
  return (
    <div className="section">
      <Div>
        <div className="title-top">
          <h1>New Expense</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <InputField
              type="number"
              placeholder="Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></InputField>
            <InputField
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescriptions(e.target.value)}
            ></InputField>
          </div>

          <div className="button-save">
            <ButtonField text="Save Expense" />
          </div>
        </form>
      </Div>
    </div>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;

  .title-top {
    color: #ffffff;
    font-size: 26px;
    font-weight: 700;
    font-family: "Raleway", sans-serif;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
