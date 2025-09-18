import styled from "styled-components";
import InputField from "../components/InputField";
import ButtonField from "../components/ButtonField";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function NewIncome() {
  const { id } = useParams<{ id: string }>();

  const URL = `https://mywallet-api-nrrz.onrender.com/transactions/${id}`;

  const [value, setValue] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };

  async function updateExpense() {
    try {
      if (!value || !description) {
        return alert("Please, fill all fields!");
      }

      const body = {
        value: Number(value),
        description,
        type: "expense",
      };

      await axios.put(URL, body, config);
      alert("Expense updated successfully!");
      Navigate("/home");
    } catch (err) {
      console.error("Api error", err);
      alert("Error to update income, try again.");
    }
  }
  return (
    <div className="section">
      <Div>
        <div className="title-top">
          <h1>Update Expense</h1>
        </div>

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
            onChange={(e) => setDescription(e.target.value)}
          ></InputField>
        </div>

        <div className="button-save">
          <ButtonField text="Update Expense" onClick={updateExpense} />
        </div>
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
